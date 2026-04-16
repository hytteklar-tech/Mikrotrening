'use client'

import { useState } from 'react'
import StatsView from './StatsView'
import TestStatsView from './TestStatsView'
import type { TestType, TestResult } from './TestClient'

export type StatLog = {
  logged_date: string
  reps: number
  packageName: string
  durationSeconds: number | null
}

type Props = {
  logs: StatLog[]
  testTypes: TestType[]
  testResults: TestResult[]
}

type MainTab = 'trening' | 'tester'

function calcLongestStreak(dates: string[]): number {
  if (!dates.length) return 0
  const sorted = [...dates].sort()
  let longest = 1
  let current = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T12:00:00')
    const curr = new Date(sorted[i] + 'T12:00:00')
    prev.setDate(prev.getDate() + 1)
    if (prev.toDateString() === curr.toDateString()) {
      current++
      longest = Math.max(longest, current)
    } else {
      current = 1
    }
  }
  return longest
}

function calcTopStreaks(dates: string[]): { days: number; start: string; end: string }[] {
  if (!dates.length) return []
  const sorted = [...new Set(dates)].sort()
  const streaks: { days: number; start: string; end: string }[] = []
  let start = sorted[0]
  let end = sorted[0]
  let count = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T12:00:00')
    const curr = new Date(sorted[i] + 'T12:00:00')
    prev.setDate(prev.getDate() + 1)
    if (prev.toDateString() === curr.toDateString()) {
      end = sorted[i]
      count++
    } else {
      streaks.push({ days: count, start, end })
      start = sorted[i]
      end = sorted[i]
      count = 1
    }
  }
  streaks.push({ days: count, start, end })
  return streaks.sort((a, b) => b.days - a.days).slice(0, 3)
}

function calcCurrentStreak(dates: string[]): number {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  const toStr = (dt: Date) =>
    `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
  if (!dates.includes(toStr(d))) d.setDate(d.getDate() - 1)
  let streak = 0
  while (dates.includes(toStr(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

export default function StatistikkClient({ logs, testTypes, testResults }: Props) {
  const [mainTab, setMainTab] = useState<MainTab>('trening')

  const dates = [...new Set(logs.map(l => l.logged_date))]
  const currentStreak = calcCurrentStreak(dates)
  const longestStreak = calcLongestStreak(dates)
  const topStreaks = calcTopStreaks(dates)

  return (
    <div className="p-4 space-y-5 pb-28">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Statistikk</h1>
      </div>

      <div className="flex bg-gray-800 rounded-2xl p-1">
        {(['trening', 'tester'] as MainTab[]).map(t => (
          <button
            key={t}
            onClick={() => setMainTab(t)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition capitalize ${
              mainTab === t ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t === 'trening' ? 'Trening' : 'Tester'}
          </button>
        ))}
      </div>

      {mainTab === 'trening' ? (
        <StatsView logs={logs} currentStreak={currentStreak} longestStreak={longestStreak} topStreaks={topStreaks} />
      ) : (
        <TestStatsView testTypes={testTypes} testResults={testResults} />
      )}
    </div>
  )
}
