import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LeaderboardClient from '@/components/features/LeaderboardClient'

const MONTH_NAMES = ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember']

async function getLeaderboard(userId: string, supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: memberships } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', userId)

  if (!memberships?.length) return []

  const groupIds = memberships.map(m => m.group_id)

  const { data: members } = await supabase
    .from('group_members')
    .select('user_id, users(display_name)')
    .in('group_id', groupIds)

  if (!members?.length) return []

  const uniqueUsers = Array.from(new Map(members.map(m => [m.user_id, m])).values())
  const memberIds = uniqueUsers.map(m => m.user_id)

  const { data: logs } = await supabase
    .from('daily_logs')
    .select('user_id, logged_date')
    .in('user_id', memberIds)
    .order('logged_date', { ascending: false })

  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`

  return uniqueUsers.map(member => {
    const memberLogs = (logs ?? []).filter(l => l.user_id === member.user_id)
    const uniqueDates = [...new Set(memberLogs.map(l => l.logged_date))].sort().reverse()
    const totalDays = uniqueDates.length

    // Denne måneden
    const monthDays = uniqueDates.filter(d => d.startsWith(thisMonth)).length

    // Konsistens %
    let consistencyPct = 0
    if (totalDays > 0) {
      const firstLog = uniqueDates[uniqueDates.length - 1]
      const firstDate = new Date(firstLog + 'T12:00:00')
      const daysSinceFirst = Math.max(1, Math.round((today.getTime() - firstDate.getTime()) / 86400000) + 1)
      consistencyPct = Math.round((totalDays / daysSinceFirst) * 100)
    }

    // Streak (for display)
    const streakStart = new Date(today)
    if (!uniqueDates.includes(todayStr)) streakStart.setDate(today.getDate() - 1)
    let streak = 0
    for (let i = 0; i < uniqueDates.length; i++) {
      const logDate = new Date(uniqueDates[i] + 'T12:00:00')
      const expected = new Date(streakStart)
      expected.setDate(streakStart.getDate() - i)
      if (logDate.toDateString() === expected.toDateString()) streak++
      else break
    }

    return {
      userId: member.user_id,
      name: (member.users as any)?.display_name ?? 'Ukjent',
      streak,
      totalDays,
      monthDays,
      consistencyPct,
      activeToday: uniqueDates[0] === todayStr,
      isMe: member.user_id === userId,
    }
  })
}

export default async function LeaderboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const board = await getLeaderboard(user.id, supabase)
  const monthName = MONTH_NAMES[new Date().getMonth()]

  return (
    <div className="p-4 space-y-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Toppliste 🏆</h1>
      </div>

      {board.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-300">Bli med i en gruppe for å se topplisten</p>
          <a href="/group" className="text-orange-500 font-semibold text-sm mt-2 block">
            Gå til Gruppe →
          </a>
        </div>
      ) : (
        <LeaderboardClient board={board} monthName={monthName} />
      )}
    </div>
  )
}
