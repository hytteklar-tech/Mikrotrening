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
      className="flex items-center justify-between bg-orange-500/10 border border-orange-500/30 rounded-2xl px-4 py-3 text-sm"
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-orange-500 rounded-full shrink-0" />
        <span className="text-orange-300">Du har fått svar på meldingen din</span>
      </div>
      <span className="text-orange-500 text-xs">Se svar →</span>
    </Link>
  )
}
