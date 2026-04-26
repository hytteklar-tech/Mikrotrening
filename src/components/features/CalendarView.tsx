'use client'

import { useState, useEffect } from 'react'

type Props = {
  dayCounts: Record<string, number>
  selectedDate: string
  onSelectDate: (date: string) => void
  firstLogDate?: string
}

function toLocalDateStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const DAYS = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn']

const MONTHS = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

function getLast14Days(today: string): string[] {
  const days: string[] = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    days.push(toLocalDateStr(d))
  }
  return days
}

function WeekTrend({ dayCounts }: { dayCounts: Record<string, number> }) {
  const today = new Date()
  const dayOfWeek = (today.getDay() + 6) % 7

  // Datostrenger for mandag denne uka og forrige uke
  const thisMonday = new Date(today)
  thisMonday.setDate(today.getDate() - dayOfWeek)
  thisMonday.setHours(0, 0, 0, 0)

  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)

  const lastWeekEnd = new Date(lastMonday)
  lastWeekEnd.setDate(lastMonday.getDate() + dayOfWeek)
  lastWeekEnd.setHours(23, 59, 59, 999)

  // Summer antall økter (ikke unike dager) for perioden
  let thisWeek = 0
  let lastWeek = 0
  for (const [d, count] of Object.entries(dayCounts)) {
    const date = new Date(d + 'T00:00:00')
    if (date >= thisMonday && date <= today) thisWeek += count
    if (date >= lastMonday && date <= lastWeekEnd) lastWeek += count
  }

  if (thisWeek === 0) {
    return (
      <div className="py-4 space-y-1">
        <p style={{ fontSize: 48, fontWeight: 700, color: 'white' }}>—</p>
        <p style={{ fontSize: 14, color: '#9ca3af' }}>treninger denne uken (man–i dag)</p>
        {lastWeek > 0 && (
          <p style={{ fontSize: 14, color: '#6b7280' }}>{lastWeek} treninger forrige uke</p>
        )}
      </div>
    )
  }

  const up = thisWeek >= lastWeek
  const diff = lastWeek === 0 ? null : Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
  const pctText = diff === null ? '↑ ny uke' : `${up ? '↑' : '↓'} ${Math.abs(diff)}%`

  return (
    <div className="py-4 space-y-1">
      <p style={{ fontSize: 48, fontWeight: 700, color: 'white' }}>{pctText}</p>
      <p style={{ fontSize: 14, color: '#9ca3af' }}>{thisWeek} treninger denne uken (man–i dag)</p>
      <p style={{ fontSize: 14, color: '#6b7280' }}>{lastWeek} treninger forrige uke (man–{['man','tir','ons','tor','fre','lør','søn'][dayOfWeek]})</p>
    </div>
  )
}

export default function CalendarView({ dayCounts, selectedDate, onSelectDate, firstLogDate }: Props) {
  const today = toLocalDateStr(new Date())
  const [tab, setTab] = useState<'calendar' | 'trend'>('calendar')
  const [expanded, setExpanded] = useState(false)
  const [viewYear, setViewYear] = useState(() => parseInt(today.slice(0, 4)))
  const [viewMonth, setViewMonth] = useState(() => parseInt(today.slice(5, 7)) - 1)

  useEffect(() => {
    if (!selectedDate) return
    setViewYear(parseInt(selectedDate.slice(0, 4)))
    setViewMonth(parseInt(selectedDate.slice(5, 7)) - 1)
  }, [selectedDate])

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function getDayStyle(dateStr: string) {
    const count = dayCounts[dateStr] ?? 0
    const isToday = dateStr === today
    const isSelected = dateStr === selectedDate

    let base = 'relative w-full aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all cursor-pointer select-none '

    if (isSelected) base += 'ring-2 ring-orange-400 '

    if (count >= 2) {
      base += 'bg-orange-500 text-white font-bold hover:bg-orange-400'
    } else if (count === 1) {
      base += 'bg-green-500 text-white font-bold hover:bg-green-400'
    } else if (isToday) {
      base += 'bg-gray-700 text-white ring-1 ring-orange-500 hover:bg-gray-600'
    } else {
      base += 'bg-gray-800/50 text-gray-500 hover:bg-gray-700/60'
    }

    return base
  }

  function DayButton({ dateStr }: { dateStr: string }) {
    const count = dayCounts[dateStr] ?? 0
    return (
      <button
        onClick={() => (dateStr <= today || count > 0) && onSelectDate(dateStr)}
        disabled={dateStr > today && !(count > 0)}
        className={getDayStyle(dateStr)}
      >
        {parseInt(dateStr.slice(8))}
        {dateStr === today && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
        )}
        {count >= 2 && (
          <span className="absolute top-0.5 right-1 text-[9px] font-bold text-white">
            {count}
          </span>
        )}
      </button>
    )
  }

  const legend = (
    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 justify-center flex-wrap">
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-green-500 inline-block" /> 1 trening
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-orange-500 inline-block" /> 2+ treninger
      </span>
      {firstLogDate && (
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-gray-700 inline-block" /> Ikke trent
        </span>
      )}
    </div>
  )

  const dates = Object.keys(dayCounts)

  // Tab-rad
  const tabRow = (
    <div className="flex gap-4 mb-3" style={{ borderBottom: '1px solid #1f1f1f' }}>
      {(['calendar', 'trend'] as const).map(t => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className="pb-2 text-sm font-medium transition"
          style={{
            color: tab === t ? 'white' : '#6b7280',
            borderBottom: tab === t ? '2px solid #f97316' : '2px solid transparent',
            marginBottom: -1,
          }}
        >
          {t === 'calendar' ? 'Kalender' : 'Trend'}
        </button>
      ))}
    </div>
  )

  if (tab === 'trend') {
    return (
      <div className="bg-gray-900 rounded-2xl p-4">
        {tabRow}
        <WeekTrend dayCounts={dayCounts} />
      </div>
    )
  }

  // --- Komprimert: siste 14 dager ---
  if (!expanded) {
    const last14 = getLast14Days(today)
    const week1 = last14.slice(0, 7)
    const week2 = last14.slice(7, 14)

    return (
      <div className="bg-gray-900 rounded-2xl p-4">
        {tabRow}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs text-gray-500 py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {week1.map(d => <DayButton key={d} dateStr={d} />)}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-1">
          {week2.map(d => <DayButton key={d} dateStr={d} />)}
        </div>
        {legend}
        <button
          onClick={() => setExpanded(true)}
          className="w-full text-center text-xs text-white font-semibold hover:text-gray-200 mt-3 transition"
        >
          Vis hele måneden ↓
        </button>
      </div>
    )
  }

  // --- Utvidet: full måned ---
  const firstDay = new Date(viewYear, viewMonth, 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (string | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1
      return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    }),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="bg-gray-900 rounded-2xl p-4">
      {tabRow}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition">‹</button>
        <span className="text-white font-semibold">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition">›</button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs text-gray-500 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((dateStr, i) =>
          dateStr
            ? <DayButton key={dateStr} dateStr={dateStr} />
            : <div key={`empty-${i}`} />
        )}
      </div>
      {legend}
      <button
        onClick={() => setExpanded(false)}
        className="w-full text-center text-xs text-white font-semibold hover:text-gray-200 mt-3 transition"
      >
        Vis mindre ↑
      </button>
    </div>
  )
}
