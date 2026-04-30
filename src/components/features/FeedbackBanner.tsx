import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function FeedbackBanner({ userId }: { userId: string }) {
  const supabase = await createClient()

  // Finn uleste svar: feedback der brukeren har svar, men is_read = false
  const { data } = await supabase
    .from('feedback')
    .select('id, feedback_replies(id)')
    .eq('user_id', userId)
    .eq('is_read', false)

  const hasUnreadReply = data?.some(f => (f.feedback_replies as any[]).length > 0)

  if (!hasUnreadReply) return null

  return (
    <Link
      href="/meldinger"
      className="flex items-center gap-1.5 bg-orange-500 rounded-full px-3 py-1.5 shrink-0"
    >
      <span className="w-2 h-2 bg-white rounded-full shrink-0" />
      <span className="text-white text-xs font-semibold whitespace-nowrap">Ny melding</span>
    </Link>
  )
}
