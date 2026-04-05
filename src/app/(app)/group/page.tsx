import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import GroupManager from '@/components/features/GroupManager'

export default async function GroupPage() {
  noStore()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = new Date().toISOString().split('T')[0]

  const { data: memberships } = await supabase
    .from('group_members')
    .select('group_id, groups(id, name, invite_code, created_by)')
    .eq('user_id', user.id)

  const groups = (memberships ?? []).map(m => m.groups as any).filter(Boolean)

  // Get active-today status for all members in user's groups
  const groupIds = groups.map((g: any) => g.id)
  let membersWithStatus: any[] = []

  if (groupIds.length > 0) {
    const { data: allMembers } = await supabase
      .from('group_members')
      .select('group_id, user_id, users(display_name)')
      .in('group_id', groupIds)

    const { data: todayLogs } = await supabase
      .from('daily_logs')
      .select('user_id')
      .eq('logged_date', today)
      .in('user_id', (allMembers ?? []).map((m: any) => m.user_id))

    const activeTodayIds = new Set((todayLogs ?? []).map((l: any) => l.user_id))

    membersWithStatus = (allMembers ?? []).map((m: any) => ({
      ...m,
      activeToday: activeTodayIds.has(m.user_id),
      isMe: m.user_id === user.id,
    }))
  }

  return (
    <div className="p-4 space-y-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Gruppe 👥</h1>
      </div>
      <GroupManager
        groups={groups}
        membersWithStatus={membersWithStatus}
        userId={user.id}
      />
    </div>
  )
}
