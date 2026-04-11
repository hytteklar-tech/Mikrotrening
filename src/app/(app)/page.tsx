import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/features/DashboardClient'
import type { DayLog } from '@/components/features/DashboardClient'

export default async function DashboardPage() {
  noStore()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('display_name, notifications_enabled')
    .eq('id', user.id)
    .single()

  if (!profile?.display_name) redirect('/onboarding')

  const [{ data: logs }, { data: packages }] = await Promise.all([
    supabase
      .from('daily_logs')
      .select('id, logged_date, package_id, workout_packages(name)')
      .eq('user_id', user.id)
      .order('logged_date', { ascending: false }),
    supabase
      .from('workout_packages')
      .select('id, name')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
  ])

  const initialDayLogs: DayLog[] = (logs ?? []).map(row => ({
    id: row.id as string,
    date: row.logged_date as string,
    packageId: row.package_id as string,
    packageName: ((row.workout_packages as any)?.name ?? 'Ukjent') as string,
  }))

  return (
    <div className="p-4 space-y-6">
      <div className="pt-4">
        <p className="text-gray-400 text-sm">Hei, {profile.display_name} 👋</p>
        <h1 className="text-2xl font-bold">La oss mikrotrene!</h1>
      </div>

      <DashboardClient
        initialDayLogs={initialDayLogs}
        packages={packages ?? []}
        userId={user.id}
        notificationsEnabled={profile.notifications_enabled ?? true}
      />
    </div>
  )
}
