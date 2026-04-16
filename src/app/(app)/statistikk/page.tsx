import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StatistikkClient from '@/components/features/StatistikkClient'

export default async function StatistikkPage() {
  noStore()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [logsRes, typesRes, resultsRes] = await Promise.all([
    supabase
      .from('daily_logs')
      .select('logged_date, duration_seconds, workout_packages ( name, exercises ( reps ) )')
      .eq('user_id', user.id)
      .order('logged_date', { ascending: true }),
    supabase
      .from('test_types')
      .select('id, name, unit, higher_is_better, user_id')
      .or(`user_id.is.null,user_id.eq.${user.id}`)
      .order('created_at', { ascending: true }),
    supabase
      .from('test_results')
      .select('id, test_type_id, result, tested_date, notes')
      .eq('user_id', user.id)
      .order('tested_date', { ascending: true }),
  ])

  const logs = (logsRes.data ?? []).map(row => {
    const pkg = row.workout_packages as any
    const exercises = pkg?.exercises ?? []
    const reps = exercises.reduce((sum: number, e: { reps: number }) => sum + e.reps, 0)
    return {
      logged_date: row.logged_date as string,
      reps,
      packageName: (pkg?.name ?? 'Ukjent') as string,
      durationSeconds: row.duration_seconds as number | null,
    }
  })

  const testTypes = (typesRes.data ?? []).map(t => ({
    id: t.id as string,
    name: t.name as string,
    unit: t.unit as string,
    higherIsBetter: t.higher_is_better as boolean,
    isOwn: t.user_id === user.id,
  }))

  const testResults = (resultsRes.data ?? []).map(r => ({
    id: r.id as string,
    testTypeId: r.test_type_id as string,
    result: Number(r.result),
    testedDate: r.tested_date as string,
    notes: r.notes as string | null,
  }))

  return <StatistikkClient logs={logs} testTypes={testTypes} testResults={testResults} />
}
