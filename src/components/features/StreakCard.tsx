'use client'

import { useState } from 'react'

const MILESTONES = [7, 14, 30, 50, 100]

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

function ProgressRing({ streak, nextMilestone, alive }: { streak: number; nextMilestone: number; alive: boolean }) {
  const r = 30
  const cx = 36
  const circumference = 2 * Math.PI * r
  const percent = alive ? Math.min(streak / nextMilestone, 1) : 0
  const offset = circumference * (1 - percent)

  return (
    <svg width={72} height={72} viewBox="0 0 72 72" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#1f1f1f" strokeWidth="5" />
      {alive && percent > 0 && (
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="#e85c00"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      )}
      <text x={cx} y={cx - 3} textAnchor="middle" fill={alive ? 'white' : '#555'} fontSize="16" fontWeight="600" fontFamily="sans-serif">
        {streak}
      </text>
      <text x={cx} y={cx + 12} textAnchor="middle" fill="#555" fontSize="8" fontFamily="sans-serif">
        av {nextMilestone}
      </text>
    </svg>
  )
}

function MonthCalendar({ dates }: { dates: string[] }) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const todayDate = today.getDate()

  const countByDay: Record<number, number> = {}
  for (const d of dates) {
    const date = new Date(d + 'T12:00:00')
    if (date.getFullYear() === year && date.getMonth() === month) {
      const day = date.getDate()
      countByDay[day] = (countByDay[day] || 0) + 1
    }
  }

  const offset = (firstDay + 6) % 7
  const cells: (number | null)[] = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['M', 'T', 'O', 'T', 'F', 'L', 'S'].map((d, i) => (
          <div key={i} className="text-center" style={{ fontSize: 9, color: '#555' }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const count = countByDay[day] || 0
          const isToday = day === todayDate
          const bg = count >= 2 ? '#e85c00' : count === 1 ? '#3a1f00' : '#1a1a1a'
          return (
            <div
              key={i}
              className="aspect-square flex items-center justify-center rounded"
              style={{
                background: bg,
                border: isToday ? '1.5px solid #e85c00' : '1.5px solid transparent',
                color: count > 0 ? 'white' : '#555',
                fontSize: 10,
              }}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TrendChart({ dates }: { dates: string[] }) {
  const today = new Date()
  const weeks = []

  for (let w = 6; w >= 0; w--) {
    const monday = new Date(today)
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) - w * 7)
    monday.setHours(0, 0, 0, 0)
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23, 59, 59, 999)

    const count = dates.filter(d => {
      const date = new Date(d + 'T12:00:00')
      return date >= monday && date <= sunday
    }).length

    weeks.push({ weekNum: getWeekNumber(monday), count })
  }

  const maxCount = Math.max(...weeks.map(w => w.count), 1)

  return (
    <div className="flex items-end gap-1" style={{ height: 80 }}>
      {weeks.map((w, i) => {
        const isCurrentWeek = i === 6
        const heightPct = w.count === 0 ? 5 : Math.max((w.count / maxCount) * 100, 10)
        let color = '#1f1f1f'
        if (w.count > 0) color = isCurrentWeek || w.count >= maxCount ? '#e85c00' : '#7a3000'
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1" style={{ height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', height: `${heightPct}%`, background: color, borderRadius: 3 }} />
            <span style={{ fontSize: 9, color: '#555' }}>{w.weekNum}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function StreakCard({ streak, totalSessions, isNewUser, dates, onScrollToToday }: {
  streak: number
  hasTrained: boolean
  totalSessions: number
  isNewUser?: boolean
  dates: string[]
  onScrollToToday?: () => void
}) {
  const [tab, setTab] = useState<'month' | 'trend'>('month')

  const alive = streak > 0
  const nextMilestone = MILESTONES.find(m => m > streak) ?? MILESTONES[MILESTONES.length - 1]
  const nextMilestoneIdx = MILESTONES.findIndex(m => m > streak)

  return (
    <div className="rounded-2xl p-4 space-y-3" style={{ background: '#111' }}>
      {/* Header: tekst venstre, ring høyre */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, color: 'white' }}>
            Du har trent{' '}
            <span style={{ color: alive ? '#e85c00' : '#555' }}>{streak}</span>
            {' '}dager på rad.
          </p>
          <p style={{ fontSize: 14, color: '#555', marginTop: 4 }}>{totalSessions} dager totalt.</p>
          {!alive && !isNewUser && (
            <button
              onClick={onScrollToToday}
              style={{ color: '#e85c00', fontSize: 14, marginTop: 6, display: 'block' }}
            >
              Start en ny streak i dag →
            </button>
          )}
        </div>
        {!isNewUser && (
          <ProgressRing streak={streak} nextMilestone={nextMilestone} alive={alive} />
        )}
      </div>

      {/* Milepæl-piller */}
      {!isNewUser && (
        <div className="flex gap-1.5 flex-wrap">
          {MILESTONES.map((m, i) => {
            const reached = streak >= m
            const isNext = i === nextMilestoneIdx
            return (
              <div
                key={m}
                className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                style={{
                  background: reached ? '#e85c00' : 'transparent',
                  border: reached ? 'none' : isNext ? '1.5px solid #e85c00' : '1.5px solid #1f1f1f',
                  color: reached ? 'white' : isNext ? '#e85c00' : '#555',
                }}
              >
                {reached && '🔥'} {m}d
              </div>
            )
          })}
        </div>
      )}

      {/* Tabs */}
      {!isNewUser && (
        <>
          <div className="flex gap-4" style={{ borderBottom: '1px solid #1f1f1f' }}>
            {(['month', 'trend'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="pb-2 text-sm font-medium transition"
                style={{
                  color: tab === t ? '#e85c00' : '#555',
                  borderBottom: tab === t ? '2px solid #e85c00' : '2px solid transparent',
                  marginBottom: -1,
                }}
              >
                {t === 'month' ? 'Måned' : 'Trend'}
              </button>
            ))}
          </div>
          <div className="pt-1">
            {tab === 'month' ? <MonthCalendar dates={dates} /> : <TrendChart dates={dates} />}
          </div>
        </>
      )}
    </div>
  )
}
