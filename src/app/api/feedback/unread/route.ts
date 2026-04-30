export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ hasUnread: false })

  const { data } = await supabase
    .from('feedback')
    .select('id, feedback_replies(id)')
    .eq('user_id', user.id)
    .eq('is_read', false)

  const hasUnread = data?.some(f => (f.feedback_replies as any[]).length > 0) ?? false
  return NextResponse.json({ hasUnread })
}
