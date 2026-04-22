import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/features/DashboardClient'
import GroupBanner from '@/components/features/GroupBanner'
import type { DayLog } from '@/components/features/DashboardClient'

export default async function DashboardPage() {
  noStore()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = new Date().toISOString().split('T')[0]

  const [{ data: profile }, { data: logs }, { data: packages }, { data: memberships }] = await Promise.all([
    supabase
      .from('users')
      .select('display_name, notifications_enabled')
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
    supabase
      .from('group_members')
      .select('group_id, groups(id, name)')
      .eq('user_id', user.id)
      .limit(1),
  ])

  if (!profile?.display_name) redirect('/onboarding')

  // Gruppe-banner
  const firstGroup = memberships?.[0]?.groups as any
  let groupBannerData: { groupName: string; members: { userId: string; name: string; activeToday: boolean }[] } | null = null

  if (firstGroup) {
    const { data: allMembers } = await supabase
      .from('group_members')
      .select('user_id, users(display_name)')
      .eq('group_id', firstGroup.id)

    const memberIds = (allMembers ?? []).map((m: any) => m.user_id)
    const { data: todayLogs } = await supabase
      .from('daily_logs')
      .select('user_id')
      .eq('logged_date', today)
      .in('user_id', memberIds)

    const activeTodayIds = new Set((todayLogs ?? []).map((l: any) => l.user_id))

    groupBannerData = {
      groupName: firstGroup.name,
      members: (allMembers ?? []).map((m: any) => ({
        userId: m.user_id,
        name: (m.users as any)?.display_name ?? '?',
        activeToday: activeTodayIds.has(m.user_id),
      })),
    }
  }

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
        <p className="text-gray-400 text-sm">Hei, {profile.display_name} 👋</p>
        <h1 className="text-2xl font-bold">La oss mikrotrene!</h1>
      </div>

      {groupBannerData && (
        <GroupBanner
          groupName={groupBannerData.groupName}
          members={groupBannerData.members}
        />
      )}

      <DashboardClient
        initialDayLogs={initialDayLogs}
        packages={packages ?? []}
        userId={user.id}
        notificationsEnabled={profile.notifications_enabled ?? true}
      />
    </div>
  )
}
