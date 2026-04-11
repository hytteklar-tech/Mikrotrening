import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import WorkoutList from '@/components/features/WorkoutList'

export default async function WorkoutsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: packages } = await supabase
    .from('workout_packages')
    .select('id, name, is_active, exercises(id, name, reps, order)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 space-y-4">
      <div className="pt-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Treningspakker</h1>
      </div>
      <WorkoutList packages={packages ?? []} userId={user.id} />
    </div>
  )
}
