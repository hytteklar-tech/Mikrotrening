'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { sendPushNotification } from '@/lib/onesignal'

const STREAK_MILESTONES: Record<number, string> = {
  7:   '7 dager på rad! Du bygger en vane. 🔥',
  14:  '14 dager! To uker uten å gi opp. 💪',
  30:  '30 dager! Forskning viser at vanen nå sitter. 🥈',
  45:  '45 dager! Halvveis til to måneder. 🔥',
  60:  '60 dager! To måneder på rad. Du er ikke til å stoppe. 💥',
  90:  '90 dager! Du er Maskinen. 🥇',
  120: '120 dager! Fire måneder. Jernvilje. 💎',
  180: '180 dager! Et halvt år! Ustoppelig. 🏆',
  270: '270 dager! Tre av fire. Nesten der. 🔥',
  365: 'Et helt år! Du er Legenden. 👑',
}

function calculateStreak(dates: string[], today: string): number {
  const sorted = [...new Set(dates)].sort().reverse()
  if (!sorted.length || sorted[0] < today) return 0

  let streak = 0
  let current = new Date(today)
  for (const d of sorted) {
    const diff = Math.round((current.getTime() - new Date(d).getTime()) / 86400000)
    if (diff === 0 || diff === 1) {
      streak++
      current = new Date(d)
    } else {
      break
    }
  }
  return streak
}

export async function logWorkout(userId: string, packageId: string, date: string) {
  const supabase = await createClient()
  await supabase.from('daily_logs').insert({
    user_id: userId,
    package_id: packageId,
    logged_date: date,
  })
  revalidatePath('/')
  revalidatePath('/statistikk')

  // Kjør varslinger i bakgrunnen (ikke blokker bruker)
  notifyAfterLog(userId, date).catch(() => {})
}

const DAILY_PUSH_LIMIT = 5

async function notifyAfterLog(userId: string, today: string) {
  const admin = createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Hent brukerinfo
  const { data: user } = await admin
    .from('users')
    .select('onesignal_id, push_subscription, display_name, notifications_enabled, push_count_today, push_date')
    .eq('id', userId)
    .single()

  // Sjekk daglig grense (maks 5 push per bruker per dag)
  const sameDay = user?.push_date === today
  const countToday = sameDay ? (user?.push_count_today ?? 0) : 0
  if (countToday >= DAILY_PUSH_LIMIT) return

  async function sendAndCount(fn: () => Promise<void>) {
    await fn()
    const newCount = countToday + 1
    await admin.from('users').update({
      push_count_today: newCount,
      push_date: today,
    }).eq('id', userId)
  }

  // --- Streak-milepæl ---
  if (user?.notifications_enabled && (user.onesignal_id || user.push_subscription)) {
    const { data: logs } = await admin
      .from('daily_logs')
      .select('logged_date')
      .eq('user_id', userId)

    const dates = logs?.map(l => l.logged_date as string) ?? []
    const streak = calculateStreak(dates, today)
    const milestoneMsg = STREAK_MILESTONES[streak]

    if (milestoneMsg) {
      await sendAndCount(() => sendPushNotification({
        playerIds: user.onesignal_id ? [user.onesignal_id] : [],
        nativeSubscriptions: user.push_subscription ? [user.push_subscription] : [],
        title: 'Ny milepæl! 🎉',
        body: milestoneMsg,
      }))
    }
  }

  // --- Gruppe-varsling ---
  const { data: memberships } = await admin
    .from('group_members')
    .select('group_id')
    .eq('user_id', userId)

  if (!memberships?.length) return

  const groupIds = memberships.map(m => m.group_id as string)

  // Finn andre gruppemedlemmer med push aktivert som IKKE har trent i dag
  const { data: otherMembers } = await admin
    .from('group_members')
    .select('user_id, users!inner(onesignal_id, notifications_enabled, push_count_today, push_date)')
    .in('group_id', groupIds)
    .neq('user_id', userId)

  if (!otherMembers?.length) return

  // Sjekk hvem som allerede har trent i dag
  const { data: todayLogs } = await admin
    .from('daily_logs')
    .select('user_id')
    .in('user_id', otherMembers.map(m => m.user_id as string))
    .eq('logged_date', today)

  const trainedToday = new Set((todayLogs ?? []).map(l => l.user_id as string))

  const playerIds = otherMembers
    .filter(m => {
      const u = m.users as unknown as {
        onesignal_id: string | null
        notifications_enabled: boolean
        push_count_today: number
        push_date: string | null
      }
      const recipientCount = u.push_date === today ? (u.push_count_today ?? 0) : 0
      return (
        u.onesignal_id &&
        u.notifications_enabled &&
        !trainedToday.has(m.user_id as string) &&
        recipientCount < DAILY_PUSH_LIMIT
      )
    })
    .map(m => (m.users as unknown as { onesignal_id: string }).onesignal_id)

  if (!playerIds.length) return

  const senderName = user?.display_name ?? 'Noen i gruppen'
  await sendPushNotification({
    playerIds,
    title: 'Gruppeaktivitet',
    body: `${senderName} har nettopp trent. Din tur? 💪`,
  })
}

export async function removeLog(userId: string, date: string) {
  const supabase = await createClient()
  await supabase.from('daily_logs')
    .delete()
    .eq('user_id', userId)
    .eq('logged_date', date)
  revalidatePath('/')
  revalidatePath('/statistikk')
}
