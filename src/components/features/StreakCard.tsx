'use client'

import { useState } from 'react'
import Link from 'next/link'

const MILESTONES = [7, 14, 30, 50, 100]


const MILESTONES_LIST = [0, ...MILESTONES]

function ProgressRing({ streak, alive }: { streak: number; alive: boolean }) {
  const r = 42
  const cx = 52
  const size = 104
  const circumference = 2 * Math.PI * r

  const prevMilestone = [...MILESTONES_LIST].reverse().find(m => streak >= m) ?? 0
  const nextMilestone = MILESTONES.find(m => m > streak) ?? MILESTONES[MILESTONES.length - 1]
  const passedAny = streak >= MILESTONES[0]

  const progress = alive
    ? Math.min((streak - prevMilestone) / (nextMilestone - prevMilestone), 1)
    : 0
  const orangeProgress = alive && !passedAny ? progress : (alive ? 1 : 0)
  const whiteProgress = alive && passedAny ? progress : 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#1f1f1f" strokeWidth="6" />
      {alive && orangeProgress > 0 && (
        <circle
          cx={cx} cy={cx} r={r}
          fill="none" stroke="#f97316" strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - orangeProgress)}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      )}
      {alive && whiteProgress > 0 && (
        <circle
          cx={cx} cy={cx} r={r}
          fill="none" stroke="white" strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - whiteProgress)}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      )}
      <text x={cx} y={cx + 7} textAnchor="middle" fill={alive ? 'white' : '#6b7280'} fontSize="26" fontWeight="700" fontFamily="sans-serif">
        {streak}
      </text>
      <text x={cx} y={cx + 22} textAnchor="middle" fill="#9ca3af" fontSize="12" fontFamily="sans-serif">
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
          <div key={i} className="text-center" style={{ fontSize: 9, color: '#6b7280' }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, i) => {
          const str = day.toISOString().split('T')[0]
          const count = countMap[str] || 0
          const isToday = str === todayStr
          const bg = count >= 2 ? '#f97316' : count === 1 ? '#3a1f00' : '#1a1a1a'
          return (
            <div
              key={i}
              className="aspect-square flex items-center justify-center rounded"
              style={{
                background: bg,
                border: isToday ? '1.5px solid #f97316' : '1.5px solid transparent',
                color: count > 0 ? 'white' : '#6b7280',
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
        <p style={{ fontSize: 32, fontWeight: 600, color: '#6b7280' }}>—</p>
        <p style={{ fontSize: 14, color: '#9ca3af' }}>treninger denne uken</p>
        {lastWeek > 0 && (
          <p style={{ fontSize: 12, color: '#6b7280' }}>{lastWeek} treninger forrige uke</p>
        )}
      </div>
    )
  }

  const diff = lastWeek === 0 ? 100 : Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
  const up = thisWeek >= lastWeek
  const pctText = lastWeek === 0 ? '—' : `${up ? '↑' : '↓'} ${Math.abs(diff)}%`

  return (
    <div className="py-2 space-y-1">
      <p style={{ fontSize: 32, fontWeight: 600, color: up ? '#22c55e' : '#9ca3af' }}>{pctText}</p>
      <p style={{ fontSize: 14, color: '#9ca3af' }}>{thisWeek} treninger denne uken</p>
      <p style={{ fontSize: 12, color: '#6b7280' }}>{lastWeek} treninger forrige uke</p>
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
    <div className="rounded-2xl p-4 space-y-3 bg-gray-900">
      {/* Header: tekst venstre, ring høyre */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, color: 'white' }}>
            Du har trent{' '}
            <span style={{ color: alive ? '#f97316' : '#6b7280', verticalAlign: 'baseline' }}>{streak}</span>
            {' '}dager på rad.
          </p>
          <p style={{ fontSize: 16, color: '#9ca3af', marginTop: 4 }}>{totalSessions} dager totalt i år.</p>
          {!alive && !isNewUser && (
            <button
              onClick={onScrollToToday}
              style={{ color: '#f97316', fontSize: 14, marginTop: 6, display: 'block' }}
            >
              Start en ny streak i dag →
            </button>
          )}
        </div>
        {!isNewUser && (
          <ProgressRing streak={streak} alive={alive} />
        )}
      </div>

      {/* Milepæl-piller + stats-lenke */}
      {!isNewUser && (
        <>
          <div className="flex gap-1.5 flex-wrap">
            {MILESTONES.map((m, i) => {
              const reached = streak >= m
              const isNext = i === nextMilestoneIdx
              return (
                <div
                  key={m}
                  className="flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                  style={{
                    background: reached ? '#f97316' : 'transparent',
                    border: reached ? 'none' : isNext ? '1.5px solid #f97316' : '1.5px solid #374151',
                    color: reached ? 'white' : isNext ? '#f97316' : '#9ca3af',
                  }}
                >
                  {reached && '🔥'} {m}d
                </div>
              )
            })}
          </div>
          <div className="flex justify-end">
            <Link href="/statistikk" style={{ fontSize: 12, color: '#9ca3af' }} className="hover:text-gray-300 transition-colors">
              Se statistikk →
            </Link>
          </div>
        </>
      )}

    </div>
  )
}
