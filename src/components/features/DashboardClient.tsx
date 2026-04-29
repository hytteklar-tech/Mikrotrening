'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => router.refresh(), 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])
  const [showInstallSteps, setShowInstallSteps] = useState(false)
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
        .select('id, logged_date, package_id, duration_seconds, workout_packages(name)')
        .eq('user_id', session.user.id)
        .order('logged_date', { ascending: false })

      if (error) { console.error('[Dashboard] Fetch error:', error.message); return }

      const mapped: DayLog[] = (data ?? []).map(row => ({
        id: row.id as string,
        date: row.logged_date as string,
        packageId: row.package_id as string,
        packageName: ((row.workout_packages as any)?.name ?? 'Ukjent') as string,
        durationSeconds: row.duration_seconds as number | null,
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

  // Vis installasjonsbanner ved 3, 7 og 10 registreringer
  const INSTALL_MILESTONES = [1, 2, 3, 7, 10]
  useEffect(() => {
    if (!INSTALL_MILESTONES.includes(dayLogs.length)) return
    if (window.matchMedia('(display-mode: standalone)').matches) return
    const dismissed: number[] = JSON.parse(localStorage.getItem('install_dismissed') ?? '[]')
    if (dismissed.includes(dayLogs.length)) return
    setShowInstallBanner(true)
  }, [dayLogs.length])

  function dismissInstallBanner() {
    const dismissed: number[] = JSON.parse(localStorage.getItem('install_dismissed') ?? '[]')
    localStorage.setItem('install_dismissed', JSON.stringify([...dismissed, dayLogs.length]))
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
  const isDesktopSafari = !isIos && /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|FxiOS|Edg/.test(navigator.userAgent)

  // Vis velkomstkort for nye brukere (kun pre-registrert økt fra onboarding)
  const isNewUser = dayLogs.length === 1 && !uniqueDates.includes(today)

  const showMotivation = notificationsEnabled && dayLogs.length > 0 && dayLogs.length % 5 === 0
  const motivationMsg = ONELINERS[(Math.floor(dayLogs.length / 5) - 1) % ONELINERS.length]

  return (
    <>
      <StreakCard
        streak={streak}
        hasTrained={hasTrained}
        totalSessions={uniqueDates.length}
        isNewUser={isNewUser}
        dates={uniqueDates}
        onScrollToToday={() => document.getElementById('today-section')?.scrollIntoView({ behavior: 'smooth' })}
      />
      {isNewUser && (
        <div className="bg-gray-800/60 border border-orange-500/20 border-l-4 border-l-orange-500 rounded-2xl p-5 space-y-3">
          <p className="text-xs text-orange-400 font-semibold uppercase tracking-wide">En gave fra oss</p>
          <p className="text-white font-bold text-lg leading-snug">
            Din første mikroøkt er klar.<br />Nå er det din tur.
          </p>
          <p className="text-gray-300 text-sm">15 knebøy. 30 sekunder. Det er alt som skal til.</p>
        </div>
      )}
      {showMotivation && (
        <div className="bg-gray-800/60 border border-orange-500/20 border-l-4 border-l-orange-500 rounded-2xl px-4 py-3 space-y-2">
          <p className="text-xs text-orange-400 font-semibold mb-1 tracking-wide uppercase">Visste du at...</p>
          <p className="text-sm text-gray-100 leading-relaxed">{motivationMsg}</p>
          <div className="flex justify-end">
            <Link href="/mikrotrening" style={{ fontSize: 12, color: '#9ca3af' }} className="hover:text-gray-300 transition-colors">
              Les mer om mikrotrening →
            </Link>
          </div>
        </div>
      )}
      {showInstallBanner && (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-white">📲 Legg til på hjemskjermen</p>
            <p className="text-xs text-gray-300 mt-0.5">Da er appen alltid ett trykk unna — akkurat som en vanlig app.</p>
          </div>
          {(isIos || isDesktopSafari) ? (
            <>
              <button
                onClick={() => setShowInstallSteps(s => !s)}
                className="w-full flex items-center justify-between bg-gray-700/50 rounded-xl px-3 py-2 text-xs text-white hover:bg-gray-700 transition"
              >
                <span className="font-medium">Slik gjør du det</span>
                <span className="text-gray-300">{showInstallSteps ? '▲' : '▼'}</span>
              </button>
              {showInstallSteps && (
                <div className="space-y-3 px-1">
                  {(isIos ? [
                    <>Trykk på <span className="text-white font-medium">del-ikonet</span> <span className="text-white">⎋</span> nederst i Safari</>,
                    <>Scroll ned og trykk <span className="text-white font-medium">"Legg til på Hjem-skjerm"</span></>,
                    <>Trykk <span className="text-white font-medium">"Legg til"</span> øverst til høyre</>,
                  ] : [
                    <>Trykk på <span className="text-white font-medium">Fil</span> i menylinjen øverst</>,
                    <>Velg <span className="text-white font-medium">"Legg til i Dock…"</span></>,
                    <>Trykk <span className="text-white font-medium">"Legg til"</span></>,
                  ]).map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="text-xs text-gray-300 pt-0.5">{text}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : deferredPrompt ? (
            <button onClick={handleInstall} className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl py-2 transition">
              Legg til på hjemskjermen
            </button>
          ) : null}
          <button onClick={dismissInstallBanner} className="w-full text-gray-300 hover:text-gray-200 text-xs py-1 transition">
            Ikke nå
          </button>
        </div>
      )}

      <div id="today-section">
      <TrainTodayButton
        dayLogs={dayLogs}
        onLogChange={setDayLogs}
        dayCounts={dayCounts}
        packages={packages}
        userId={userId}
      />
      </div>
    </>
  )
}
