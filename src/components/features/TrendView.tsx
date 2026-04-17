'use client'

import { useState } from 'react'
import type { StatLog } from './StatistikkClient'

type Period = 'uken' | '7dager'

function toLocalStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function addDays(d: Date, n: number) {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

function calcPeriods(period: Period) {
  const today = new Date()
  today.setHours(12, 0, 0, 0)

  if (period === 'uken') {
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1 // 0=Man
    const monday = addDays(today, -dayOfWeek)
    return {
      thisStart: toLocalStr(monday),
      thisEnd: toLocalStr(today),
      prevStart: toLocalStr(addDays(monday, -7)),
      prevEnd: toLocalStr(addDays(today, -7)),
    }
  } else {
    return {
      thisStart: toLocalStr(addDays(today, -6)),
      thisEnd: toLocalStr(today),
      prevStart: toLocalStr(addDays(today, -13)),
      prevEnd: toLocalStr(addDays(today, -7)),
    }
  }
}

function filterLogs(logs: StatLog[], start: string, end: string) {
  return logs.filter(l => l.logged_date >= start && l.logged_date <= end)
}

function calcMetrics(logs: StatLog[]) {
  return {
    sessions: logs.length,
    reps: logs.reduce((sum, l) => sum + l.reps, 0),
    totalSeconds: logs.reduce((sum, l) => sum + (l.durationSeconds ?? 0), 0),
  }
}

function formatMinutes(seconds: number) {
  const m = Math.round(seconds / 60)
  return `${m} min`
}

function TrendCard({
  label,
  thisVal,
  prevVal,
  format,
}: {
  label: string
  thisVal: number
  prevVal: number
  format: (n: number) => string
}) {
  const diff = thisVal - prevVal
  const noData = thisVal === 0 && prevVal === 0
  const pct = prevVal > 0 ? Math.round((diff / prevVal) * 100) : null
  const better = diff > 0
  const same = diff === 0

  const arrowColor = noData || same ? 'text-gray-500' : better ? 'text-green-400' : 'text-red-400'

  let motivationText = ''
  if (noData) motivationText = 'Ingen data ennå'
  else if (same && prevVal === 0) motivationText = 'Ingen data ennå'
  else if (same) motivationText = 'Likt som forrige periode'
  else if (better) motivationText = `${format(diff)} mer enn forrige periode`
  else motivationText = `${format(Math.abs(diff))} til for å matche forrige periode`

  return (
    <div className="bg-gray-800 rounded-2xl p-4">
      <p className="text-sm text-gray-400 font-medium mb-3">{label}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold text-white">{format(thisVal)}</p>
          <p className="text-xs text-gray-500 mt-1">forrige: {format(prevVal)}</p>
        </div>
        <div className={`flex flex-col items-end gap-0.5 ${arrowColor}`}>
          <span className="text-3xl leading-none">{noData || same ? '→' : better ? '↑' : '↓'}</span>
          {pct !== null && !same && (
            <span className="text-sm font-bold">{better ? '+' : ''}{pct}%</span>
          )}
          {pct === null && !noData && !same && (
            <span className="text-xs font-semibold">ny</span>
          )}
        </div>
      </div>
      <p className={`text-xs mt-3 font-medium ${better ? 'text-green-400' : noData || same ? 'text-gray-500' : 'text-gray-400'}`}>
        {motivationText}
      </p>
    </div>
  )
}

export default function TrendView({ logs }: { logs: StatLog[] }) {
  const [period, setPeriod] = useState<Period>('uken')

  const { thisStart, thisEnd, prevStart, prevEnd } = calcPeriods(period)
  const thisLogs = filterLogs(logs, thisStart, thisEnd)
  const prevLogs = filterLogs(logs, prevStart, prevEnd)
  const thisM = calcMetrics(thisLogs)
  const prevM = calcMetrics(prevLogs)

  const anyDuration = logs.some(l => l.durationSeconds != null)

  const periodLabel = period === 'uken'
    ? { this: 'Man–i dag', prev: 'forrige uke (tilsvarende)' }
    : { this: 'Siste 7 dager', prev: '7–14 dager siden' }

  return (
    <div className="space-y-4">
      <div className="flex bg-gray-800 rounded-2xl p-1">
        {(['uken', '7dager'] as Period[]).map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
              period === p ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {p === 'uken' ? 'Denne uken' : 'Siste 7 dager'}
          </button>
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span>{periodLabel.this}</span>
        <span>vs {periodLabel.prev}</span>
      </div>

      <TrendCard
        label="Økter"
        thisVal={thisM.sessions}
        prevVal={prevM.sessions}
        format={n => String(n)}
      />
      <TrendCard
        label="Repetisjoner"
        thisVal={thisM.reps}
        prevVal={prevM.reps}
        format={n => String(n)}
      />
      {anyDuration && (
        <TrendCard
          label="Tid"
          thisVal={thisM.totalSeconds}
          prevVal={prevM.totalSeconds}
          format={formatMinutes}
        />
      )}
    </div>
  )
}
