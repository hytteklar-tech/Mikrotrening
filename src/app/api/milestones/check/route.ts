import { createClient } from '@supabase/supabase-js'
import { sendPushNotification } from '@/lib/onesignal'
import { NextResponse } from 'next/server'

const MILESTONES: Record<number, string> = {
  7:   '7 treninger! Vanedanneren er i gang 🔥',
  30:  '30 treninger! Du er offisielt en mikrotrener 💪',
  100: '100 treninger! Legenden er bekreftet 🏆',
  365: '365 treninger! Et helt år med mikrotrening ⭐',
}

export async function POST(request: Request) {
  const { userId } = await request.json()
  if (!userId) return NextResponse.json({ ok: false }, { status: 400 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [{ count }, { data: user }] = await Promise.all([
    supabase.from('daily_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('users').select('onesignal_id, milestones_reached, push_enabled').eq('id', userId).single(),
  ])

  if (!count || !user?.onesignal_id || !user?.push_enabled) {
    return NextResponse.json({ ok: true, sent: false })
  }

  const reached: number[] = user.milestones_reached ?? []
  const hit = Object.keys(MILESTONES).map(Number).find(m => count >= m && !reached.includes(m))

  if (!hit) return NextResponse.json({ ok: true, sent: false })

  await Promise.all([
    sendPushNotification({
      playerIds: [user.onesignal_id],
      title: 'Mikrotrening',
      body: MILESTONES[hit],
    }),
    supabase.from('users').update({
      milestones_reached: [...reached, hit],
    }).eq('id', userId),
  ])

  return NextResponse.json({ ok: true, sent: true, milestone: hit })
}
