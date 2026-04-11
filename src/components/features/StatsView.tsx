'use client'

import { useState } from 'react'

type LogEntry = { logged_date: string; reps: number; packageName: string }

const STREAK_BADGES = [
  { days: 7,   emoji: '🥉', name: 'Gnisten' },
  { days: 30,  emoji: '🥈', name: 'Vanebygger' },
  { days: 90,  emoji: '🥇', name: 'Maskinen' },
  { days: 180, emoji: '💎', name: 'Ustoppelig' },
  { days: 270, emoji: '🔥', name: 'Jernvilje' },
  { days: 365, emoji: '👑', name: 'Legenden' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })
}

type TopStreak = { days: number; start: string; end: string }

type Props = {
  logs: LogEntry[]
  currentStreak: number
  longestStreak: number
  topStreaks: TopStreak[]
}

type Tab = 'uke' | 'mnd' | 'år'

function toLocalDateStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day === 0 ? -6 : 1 - day)
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function isoWeek(date: Date): string {
  const d = new Date(date)
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`
}

export default function StatsView({ logs, currentStreak, longestStreak, topStreaks }: Props) {
  const [tab, setTab] = useState<Tab>('mnd')
  const [infoOpen, setInfoOpen] = useState(false)

  const today = new Date()
  today.setHours(12, 0, 0, 0)

  // -- Uke-data: siste 7 dager --
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    return toLocalDateStr(d)
  })
  const weekLabels = weekDays.map(d =>
    new Date(d + 'T12:00:00').toLocaleDateString('nb-NO', { weekday: 'short' })
  )

  // -- Måneds-data: siste 8 uker (søndag til lørdag) --
  const weekStart = getWeekStart(today)
  const monthWeeks = Array.from({ length: 8 }, (_, i) => {
    const start = new Date(weekStart)
    start.setDate(weekStart.getDate() - (7 - i) * 7)
    const days = Array.from({ length: 7 }, (_, j) => {
      const d = new Date(start)
      d.setDate(start.getDate() + j)
      return toLocalDateStr(d)
    })
    const label = `U${isoWeek(start).split('-W')[1]}`
    return { days, label }
  })

  // -- Års-data: siste 12 måneder --
  const yearMonths = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() - (11 - i), 1)
    const year = d.getFullYear()
    const month = d.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = Array.from({ length: daysInMonth }, (_, j) =>
      `${year}-${String(month + 1).padStart(2, '0')}-${String(j + 1).padStart(2, '0')}`
    )
    const label = d.toLocaleDateString('nb-NO', { month: 'short' })
    return { days, label }
  })

  // Build a map: date → { sessions, reps } to handle multiple logs per day
  const dateMap = new Map<string, { sessions: number; reps: number }>()
  for (const l of logs) {
    const existing = dateMap.get(l.logged_date)
    if (existing) {
      existing.sessions++
      existing.reps += l.reps
    } else {
      dateMap.set(l.logged_date, { sessions: 1, reps: l.reps })
    }
  }

  function countTrainings(days: string[]) {
    return days.reduce((sum, d) => sum + (dateMap.get(d)?.sessions ?? 0), 0)
  }
  function sumReps(days: string[]) {
    return days.reduce((sum, d) => sum + (dateMap.get(d)?.reps ?? 0), 0)
  }

  // Aggregerte tall for valgt periode (graf)
  const periodDays = tab === 'uke'
    ? weekDays
    : tab === 'mnd'
    ? monthWeeks.flatMap(w => w.days)
    : yearMonths.flatMap(m => m.days)

  // Kalenderbasert periode for kortene
  const calendarDays: string[] = []
  if (tab === 'uke') {
    const d = new Date(getWeekStart(today))
    while (toLocalDateStr(d) <= toLocalDateStr(today)) {
      calendarDays.push(toLocalDateStr(d))
      d.setDate(d.getDate() + 1)
    }
  } else if (tab === 'mnd') {
    const d = new Date(today.getFullYear(), today.getMonth(), 1)
    while (toLocalDateStr(d) <= toLocalDateStr(today)) {
      calendarDays.push(toLocalDateStr(d))
      d.setDate(d.getDate() + 1)
    }
  } else {
    const d = new Date(today.getFullYear(), 0, 1)
    while (toLocalDateStr(d) <= toLocalDateStr(today)) {
      calendarDays.push(toLocalDateStr(d))
      d.setDate(d.getDate() + 1)
    }
  }

  const possibleDays = calendarDays.length
  const trainedDays = calendarDays.filter(d => dateMap.has(d)).length
  const trainedPct = possibleDays === 0 ? 0 : Math.round((trainedDays / possibleDays) * 100)
  const periodReps = sumReps(calendarDays)

  const periodLabel = tab === 'uke' ? 'denne uken' : tab === 'mnd' ? 'denne måneden' : 'i år'
  const infoText = tab === 'uke'
    ? 'Dager du har trent av mulige dager denne uken (man–i dag). Flere økter samme dag teller som én dag.'
    : tab === 'mnd'
    ? 'Dager du har trent av mulige dager denne måneden. Flere økter samme dag teller som én dag.'
    : 'Dager du har trent av mulige dager i år. Flere økter samme dag teller som én dag.'

  const totalTrainings = logs.length
  const totalReps = logs.reduce((s, l) => s + l.reps, 0)

  // Bar chart data
  type Bar = { label: string; value: number; max: number; isToday?: boolean }
  let bars: Bar[] = []

  if (tab === 'uke') {
    bars = weekDays.map((d, i) => ({
      label: weekLabels[i],
      value: dateMap.has(d) ? 1 : 0,
      max: 1,
      isToday: d === toLocalDateStr(today),
    }))
  } else if (tab === 'mnd') {
    const counts = monthWeeks.map(w => countTrainings(w.days))
    const maxVal = Math.max(...counts, 1)
    bars = monthWeeks.map((w, i) => ({
      label: w.label,
      value: counts[i],
      max: maxVal,
    }))
  } else {
    const counts = yearMonths.map(m => countTrainings(m.days))
    const maxVal = Math.max(...counts, 1)
    bars = yearMonths.map((m, i) => ({
      label: m.label,
      value: counts[i],
      max: maxVal,
    }))
  }

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex bg-gray-800 rounded-2xl p-1">
        {(['uke', 'mnd', 'år'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition capitalize ${
              tab === t ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t === 'uke' ? 'Uke' : t === 'mnd' ? 'Måned' : 'År'}
          </button>
        ))}
      </div>

      {/* Periode-kort */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-1">
            <p className="text-gray-400 text-xs">Treninger</p>
            <button
              onClick={() => setInfoOpen(v => !v)}
              className="text-gray-500 hover:text-white text-xs leading-none"
            >
              {infoOpen ? '✕' : 'ⓘ'}
            </button>
          </div>
          {infoOpen ? (
            <p className="text-gray-300 text-xs leading-relaxed">{infoText}</p>
          ) : (
            <>
              <p className="text-2xl font-bold text-white">{trainedDays} av {possibleDays}</p>
              <p className="text-orange-400 font-bold text-lg leading-tight">{trainedPct}%</p>
              <p className="text-gray-500 text-xs mt-1">{periodLabel}</p>
            </>
          )}
        </div>
        <div className="bg-gray-800 rounded-2xl p-4">
          <p className="text-gray-400 text-xs mb-1">Reps</p>
          <p className="text-3xl font-bold text-white">{periodReps.toLocaleString('nb-NO')}</p>
          <p className="text-gray-500 text-xs mt-1">{periodLabel}</p>
        </div>
      </div>

      {/* Graf */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <p className="text-gray-400 text-xs mb-4">
          {tab === 'uke' ? 'Siste 7 dager' : tab === 'mnd' ? 'Siste 8 uker' : 'Siste 12 måneder'}
        </p>
        <div className="flex items-end gap-1">
          {bars.map((bar, i) => {
            const barHeight = bar.max === 0 ? 4 : Math.max((bar.value / bar.max) * 64, bar.value > 0 ? 8 : 4)
            const isEmpty = bar.value === 0
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-md transition-all flex items-center justify-center ${
                    isEmpty
                      ? 'bg-gray-700'
                      : bar.isToday
                      ? 'bg-orange-500'
                      : 'bg-orange-400/70'
                  }`}
                  style={{ height: `${barHeight}px` }}
                >
                  {!isEmpty && barHeight >= 16 && (
                    <span className="text-white text-xs font-semibold leading-none">{bar.value}</span>
                  )}
                </div>
                <span className="text-gray-500 text-xs leading-none">{bar.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Streak-kort */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800 rounded-2xl p-4">
          <p className="text-gray-400 text-xs mb-1">Nåværende streak</p>
          <p className="text-3xl font-bold text-orange-400">{currentStreak} 🔥</p>
          <p className="text-gray-500 text-xs mt-1">dager på rad</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-4">
          <p className="text-gray-400 text-xs mb-1">Lengste streak</p>
          <p className="text-3xl font-bold text-yellow-400">{longestStreak} 🏆</p>
          <p className="text-gray-500 text-xs mt-1">dager på rad</p>
        </div>
      </div>

      {/* Topp 3 streak-badges */}
      {topStreaks.length > 0 && (
        <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Beste streak-perioder</p>
          {topStreaks.map((s, i) => {
            const badge = [...STREAK_BADGES].reverse().find(b => s.days >= b.days)
            const rank = ['#1', '#2', '#3'][i]
            return (
              <div key={i}>
                {i > 0 && <div className="h-px bg-gray-700" />}
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs w-5">{rank}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {badge ? `${badge.emoji} ${badge.name}` : '–'}{' '}
                        <span className="text-orange-400 font-bold">{s.days} dager</span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        {formatDate(s.start)} – {formatDate(s.end)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Totaler */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Totalt noensinne</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Antall treninger</span>
          <span className="text-white font-bold">{totalTrainings}</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Totale reps</span>
          <span className="text-white font-bold">{totalReps.toLocaleString('nb-NO')}</span>
        </div>
      </div>

      {/* Per treningspakke */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Per treningspakke</p>
        {(() => {
          const byPackage = logs.reduce<Record<string, { count: number; reps: number }>>((acc, l) => {
            if (!acc[l.packageName]) acc[l.packageName] = { count: 0, reps: 0 }
            acc[l.packageName].count++
            acc[l.packageName].reps += l.reps
            return acc
          }, {})
          const entries = Object.entries(byPackage).sort((a, b) => b[1].count - a[1].count)
          return entries.map(([name, stats], i) => (
            <div key={name}>
              {i > 0 && <div className="h-px bg-gray-700" />}
              <div className="flex justify-between items-start py-1">
                <span className="text-gray-300 text-sm font-medium">{name}</span>
                <div className="text-right">
                  <span className="text-white font-bold text-sm">{stats.count} treninger</span>
                  <p className="text-gray-400 text-xs">{stats.reps.toLocaleString('nb-NO')} reps</p>
                </div>
              </div>
            </div>
          ))
        })()}
      </div>
    </div>
  )
}
