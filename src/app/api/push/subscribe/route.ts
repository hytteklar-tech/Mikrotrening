import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const subscription = await req.json()
  await supabase.from('users').update({ push_subscription: subscription }).eq('id', user.id)
  return NextResponse.json({ ok: true })
}
