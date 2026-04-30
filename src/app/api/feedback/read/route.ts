export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })

  await supabase
    .from('feedback')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false)

  return NextResponse.json({ ok: true })
}
