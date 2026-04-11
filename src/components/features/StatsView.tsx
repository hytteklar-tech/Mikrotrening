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

  // Periodefiltrerte data for de to nederste seksjonene
  const calendarDaySet = new Set(calendarDays)
  const periodLogs = logs.filter(l => calendarDaySet.has(l.logged_date))

  function calcPeriodTopStreaks(dates: string[]) {
    if (!dates.length) return []
    const sorted = [...new Set(dates)].sort()
    const streaks: { days: number; start: string; end: string }[] = []
    let start = sorted[0], end = sorted[0], count = 1
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1] + 'T12:00:00')
      prev.setDate(prev.getDate() + 1)
      if (prev.toDateString() === new Date(sorted[i] + 'T12:00:00').toDateString()) {
        end = sorted[i]; count++
      } else {
        streaks.push({ days: count, start, end })
        start = sorted[i]; end = sorted[i]; count = 1
      }
    }
    streaks.push({ days: count, start, end })
    return streaks.sort((a, b) => b.days - a.days).slice(0, 3)
  }

  const periodUniqueDates = [...new Set(periodLogs.map(l => l.logged_date))]
  const periodTopStreaks = calcPeriodTopStreaks(periodUniqueDates)
  const periodLabel2 = tab === 'uke' ? 'denne uken' : tab === 'mnd' ? 'denne måneden' : 'i år'

  // Nåværende streak — start/slutt dato
  const allUniqueDates = [...new Set(logs.map(l => l.logged_date))]
  const currentStreakEnd = allUniqueDates.includes(toLocalDateStr(today))
    ? toLocalDateStr(today)
    : (() => { const d = new Date(today); d.setDate(d.getDate() - 1); return toLocalDateStr(d) })()
  const currentStreakStartD = new Date(currentStreakEnd + 'T12:00:00')
  currentStreakStartD.setDate(currentStreakStartD.getDate() - (currentStreak - 1))
  const currentStreakStart = currentStreak > 0 ? toLocalDateStr(currentStreakStartD) : ''

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
          <p className="text-2xl font-bold text-white">{periodReps.toLocaleString('nb-NO')}</p>
          <p className="text-orange-400 font-bold text-lg leading-tight">
            {trainedDays > 0 ? Math.round(periodReps / trainedDays) : 0} /dag
          </p>
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
                    <span className="text-white text-xs font-semibold leading-none self-start mt-1">{bar.value}</span>
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
          <p className="text-gray-600 text-xs mt-1">
            {currentStreak > 0 ? `${formatDate(currentStreakStart)} – ${formatDate(currentStreakEnd)}` : '–'}
          </p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-4">
          <p className="text-gray-400 text-xs mb-1">Lengste streak</p>
          <p className="text-3xl font-bold text-yellow-400">{longestStreak} 🏆</p>
          <p className="text-gray-500 text-xs mt-1">dager på rad</p>
          <p className="text-gray-600 text-xs mt-1">
            {topStreaks[0] ? `${formatDate(topStreaks[0].start)} – ${formatDate(topStreaks[0].end)}` : '–'}
          </p>
        </div>
      </div>

      {/* Topp 3 streak-badges */}
      {periodTopStreaks.length > 0 && (
        <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Beste streaks {periodLabel2}</p>
          {periodTopStreaks.map((s, i) => {
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

      {/* Totaler — kumulativ kurve */}
      {(() => {
        const allDates = [...new Set(logs.map(l => l.logged_date))].sort()
        if (allDates.length < 2) return (
          <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Totalt noensinne</p>
            <p className="text-white font-bold">{totalTrainings} treninger · {totalReps.toLocaleString('nb-NO')} reps</p>
          </div>
        )

        const W = 320
        const H = 120
        const pL = 8, pR = 8, pT = 16, pB = 24
        const cW = W - pL - pR
        const cH = H - pT - pB

        const startMs = new Date(allDates[0] + 'T12:00:00').getTime()
        const endMs = new Date(allDates[allDates.length - 1] + 'T12:00:00').getTime()
        const spanMs = endMs - startMs || 1

        const points = allDates.map((d, i) => {
          const ms = new Date(d + 'T12:00:00').getTime()
          const x = pL + ((ms - startMs) / spanMs) * cW
          const y = pT + (1 - (i + 1) / allDates.length) * cH
          return [x, y] as [number, number]
        })

        const polyline = points.map(([x, y]) => `${x},${y}`).join(' ')
        const area = `${points[0][0]},${pT + cH} ` + polyline + ` ${points[points.length - 1][0]},${pT + cH}`

        // Månedspunkter med x, y og etikett
        const monthLabels: { x: number; y: number; label: string }[] = []
        const seen = new Set<string>()
        for (let i = 0; i < allDates.length; i++) {
          const d = allDates[i]
          const key = d.slice(0, 7)
          if (!seen.has(key)) {
            seen.add(key)
            monthLabels.push({ x: points[i][0], y: points[i][1], label: new Date(d + 'T12:00:00').toLocaleDateString('nb-NO', { month: 'short' }) })
          }
        }
        // Vis maks 6 etiketter for å unngå overlapp
        const step = Math.ceil(monthLabels.length / 6)
        const visibleLabels = monthLabels.filter((_, i) => i % step === 0)

        const last = points[points.length - 1]

        return (
          <div className="bg-gray-800 rounded-2xl p-4">
            <div className="flex justify-between items-baseline mb-3">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Totalt noensinne</p>
              <p className="text-white text-sm font-bold">{totalTrainings} treninger · {totalReps.toLocaleString('nb-NO')} reps</p>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {/* Fyllt område */}
              <polygon points={area} fill="url(#areaGrad)" />
              {/* Kurve */}
              <polyline points={polyline} fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {/* Månedsprikker */}
              {visibleLabels.map(({ x, y, label }) => (
                <circle key={label} cx={x} cy={y} r="2.5" fill="white" />
              ))}
              {/* Siste punkt */}
              <circle cx={last[0]} cy={last[1]} r="3.5" fill="#f97316" />
              {/* Månedsetiketter */}
              {visibleLabels.map(({ x, label }) => (
                <text key={label} x={x} y={H - 4} textAnchor="middle" fontSize="9" fill="#6b7280">{label}</text>
              ))}
            </svg>
          </div>
        )
      })()}

      {/* Per treningspakke */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
        {(() => {
          const byPackage = periodLogs.reduce<Record<string, { count: number; reps: number }>>((acc, l) => {
            if (!acc[l.packageName]) acc[l.packageName] = { count: 0, reps: 0 }
            acc[l.packageName].count++
            acc[l.packageName].reps += l.reps
            return acc
          }, {})
          const entries = Object.entries(byPackage).sort((a, b) => b[1].count - a[1].count)
          const maxCount = entries[0]?.[1].count ?? 1
          const totalPeriodTrainings = periodLogs.length
          const totalPeriodReps = periodLogs.reduce((s, l) => s + l.reps, 0)
          return (
            <>
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Per treningspakke — {periodLabel2}</p>
                <div className="flex items-center gap-1.5">
                  <span className="border border-orange-500 rounded-full px-2 py-0.5 text-orange-400 text-xs font-semibold leading-none">
                    {totalPeriodTrainings} tr
                  </span>
                  <span className="border border-orange-500 rounded-full px-2 py-0.5 text-orange-400 text-xs font-semibold leading-none">
                    {totalPeriodReps.toLocaleString('nb-NO')} reps
                  </span>
                </div>
              </div>
              {entries.map(([name, stats]) => (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-white text-sm font-medium">{name}</span>
                    <span className="text-gray-400 text-xs">{stats.count} tr · {stats.reps.toLocaleString('nb-NO')} reps</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all"
                      style={{ width: `${(stats.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </>
          )
        })()}
      </div>
    </div>
  )
}
