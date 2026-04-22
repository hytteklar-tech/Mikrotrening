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

export type DayLog = { id: string; date: string; packageId: string; packageName: string; durationSeconds?: number | null }

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
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const isPwa = window.matchMedia('(display-mode: standalone)').matches
    if (isPwa) {
      // Logg at brukeren kjører som PWA
      createClient().from('users').update({ is_pwa: true }).eq('id', userId).then(() => {})
      return
    }
    const handler = (e: Event) => { e.preventDefault(); setDeferredPrompt(e) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

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

  // Vis installasjonsbanner ved 7, 14, 21... registreringer
  useEffect(() => {
    if (dayLogs.length === 0) return
    if (dayLogs.length % 7 !== 0) return
    if (window.matchMedia('(display-mode: standalone)').matches) return
    const dismissedAt = parseInt(localStorage.getItem('install_dismissed_at') ?? '0')
    if (dismissedAt === dayLogs.length) return
    setShowInstallBanner(true)
  }, [dayLogs.length])

  function dismissInstallBanner() {
    localStorage.setItem('install_dismissed_at', String(dayLogs.length))
    setShowInstallBanner(false)
  }

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
    }
    dismissInstallBanner()
  }

  const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent)

  // Vis velkomstkort for nye brukere (kun pre-registrert økt fra onboarding)
  const isNewUser = dayLogs.length === 1 && !uniqueDates.includes(today)

  const showMotivation = notificationsEnabled && dayLogs.length > 0 && dayLogs.length % 5 === 0
  const motivationMsg = ONELINERS[(Math.floor(dayLogs.length / 5) - 1) % ONELINERS.length]

  return (
    <>
      <StreakCard streak={streak} hasTrained={hasTrained} totalSessions={dayLogs.length} isNewUser={isNewUser} />
      {isNewUser && (
        <div className="bg-gray-800/60 border border-orange-500/20 border-l-4 border-l-orange-500 rounded-2xl p-5 space-y-3">
          <p className="text-xs text-orange-400 font-semibold uppercase tracking-wide">En gave fra oss</p>
          <p className="text-white font-bold text-lg leading-snug">
            Din første mikroøkt er klar.<br />Nå er det din tur.
          </p>
          <p className="text-gray-400 text-sm">15 knebøy. 30 sekunder. Det er alt som skal til.</p>
        </div>
      )}
      {showMotivation && (
        <div className="bg-gradient-to-br from-orange-500/30 to-orange-700/20 border border-orange-500/60 rounded-2xl px-4 py-3 shadow shadow-orange-500/20">
          <p className="text-xs text-orange-300 font-semibold mb-1 tracking-wide uppercase">Visste du at...</p>
          <p className="text-sm text-gray-100 leading-relaxed">{motivationMsg}</p>
        </div>
      )}
      {showInstallBanner && (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-white">📲 Legg til på hjemskjermen</p>
            <p className="text-xs text-gray-400 mt-0.5">Alltid ett trykk unna — akkurat som en vanlig app.</p>
          </div>
          {isIos ? (
            <div className="space-y-2 text-xs text-gray-300">
              <p>1. Trykk på <span className="text-blue-400">deleknappen</span> nederst i Safari</p>
              <p>2. Velg <span className="text-white font-medium">"Legg til på Hjem-skjerm"</span></p>
              <p>3. Trykk <span className="text-white font-medium">"Legg til"</span></p>
            </div>
          ) : deferredPrompt ? (
            <button onClick={handleInstall} className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl py-2 transition">
              Installer appen
            </button>
          ) : null}
          <button onClick={dismissInstallBanner} className="w-full text-gray-400 hover:text-gray-200 text-xs py-1 transition">
            Ikke nå
          </button>
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
