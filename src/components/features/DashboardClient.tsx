'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import StreakCard from './StreakCard'
import TrainTodayButton from './TrainTodayButton'

const ONELINERS = [
  'Tre korte økter om dagen halverer risikoen for hjertesykdom. Du er på god vei.',
  'NTNU-forskere mener mikrotrening kan gi deg ti til fjorten ekstra leveår.',
  'Kroppen responderer på belastning, ikke på klokken. Hvert sett teller.',
  '91 prosent holder fast ved mikrotrening. Du er en av dem.',
  'Korte, intense økter frigjør veksthormon som bygger sterkere muskler.',
  '4,5 minutter daglig ga 32 prosent lavere kreftrisiko i en stor studie.',
  'Du bygger ikke bare muskler. Du bygger en vane som varer.',
  'Forskning viser at mikrotrening forbedrer blodtrykk, blodsukker og kondisjon.',
  'Hver gang du reiser deg og trener, sender du oksygen og blod til hjernen.',
  'Ti push-ups med god teknikk er et tydelig signal til kroppen: bli sterkere.',
  'Studier viser at kort daglig trening gir bedre mental skarphet og fokus.',
  'Ingen reisetid. Ingen garderobe. Bare noen minutter med innsats. Det er nok.',
  'Eldre over 65 fikk markant bedre styrke av ti-minutters økter. Du får det også.',
  'Mikrotrening bryter opp stillesittingen som tapper kroppen for energi.',
  'Tre ganger fem minutter om dagen tilsvarer langt mer enn femten minutter trening.',
  'Konsistens slår intensitet. Det du gjør hver dag, former kroppen din.',
  'Kort trening øker sjansen for at du fortsetter. Og det er det som gir resultater.',
  'Veksthormon og IGF-1 aktiveres av korte, intense økter. Biokjemien jobber for deg.',
  'Forskerne er enige: de gamle treningsrådene er utdaterte. Lite og ofte virker.',
  'Du trenger ikke en time. Du trenger tredve sekunder. Reis deg opp. Gjør det nå.',
]

type Package = { id: string; name: string }

export type DayLog = { id: string; date: string; packageId: string; packageName: string }

type Props = {
  initialDayLogs: DayLog[]
  packages: Package[]
  userId: string
  notificationsEnabled: boolean
}

function toLocalDateStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function calcStreak(uniqueDates: string[]): number {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  if (!uniqueDates.includes(toLocalDateStr(d))) {
    d.setDate(d.getDate() - 1)
  }
  let streak = 0
  while (true) {
    if (uniqueDates.includes(toLocalDateStr(d))) {
      streak++
      d.setDate(d.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

export default function DashboardClient({ initialDayLogs, packages, userId, notificationsEnabled }: Props) {
  const [dayLogs, setDayLogs] = useState<DayLog[]>(initialDayLogs)

  useEffect(() => {
    const supabase = createClient()

    async function fetchLogs() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data, error } = await supabase
        .from('daily_logs')
        .select('id, logged_date, package_id, workout_packages(name)')
        .eq('user_id', session.user.id)
        .order('logged_date', { ascending: false })

      if (error) { console.error('[Dashboard] Fetch error:', error.message); return }

      const mapped: DayLog[] = (data ?? []).map(row => ({
        id: row.id as string,
        date: row.logged_date as string,
        packageId: row.package_id as string,
        packageName: ((row.workout_packages as any)?.name ?? 'Ukjent') as string,
      }))
      setDayLogs(mapped)
    }

    fetchLogs()
  }, [userId])

  const today = toLocalDateStr(new Date())
  const uniqueDates = [...new Set(dayLogs.map(l => l.date))]
  const hasTrained = uniqueDates.includes(today)
  const streak = calcStreak(uniqueDates)

  // dayCounts: date → number of sessions that day
  const dayCounts: Record<string, number> = {}
  for (const log of dayLogs) {
    dayCounts[log.date] = (dayCounts[log.date] ?? 0) + 1
  }

  const showMotivation = notificationsEnabled && dayLogs.length > 0 && dayLogs.length % 5 === 0
  const motivationMsg = ONELINERS[(Math.floor(dayLogs.length / 5) - 1) % ONELINERS.length]

  return (
    <>
      <StreakCard streak={streak} hasTrained={hasTrained} totalSessions={dayLogs.length} />
      {showMotivation && (
        <div className="bg-gradient-to-br from-orange-500/30 to-orange-700/20 border border-orange-500/60 rounded-2xl px-4 py-3 shadow shadow-orange-500/20">
          <p className="text-xs text-orange-300 font-semibold mb-1 tracking-wide uppercase">Visste du at...</p>
          <p className="text-sm text-gray-100 leading-relaxed">{motivationMsg}</p>
        </div>
      )}
      <TrainTodayButton
        dayLogs={dayLogs}
        onLogChange={setDayLogs}
        dayCounts={dayCounts}
        packages={packages}
        userId={userId}
      />
    </>
  )
}
