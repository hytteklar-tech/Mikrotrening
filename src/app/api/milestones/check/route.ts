import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { sendPushNotification } from '@/lib/onesignal'
import { NextResponse } from 'next/server'

const MILESTONES: Record<number, string> = {
  7:   '7 treninger! Vanedanneren er i gang 🔥',
  14:  '14 treninger! To uker med mikrotrening 💥',
  30:  '30 treninger! Du er offisielt en mikrotrener 💪',
  50:  '50 treninger! Halvveis til 100 — sterk innsats 🌟',
  100: '100 treninger! Legenden er bekreftet 🏆',
}

export async function POST(request: Request) {
  const supabaseUser = await createServerClient()
  const { data: { user } } = await supabaseUser.auth.getUser()
  if (!user) return NextResponse.json({ ok: false }, { status: 401 })

  const { userId } = await request.json()
  if (!userId || userId !== user.id) return NextResponse.json({ ok: false }, { status: 403 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [{ count }, { data: profile }] = await Promise.all([
    supabase.from('daily_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('users').select('onesignal_id, milestones_reached, push_enabled').eq('id', userId).single(),
  ])

  if (!count || !profile) return NextResponse.json({ ok: true, sent: false })

  const reached: number[] = profile.milestones_reached ?? []
  const hit = Object.keys(MILESTONES).map(Number).find(m => count >= m && !reached.includes(m))

  if (!hit) return NextResponse.json({ ok: true, sent: false })

  const canPush = !!profile.onesignal_id && !!profile.push_enabled

  await Promise.all([
    canPush ? sendPushNotification({
      playerIds: [profile.onesignal_id!],
      title: 'Mikrotrening',
      body: MILESTONES[hit],
    }) : Promise.resolve(),
    supabase.from('users').update({
      milestones_reached: [...reached, hit],
    }).eq('id', userId),
  ])

  return NextResponse.json({ ok: true, sent: canPush, milestone: hit })
}
