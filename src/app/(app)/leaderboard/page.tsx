import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

async function getLeaderboard(userId: string, supabase: Awaited<ReturnType<typeof createClient>>) {
  // Get groups the user belongs to
  const { data: memberships } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', userId)

  if (!memberships?.length) return []

  const groupIds = memberships.map(m => m.group_id)

  // Get all members in those groups
  const { data: members } = await supabase
    .from('group_members')
    .select('user_id, users(display_name)')
    .in('group_id', groupIds)

  if (!members?.length) return []

  const uniqueUsers = Array.from(new Map(members.map(m => [m.user_id, m])).values())

  // Get logs for all members
  const memberIds = uniqueUsers.map(m => m.user_id)
  const { data: logs } = await supabase
    .from('daily_logs')
    .select('user_id, logged_date')
    .in('user_id', memberIds)
    .order('logged_date', { ascending: false })

  const today = new Date()
  today.setHours(12, 0, 0, 0)

  return uniqueUsers.map(member => {
    const uniqueDates = [...new Set(
      (logs ?? [])
        .filter(l => l.user_id === member.user_id)
        .map(l => l.logged_date)
    )].sort().reverse()

    const totalDays = (logs ?? []).filter(l => l.user_id === member.user_id).length

    const toStr = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const streakStart = new Date(today)
    if (!uniqueDates.includes(toStr(today))) {
      streakStart.setDate(today.getDate() - 1)
    }

    let streak = 0
    for (let i = 0; i < uniqueDates.length; i++) {
      const logDate = new Date(uniqueDates[i] + 'T12:00:00')
      const expected = new Date(streakStart)
      expected.setDate(streakStart.getDate() - i)
      if (logDate.toDateString() === expected.toDateString()) {
        streak++
      } else break
    }

    const points = streak * 2 + totalDays
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    const activeToday = uniqueDates[0] === todayStr

    return {
      userId: member.user_id,
      name: (member.users as any)?.display_name ?? 'Ukjent',
      streak,
      totalDays,
      points,
      activeToday,
      isMe: member.user_id === userId,
    }
  }).sort((a, b) => b.points - a.points)
}

export default async function LeaderboardPage() {
  noStore()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const board = await getLeaderboard(user.id, supabase)

  return (
    <div className="p-4 space-y-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Leaderboard 🏆</h1>
        <p className="text-gray-300 text-sm mt-1">Poeng = streak × 2 + totale dager</p>
      </div>

      {board.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-300">Bli med i en gruppe for å se leaderboard</p>
          <a href="/group" className="text-orange-500 font-semibold text-sm mt-2 block">
            Gå til Gruppe →
          </a>
        </div>
      ) : (
        <div className="space-y-2">
          {board.map((entry, i) => (
            <div
              key={entry.userId}
              className={`rounded-2xl p-4 flex items-center gap-3 ${
                entry.isMe ? 'bg-orange-500' : 'bg-gray-800'
              }`}
            >
              <span className="text-4xl w-10 text-center">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{entry.name}</span>
                  {entry.activeToday && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Aktiv i dag</span>}
                </div>
                <p className={`text-xs mt-0.5 ${entry.isMe ? 'text-orange-100' : 'text-gray-300'}`}>
                  🔥 {entry.streak} streak · 📅 {entry.totalDays} dager totalt
                </p>
              </div>
              <span className="font-bold text-lg">{entry.points}p</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
