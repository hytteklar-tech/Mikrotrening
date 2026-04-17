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
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1
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

function fmtTime(seconds: number) {
  if (seconds < 3600) return `${Math.round(seconds / 60)} min`
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return m > 0 ? `${h}t ${m}m` : `${h}t`
}

function PctArrow({ thisVal, prevVal }: { thisVal: number; prevVal: number }) {
  const diff = thisVal - prevVal
  const pct = prevVal > 0 ? Math.round((diff / prevVal) * 100) : null
  const noChange = diff === 0

  if (thisVal === 0 && prevVal === 0) return <span className="text-gray-600 text-2xl font-black">→</span>

  if (noChange) return (
    <div className="flex items-center gap-1 text-gray-400">
      <span className="text-2xl font-black">→</span>
      <span className="text-sm font-bold">0%</span>
    </div>
  )

  const better = diff > 0
  const color = better ? 'text-green-400' : 'text-red-400'
  return (
    <div className={`flex items-center gap-1 ${color}`}>
      <span className="text-2xl font-black">{better ? '↑' : '↓'}</span>
      <span className="text-sm font-bold">
        {pct !== null ? `${better ? '+' : ''}${pct}%` : (better ? 'ny' : '–')}
      </span>
    </div>
  )
}

function StatCard({
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
  return (
    <div className="bg-gray-800 rounded-2xl p-4 flex flex-col gap-2">
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <div>
        <span className="text-4xl font-bold text-white">{format(thisVal)}</span>
        <span className="text-sm text-gray-500 ml-1">/ {format(prevVal)}</span>
      </div>
      <PctArrow thisVal={thisVal} prevVal={prevVal} />
    </div>
  )
}

function PackageCompare({
  thisLogs,
  prevLogs,
  prevLabel,
}: {
  thisLogs: StatLog[]
  prevLogs: StatLog[]
  prevLabel: string
}) {
  function byPackage(logs: StatLog[]) {
    const map: Record<string, { count: number; reps: number }> = {}
    for (const l of logs) {
      if (!map[l.packageName]) map[l.packageName] = { count: 0, reps: 0 }
      map[l.packageName].count++
      map[l.packageName].reps += l.reps
    }
    return map
  }

  const thisMap = byPackage(thisLogs)
  const prevMap = byPackage(prevLogs)

  const allNames = [...new Set([...Object.keys(thisMap), ...Object.keys(prevMap)])]
    .sort((a, b) => (thisMap[b]?.count ?? 0) - (thisMap[a]?.count ?? 0))

  if (allNames.length === 0) return null

  return (
    <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
      <div className="flex justify-between items-baseline">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Treningspakker</p>
        <p className="text-xs text-gray-500">denne / {prevLabel}</p>
      </div>
      {allNames.map(name => {
        const t = thisMap[name] ?? { count: 0, reps: 0 }
        const p = prevMap[name] ?? { count: 0, reps: 0 }
        const diff = t.count - p.count
        const better = diff > 0
        const same = diff === 0
        return (
          <div key={name} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm font-medium">{name}</span>
              <div className="flex items-center gap-2 text-xs">
                <span className={better ? 'text-green-400 font-bold' : same ? 'text-gray-400' : 'text-red-400 font-bold'}>
                  {better ? '↑' : same ? '→' : '↓'}
                </span>
                <span className="text-white font-semibold">{t.count} tr</span>
                <span className="text-gray-500">/ {p.count} tr</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{t.reps.toLocaleString('nb-NO')} reps</span>
              <span>forrige: {p.reps.toLocaleString('nb-NO')} reps</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function TrendView({ logs }: { logs: StatLog[] }) {
  const [period, setPeriod] = useState<Period>('uken')

  const { thisStart, thisEnd, prevStart, prevEnd } = calcPeriods(period)
  const thisLogs = filterLogs(logs, thisStart, thisEnd)
  const prevLogs = filterLogs(logs, prevStart, prevEnd)

  const thisSessions = thisLogs.length
  const prevSessions = prevLogs.length
  const thisReps = thisLogs.reduce((s, l) => s + l.reps, 0)
  const prevReps = prevLogs.reduce((s, l) => s + l.reps, 0)
  const thisTime = thisLogs.reduce((s, l) => s + (l.durationSeconds ?? 0), 0)
  const prevTime = prevLogs.reduce((s, l) => s + (l.durationSeconds ?? 0), 0)
  const anyDuration = logs.some(l => l.durationSeconds != null)

  const prevLabel = period === 'uken' ? 'forrige uke' : '7–14 dager siden'
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

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Treninger"
          thisVal={thisSessions}
          prevVal={prevSessions}
          format={n => String(n)}
        />
        <StatCard
          label="Reps"
          thisVal={thisReps}
          prevVal={prevReps}
          format={n => n.toLocaleString('nb-NO')}
        />
      </div>

      {anyDuration && (
        <StatCard
          label="Tid"
          thisVal={thisTime}
          prevVal={prevTime}
          format={fmtTime}
        />
      )}

      <PackageCompare thisLogs={thisLogs} prevLogs={prevLogs} prevLabel={prevLabel} />
    </div>
  )
}
