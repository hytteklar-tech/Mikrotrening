'use client'

import { useState } from 'react'

const MILESTONES = [7, 14, 30, 50, 100]


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
      <text x={cx} y={cx + 12} textAnchor="middle" fill="#999" fontSize="8" fontFamily="sans-serif">
        av {nextMilestone}
      </text>
    </svg>
  )
}

function TwoWeekCalendar({ dates }: { dates: string[] }) {
  const today = new Date()
  today.setHours(12, 0, 0, 0)

  // Mandag denne uken
  const thisMonday = new Date(today)
  thisMonday.setDate(today.getDate() - ((today.getDay() + 6) % 7))

  // 14 dager: forrige mandag til søndag denne uken
  const days: Date[] = []
  for (let i = -7; i < 7; i++) {
    const d = new Date(thisMonday)
    d.setDate(thisMonday.getDate() + i)
    days.push(d)
  }

  const dateSet = new Set<string>()
  const countMap: Record<string, number> = {}
  for (const d of dates) {
    dateSet.add(d)
    countMap[d] = (countMap[d] || 0) + 1
  }

  const todayStr = today.toISOString().split('T')[0]

  return (
    <div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['M', 'T', 'O', 'T', 'F', 'L', 'S'].map((d, i) => (
          <div key={i} className="text-center" style={{ fontSize: 9, color: '#555' }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, i) => {
          const str = day.toISOString().split('T')[0]
          const count = countMap[str] || 0
          const isToday = str === todayStr
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
              {day.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekTrend({ dates }: { dates: string[] }) {
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const dayOfWeek = (today.getDay() + 6) % 7 // 0=man, 6=søn

  const thisMonday = new Date(today)
  thisMonday.setDate(today.getDate() - dayOfWeek)
  thisMonday.setHours(0, 0, 0, 0)

  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)

  // Tell treninger mandag–i dag denne uken
  const thisWeek = dates.filter(d => {
    const date = new Date(d + 'T12:00:00')
    return date >= thisMonday && date <= today
  }).length

  // Tell treninger forrige uke, samme antall dager (man–tilsvarende dag)
  const lastWeekEnd = new Date(lastMonday)
  lastWeekEnd.setDate(lastMonday.getDate() + dayOfWeek)
  lastWeekEnd.setHours(23, 59, 59, 999)
  const lastWeek = dates.filter(d => {
    const date = new Date(d + 'T12:00:00')
    return date >= lastMonday && date <= lastWeekEnd
  }).length

  if (thisWeek === 0) {
    return (
      <div className="py-2 space-y-1">
        <p style={{ fontSize: 32, fontWeight: 600, color: '#555' }}>—</p>
        <p style={{ fontSize: 14, color: '#ccc' }}>treninger denne uken</p>
        {lastWeek > 0 && (
          <p style={{ fontSize: 12, color: '#444' }}>{lastWeek} treninger forrige uke</p>
        )}
      </div>
    )
  }

  const diff = lastWeek === 0 ? 100 : Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
  const up = thisWeek >= lastWeek
  const pctText = lastWeek === 0 ? '—' : `${up ? '↑' : '↓'} ${Math.abs(diff)}%`

  return (
    <div className="py-2 space-y-1">
      <p style={{ fontSize: 32, fontWeight: 600, color: up ? '#33aa33' : '#aaa' }}>{pctText}</p>
      <p style={{ fontSize: 14, color: '#ccc' }}>{thisWeek} treninger denne uken</p>
      <p style={{ fontSize: 12, color: '#444' }}>{lastWeek} treninger forrige uke</p>
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
  const [tab, setTab] = useState<'trend'>('trend')

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
          <p style={{ fontSize: 14, color: '#999', marginTop: 4 }}>{totalSessions} dager totalt.</p>
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

    </div>
  )
}
