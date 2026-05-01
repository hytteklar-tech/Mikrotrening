'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import confetti from 'canvas-confetti'
import posthog from 'posthog-js'
import CalendarView from './CalendarView'
import type { DayLog } from './DashboardClient'

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const RADIUS = 68
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function TimerRing({ seconds, average }: { seconds: number; average: number | null }) {
  const isOvertime = average ? seconds > average : false
  const orangeProgress = average ? Math.min(seconds / average, 1) : 0
  const orangeOffset = CIRCUMFERENCE * (1 - orangeProgress)
  const whiteProgress = average && isOvertime ? Math.min((seconds - average) / average, 1) : 0
  const whiteOffset = CIRCUMFERENCE * (1 - whiteProgress)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: 180, height: 180 }}>
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Background ring */}
          <circle cx="90" cy="90" r={RADIUS} fill="none" stroke="#374151" strokeWidth="10" />
          {/* Orange ring — fills up to average */}
          {average && (
            <circle
              cx="90" cy="90" r={RADIUS}
              fill="none"
              stroke="#f97316"
              strokeWidth="10"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={orangeOffset}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dashoffset 0.5s linear' }}
            />
          )}
          {/* White overtime ring — fills on top from average to 2× average */}
          {isOvertime && (
            <circle
              cx="90" cy="90" r={RADIUS}
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={whiteOffset}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dashoffset 0.5s linear' }}
            />
          )}
        </svg>
        {/* Time centered absolutely over SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-mono font-bold text-white tabular-nums">
            {formatDuration(seconds)}
          </span>
        </div>
      </div>
      {average && (
        <p className="text-base font-medium text-white">
          {isOvertime
            ? `over snittet ditt (${formatDuration(average)})`
            : `Snitt tidligere økter: ${formatDuration(average)}`}
        </p>
      )}
    </div>
  )
}

type Package = { id: string; name: string }

type Props = {
  dayLogs: DayLog[]
  onLogChange: (logs: DayLog[]) => void
  dayCounts: Record<string, number>
  packages: Package[]
  userId: string
}

function toLocalDateStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export default function TrainTodayButton({ dayLogs, onLogChange, dayCounts, packages, userId }: Props) {
  const today = toLocalDateStr(new Date())
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(packages[0] ?? null)
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [averageSeconds, setAverageSeconds] = useState<number | null>(null)
  const [repsByDate, setRepsByDate] = useState<Record<string, number>>({})
  const [packageExercises, setPackageExercises] = useState<{ name: string; reps: number }[]>([])
  const [milestoneToast, setMilestoneToast] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)
  const supabase = createClient()

  useEffect(() => {
    supabase
      .from('daily_logs')
      .select('logged_date, workout_packages(exercises(reps))')
      .eq('user_id', userId)
      .then(({ data }) => {
        const map: Record<string, number> = {}
        for (const row of data ?? []) {
          const reps = ((row.workout_packages as any)?.exercises ?? [])
            .reduce((s: number, e: { reps: number }) => s + (e.reps ?? 0), 0)
          map[row.logged_date] = (map[row.logged_date] ?? 0) + reps
        }
        setRepsByDate(map)
      })
  }, [userId])

  // Correct for SSR/hydration timezone mismatch: server runs UTC, user is in local time.
  // useState(today) uses the server's date during SSR and stays stuck after hydration.
  useEffect(() => {
    const clientToday = toLocalDateStr(new Date())
    setSelectedDate(prev => prev === clientToday ? prev : clientToday)
  }, [])

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 500)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [timerRunning])

  const activePackage = selectedPackage && packages.find(p => p.id === selectedPackage.id)
    ? selectedPackage
    : packages[0] ?? null

  useEffect(() => {
    if (!activePackage) return
    supabase
      .from('exercises')
      .select('name, reps, order')
      .eq('package_id', activePackage.id)
      .order('order')
      .then(({ data }) => {
        setPackageExercises((data ?? []).map(e => ({ name: e.name as string, reps: e.reps as number })))
      })
    supabase
      .from('daily_logs')
      .select('duration_seconds')
      .eq('user_id', userId)
      .eq('package_id', activePackage.id)
      .not('duration_seconds', 'is', null)
      .then(({ data }) => {
        if (data && data.length > 0) {
          const sum = data.reduce((acc, row) => acc + (row.duration_seconds as number), 0)
          setAverageSeconds(Math.round(sum / data.length))
        } else {
          setAverageSeconds(null)
        }
      })
  }, [activePackage?.id])

  function calcStreakAfterLog(logsIncludingToday: DayLog[], today: string): number {
    const uniqueDates = [...new Set(logsIncludingToday.map(l => l.date))]
    const sorted = uniqueDates.sort().reverse()
    let streak = 0
    let d = new Date(today + 'T12:00:00')
    while (true) {
      const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      if (sorted.includes(ds)) { streak++; d.setDate(d.getDate() - 1) }
      else break
    }
    return streak
  }

  function startTimer() {
    startTimeRef.current = Date.now()
    setTimerSeconds(0)
    setTimerRunning(true)
    posthog.capture('okt_startet', { pakke_navn: activePackage?.name })
  }

  function stopTimer() {
    setTimerRunning(false)
  }

  const isToday = selectedDate === today
  const isFuture = selectedDate > today

  const logsForDay = dayLogs.filter(l => l.date === selectedDate)
  const availablePackages = packages
  const canAdd = !isFuture && packages.length > 0

  const labelDate = isToday
    ? 'I dag'
    : new Date(selectedDate + 'T12:00:00').toLocaleDateString('nb-NO', {
        weekday: 'long', day: 'numeric', month: 'long',
      })

  async function addLog(withTimer = false) {
    if (!activePackage || isFuture) return
    setLoading(true)
    const duration = withTimer && timerSeconds > 0 ? timerSeconds : null
    if (withTimer) stopTimer()

    const optimisticLog: DayLog = {
      id: `optimistic-${Date.now()}`,
      date: selectedDate,
      packageId: activePackage.id,
      packageName: activePackage.name,
      durationSeconds: duration,
    }
    onLogChange([...dayLogs, optimisticLog])

    const { data, error } = await supabase.from('daily_logs').insert({
      user_id: userId,
      package_id: activePackage.id,
      logged_date: selectedDate,
      ...(duration !== null && { duration_seconds: duration }),
    }).select('id').single()

    if (error) {
      console.error('[TrainTodayButton] Insert error:', error)
      onLogChange(dayLogs)
    } else if (data) {
      const newLogs = [...dayLogs, { ...optimisticLog, id: data.id as string }]
      onLogChange(newLogs)

      posthog.capture('okt_fullfort', {
        pakke_navn: activePackage?.name,
        varighet_sekunder: duration ?? null,
        dag_i_streak: calcStreakAfterLog(newLogs, selectedDate),
        tidspunkt: new Date().toTimeString().slice(0, 5),
      })

      const colors = ['#e85c00', '#f97316', '#ffffff', '#fbbf24', '#facc15']
      confetti({ particleCount: 40, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors })
      confetti({ particleCount: 40, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors })
      fetch('/api/milestones/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      }).then(r => r.json()).then(data => {
        if (data.milestone) {
          const messages: Record<number, string> = {
            7:   '7 treninger! Vanedanneren er i gang 🔥',
            14:  '14 treninger! To uker med mikrotrening 💥',
            30:  '30 treninger! Du er offisielt en mikrotrener 💪',
            50:  '50 treninger! Halvveis til 100 — sterk innsats 🌟',
            100: '100 treninger! Legenden er bekreftet 🏆',
          }
          setMilestoneToast(messages[data.milestone] ?? `${data.milestone} treninger! 🎉`)
          setTimeout(() => setMilestoneToast(null), 5000)
          confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors })
          confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors })
          setTimeout(() => confetti({ particleCount: 60, spread: 90, origin: { y: 0.5 }, colors }), 300)
        }
      })
    }

    setLoading(false)
  }

  function handleDateChange(date: string) {
    if (timerRunning) stopTimer()
    setTimerSeconds(0)
    setSelectedDate(date)
  }

  async function deleteLog(log: DayLog) {
    setDeletingId(log.id)
    const prev = dayLogs
    onLogChange(dayLogs.filter(l => l.id !== log.id))

    const { error } = await supabase.from('daily_logs')
      .delete()
      .eq('id', log.id)
      .eq('user_id', userId)

    if (error) {
      console.error('[TrainTodayButton] Delete error:', error)
      onLogChange(prev)
    }
    setDeletingId(null)
  }

  return (
    <div className="space-y-3">
      {milestoneToast && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300"
          style={{ background: '#1a1a1a', border: '1.5px solid #e85c00', maxWidth: '90vw' }}
        >
          <div>
            <p className="text-xs text-orange-400 font-semibold uppercase tracking-wide mb-0.5">Milepæl nådd!</p>
            <p className="text-white text-sm font-medium">{milestoneToast}</p>
          </div>
          <button onClick={() => setMilestoneToast(null)} className="text-gray-500 hover:text-gray-300 text-lg leading-none ml-2">×</button>
        </div>
      )}
      <CalendarView
        dayCounts={dayCounts}
        repsByDate={repsByDate}
        selectedDate={selectedDate}
        onSelectDate={handleDateChange}
        firstLogDate={dayLogs.length > 0 ? [...dayLogs].sort((a, b) => a.date.localeCompare(b.date))[0].date : undefined}
      />

      <p className="text-center text-sm text-gray-300 capitalize">{labelDate}</p>

      {packages.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-4 text-center">
          <p className="text-gray-300 text-sm">Du har ingen treningspakker ennå.</p>
          <a href="/workouts" className="text-orange-500 font-semibold text-sm mt-1 block">
            Opprett din første pakke →
          </a>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-2xl p-4 space-y-3">

          {/* Registered workouts for selected day */}
          {logsForDay.length > 0 && (
            <div className="space-y-2">
              {logsForDay.map(log => (
                <div key={log.id} className="flex items-center justify-between bg-gray-700/50 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm text-white font-medium">{log.packageName}</span>
                    {log.durationSeconds != null && (
                      <span className="text-xs text-orange-400">⏱ {formatDuration(log.durationSeconds)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteLog(log)}
                    disabled={deletingId === log.id}
                    className="text-gray-500 text-xs hover:text-red-400 transition disabled:opacity-40"
                  >
                    {deletingId === log.id ? '...' : 'Angre'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add another workout */}
          {canAdd && (
            <>
              {availablePackages.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {availablePackages.map(pkg => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`flex-1 min-w-0 px-3 py-2 rounded-xl text-sm font-medium transition truncate ${
                        activePackage?.id === pkg.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:text-white'
                      }`}
                    >
                      {pkg.name}
                    </button>
                  ))}
                </div>
              )}

              {packageExercises.length > 0 && (
                <div className="bg-gray-800/60 border border-orange-500/20 border-l-4 border-l-orange-500 rounded-2xl px-4 py-3 space-y-2">
                  <p className="text-xs text-orange-400 font-semibold uppercase tracking-wide">{activePackage?.name}</p>
                  <div className="space-y-1">
                    {packageExercises.map((e, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-gray-100">{e.name}</span>
                        <span className="text-sm text-orange-400 font-semibold">{e.reps} reps</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {timerRunning ? (
                <div className="space-y-3">
                  <div className="flex justify-center py-2">
                    <TimerRing seconds={timerSeconds} average={averageSeconds} />
                  </div>
                  <button
                    onClick={() => addLog(true)}
                    disabled={loading || !activePackage}
                    className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:opacity-50 text-white font-bold text-lg rounded-xl py-4 transition"
                  >
                    {loading ? 'Registrerer...' : `■ Ferdig og registrer — ${activePackage?.name}`}
                  </button>
                  <button
                    onClick={stopTimer}
                    className="w-full text-white text-base py-1 hover:text-gray-300 transition"
                  >
                    Avbryt tidtaker
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => addLog(false)}
                    disabled={loading || !activePackage}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:opacity-50 text-white font-bold text-base rounded-xl py-4 transition"
                  >
                    {loading ? 'Registrerer...' : logsForDay.length > 0
  ? <><span className="text-xl font-black leading-none">+</span> Uten tid</>
  : <><span className="text-xl font-black leading-none">+</span> Tren uten tid</>
}
                  </button>
                  <button
                    onClick={startTimer}
                    disabled={loading}
                    className="flex-1 border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white font-bold text-base rounded-xl py-4 transition"
                  >
                    ⏱ Tren med tid
                  </button>
                </div>
              )}
            </>
          )}

          {/* Future date notice */}
          {isFuture && logsForDay.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-2">
              Kan ikke registrere fremtidige datoer
            </p>
          )}

          {/* Nothing logged, past day */}
          {logsForDay.length === 0 && !isFuture && !isToday && (
            <p className="text-center text-gray-500 text-xs">Ingen trening registrert</p>
          )}
        </div>
      )}
    </div>
  )
}
