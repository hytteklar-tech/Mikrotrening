import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/features/DashboardClient'
import GroupBannerLoader from '@/components/features/GroupBannerLoader'
import DailyMessage from '@/components/features/DailyMessage'
import FeedbackBanner from '@/components/features/FeedbackBanner'
import type { DayLog } from '@/components/features/DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Oslo' })

  const [{ data: profile }, { data: logs }, { data: packages }] = await Promise.all([
    supabase
      .from('users')
      .select('display_name, notifications_enabled, primary_group_id')
      .eq('id', user.id)
      .single(),
    supabase
      .from('daily_logs')
      .select('id, logged_date, package_id, duration_seconds, workout_packages(name)')
      .eq('user_id', user.id)
      .order('logged_date', { ascending: false }),
    supabase
      .from('workout_packages')
      .select('id, name')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
  ])

  if (!profile?.display_name) redirect('/onboarding')

  const initialDayLogs: DayLog[] = (logs ?? []).map(row => ({
    id: row.id as string,
    date: row.logged_date as string,
    packageId: row.package_id as string,
    packageName: ((row.workout_packages as any)?.name ?? 'Ukjent') as string,
    durationSeconds: row.duration_seconds as number | null,
  }))

  return (
    <div className="p-4 space-y-6">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Hei, {profile.display_name} 👋</h1>
        <DailyMessage />
      </div>

      <FeedbackBanner userId={user.id} />

      <Suspense fallback={<div className="h-10 bg-gray-800/50 rounded-2xl animate-pulse" />}>
        <GroupBannerLoader
          userId={user.id}
          primaryGroupId={profile.primary_group_id ?? null}
          today={today}
        />
      </Suspense>

      <DashboardClient
        initialDayLogs={initialDayLogs}
        packages={packages ?? []}
        userId={user.id}
        notificationsEnabled={profile.notifications_enabled ?? true}
      />
    </div>
  )
}
