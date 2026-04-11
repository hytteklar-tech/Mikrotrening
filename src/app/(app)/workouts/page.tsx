import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import WorkoutList from '@/components/features/WorkoutList'

export default async function WorkoutsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: packages }, { data: durationLogs }] = await Promise.all([
    supabase
      .from('workout_packages')
      .select('id, name, is_active, exercises(id, name, reps, order)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('daily_logs')
      .select('package_id, duration_seconds')
      .eq('user_id', user.id),
  ])

  // Beregn snitt-tid og antall uten tid per pakke
  const durationStats: Record<string, { avgSeconds: number; timedCount: number; untimedCount: number }> = {}
  for (const row of durationLogs ?? []) {
    const pid = row.package_id as string
    if (!durationStats[pid]) durationStats[pid] = { avgSeconds: 0, timedCount: 0, untimedCount: 0 }
    if (row.duration_seconds != null) {
      durationStats[pid].timedCount++
      durationStats[pid].avgSeconds += row.duration_seconds as number
    } else {
      durationStats[pid].untimedCount++
    }
  }
  for (const s of Object.values(durationStats)) {
    if (s.timedCount > 0) s.avgSeconds = Math.round(s.avgSeconds / s.timedCount)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="pt-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Treningspakker</h1>
      </div>
      <WorkoutList packages={packages ?? []} userId={user.id} durationStats={durationStats} />
    </div>
  )
}
