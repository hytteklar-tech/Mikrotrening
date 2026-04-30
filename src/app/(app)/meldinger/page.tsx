import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import MeldingerClient from '@/components/features/MeldingerClient'

export default async function MeldingerPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Merk som lest når brukeren åpner siden
  await supabase
    .from('feedback')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false)

  const { data } = await supabase
    .from('feedback')
    .select('id, message, created_at, feedback_replies (id, message, created_at)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  return <MeldingerClient userId={user.id} initialItems={data ?? []} />
}
