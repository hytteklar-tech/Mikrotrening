import { createClient } from '@/lib/supabase/server'
import GroupBanner from './GroupBanner'

type Props = {
  userId: string
  primaryGroupId: string | null
  today: string
}

export default async function GroupBannerLoader({ userId, primaryGroupId, today }: Props) {
  const supabase = await createClient()

  const { data: memberships } = await supabase
    .from('group_members')
    .select('group_id, groups(id, name)')
    .eq('user_id', userId)

  if (!memberships?.length) return null

  const firstGroup = (
    (memberships).find(m => (m.groups as any)?.id === primaryGroupId)
    ?? memberships[0]
  )?.groups as any

  if (!firstGroup) return null

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

  const members = (allMembers ?? []).map((m: any) => ({
    userId: m.user_id,
    name: (m.users as any)?.display_name ?? '?',
    activeToday: activeTodayIds.has(m.user_id),
  }))

  return <GroupBanner groupName={firstGroup.name} members={members} />
}
