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
  const noData = thisVal === 0 && prevVal === 0

  if (noData) return <span className="text-gray-400 text-xl font-black leading-none">→</span>

  const same = diff === 0
  const better = diff > 0
  const color = same ? 'text-gray-300' : better ? 'text-green-400' : 'text-red-400'
  const arrow = same ? '→' : better ? '↑' : '↓'
  const pctStr = pct !== null ? `${better ? '+' : ''}${pct}%` : better ? 'ny' : '–'

  return (
    <div className={`flex items-center gap-0.5 ${color}`}>
      <span className="text-xl font-black leading-none">{arrow}</span>
      <span className="text-sm font-black">{pctStr}</span>
    </div>
  )
}

function StatCard({
  label,
  thisVal,
  prevVal,
  format,
  thisLabel,
  prevLabel,
}: {
  label: string
  thisVal: number
  prevVal: number
  format: (n: number) => string
  thisLabel: string
  prevLabel: string
}) {
  const thisWins = thisVal > prevVal
  const prevWins = prevVal > thisVal

  return (
    <div className="bg-gray-800 rounded-2xl p-4">
      <div className="flex justify-between items-start mb-3">
        <p className="text-xs text-gray-300 font-medium">{label}</p>
        <PctArrow thisVal={thisVal} prevVal={prevVal} />
      </div>
      <div className="flex gap-4">
        <div>
          <p className={`text-3xl font-bold leading-none ${thisWins ? 'text-green-400' : 'text-white'}`}>
            {format(thisVal)}
          </p>
          <p className="text-xs text-gray-300 mt-1">{thisLabel}</p>
        </div>
        <div>
          <p className={`text-3xl font-bold leading-none ${prevWins ? 'text-green-400' : 'text-white'}`}>
            {format(prevVal)}
          </p>
          <p className="text-xs text-gray-300 mt-1">{prevLabel}</p>
        </div>
      </div>
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
        <p className="text-xs text-gray-300 font-semibold uppercase tracking-wide">Treningspakker</p>
        <p className="text-xs text-gray-300">denne / {prevLabel}</p>
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
                <span className={better ? 'text-green-400 font-bold' : same ? 'text-gray-300' : 'text-red-400 font-bold'}>
                  {better ? '↑' : same ? '→' : '↓'}
                </span>
                <span className="text-white font-semibold">{t.count} tr</span>
                <span className="text-gray-300">/ {p.count} tr</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-300">
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
              period === p ? 'bg-orange-500 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            {p === 'uken' ? 'Denne uken' : 'Siste 7 dager'}
          </button>
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-300 px-1">
        <span>{periodLabel.this}</span>
        <span>vs {periodLabel.prev}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Treninger"
          thisVal={thisSessions}
          prevVal={prevSessions}
          format={n => String(n)}
          thisLabel={period === 'uken' ? 'denne uken' : 'siste 7 d'}
          prevLabel={period === 'uken' ? 'forrige uke' : '7–14 d siden'}
        />
        <StatCard
          label="Reps"
          thisVal={thisReps}
          prevVal={prevReps}
          format={n => n.toLocaleString('nb-NO')}
          thisLabel={period === 'uken' ? 'denne uken' : 'siste 7 d'}
          prevLabel={period === 'uken' ? 'forrige uke' : '7–14 d siden'}
        />
      </div>

      {anyDuration && (
        <StatCard
          label="Tid"
          thisVal={thisTime}
          prevVal={prevTime}
          format={fmtTime}
          thisLabel={period === 'uken' ? 'denne uken' : 'siste 7 d'}
          prevLabel={period === 'uken' ? 'forrige uke' : '7–14 d siden'}
        />
      )}

      <PackageCompare thisLogs={thisLogs} prevLogs={prevLogs} prevLabel={prevLabel} />
    </div>
  )
}
