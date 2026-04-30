import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function FeedbackSection({ userId }: { userId: string }) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('feedback')
    .select('id, feedback_replies(id)')
    .eq('user_id', userId)
    .eq('is_read', false)

  const hasUnread = data?.some(f => (f.feedback_replies as any[]).length > 0)

  return (
    <Link
      href="/meldinger"
      className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 rounded-2xl px-4 py-3 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-white">Meldinger</span>
        {hasUnread && (
          <span className="w-2 h-2 bg-orange-500 rounded-full" />
        )}
      </div>
      <span className="text-gray-500 text-sm">→</span>
    </Link>
  )
}
