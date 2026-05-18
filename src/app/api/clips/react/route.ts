export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })

  const { clipId, emoji } = await req.json()
  if (!clipId || !emoji) return NextResponse.json({ error: 'Mangler data' }, { status: 400 })

  const { error } = await supabase
    .from('clip_reactions')
    .upsert({ clip_id: clipId, user_id: user.id, emoji }, { onConflict: 'clip_id,user_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })

  const { clipId } = await req.json()
  if (!clipId) return NextResponse.json({ error: 'Mangler clipId' }, { status: 400 })

  await supabase
    .from('clip_reactions')
    .delete()
    .eq('clip_id', clipId)
    .eq('user_id', user.id)

  return NextResponse.json({ ok: true })
}
