'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import StatsView from '@/components/features/StatsView'
import TestStatsView from '@/components/features/TestStatsView'
import type { TestType, TestResult } from '@/components/features/TestClient'

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
  if (!dates.includes(toStr(d))) {
    d.setDate(d.getDate() - 1)
  }
  let streak = 0
  while (true) {
    if (dates.includes(toStr(d))) {
      streak++
      d.setDate(d.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

type MainTab = 'trening' | 'tester'

export default function StatistikkPage() {
  const [mainTab, setMainTab] = useState<MainTab>('trening')
  const [logs, setLogs] = useState<{ logged_date: string; reps: number; packageName: string }[]>([])
  const [testTypes, setTestTypes] = useState<TestType[]>([])
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function fetchAll() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }

      const [logsRes, typesRes, resultsRes] = await Promise.all([
        supabase
          .from('daily_logs')
          .select('logged_date, duration_seconds, workout_packages ( name, exercises ( reps ) )')
          .eq('user_id', session.user.id)
          .order('logged_date', { ascending: true }),
        supabase
          .from('test_types')
          .select('id, name, unit, higher_is_better, user_id')
          .or(`user_id.is.null,user_id.eq.${session.user.id}`)
          .order('created_at', { ascending: true }),
        supabase
          .from('test_results')
          .select('id, test_type_id, result, tested_date, notes')
          .eq('user_id', session.user.id)
          .order('tested_date', { ascending: true }),
      ])

      const mappedLogs = (logsRes.data ?? []).map(row => {
        const pkg = row.workout_packages as any
        const exercises = pkg?.exercises ?? []
        const reps = exercises.reduce((sum: number, e: { reps: number }) => sum + e.reps, 0)
        return { logged_date: row.logged_date as string, reps, packageName: (pkg?.name ?? 'Ukjent') as string, durationSeconds: row.duration_seconds as number | null }
      })
      setLogs(mappedLogs)

      setTestTypes((typesRes.data ?? []).map(t => ({
        id: t.id as string,
        name: t.name as string,
        unit: t.unit as string,
        higherIsBetter: t.higher_is_better as boolean,
        isOwn: t.user_id === session.user.id,
      })))

      setTestResults((resultsRes.data ?? []).map(r => ({
        id: r.id as string,
        testTypeId: r.test_type_id as string,
        result: Number(r.result),
        testedDate: r.tested_date as string,
        notes: r.notes as string | null,
      })))

      setLoading(false)
    }

    fetchAll()
  }, [])

  const dates = [...new Set(logs.map(l => l.logged_date))]
  const currentStreak = calcCurrentStreak(dates)
  const longestStreak = calcLongestStreak(dates)
  const topStreaks = calcTopStreaks(dates)

  return (
    <div className="p-4 space-y-5 pb-28">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Statistikk</h1>
      </div>

      {/* Main tabs */}
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

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : mainTab === 'trening' ? (
        <StatsView logs={logs} currentStreak={currentStreak} longestStreak={longestStreak} topStreaks={topStreaks} />
      ) : (
        <TestStatsView testTypes={testTypes} testResults={testResults} />
      )}
    </div>
  )
}
