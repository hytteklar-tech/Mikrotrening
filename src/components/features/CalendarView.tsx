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

export default function CalendarView({ dayCounts, selectedDate, onSelectDate, firstLogDate }: Props) {
  const today = toLocalDateStr(new Date())
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
    const isPast = dateStr < today
    const isToday = dateStr === today
    const isSelected = dateStr === selectedDate

    let base = 'relative w-full aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all cursor-pointer select-none '

    if (isSelected) base += 'ring-2 ring-orange-400 '

    if (count >= 2) {
      base += 'bg-orange-500 text-white hover:bg-orange-400'
    } else if (count === 1) {
      base += 'bg-green-400/30 text-green-400 hover:bg-green-400/40'
    } else if (isToday) {
      base += 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
    } else if (isPast && firstLogDate && dateStr >= firstLogDate) {
      base += 'bg-red-900/40 text-red-400 hover:bg-red-900/60'
    } else {
      base += 'bg-gray-800/50 text-gray-500 hover:bg-gray-700/60'
    }

    return base
  }

  function DayButton({ dateStr }: { dateStr: string }) {
    return (
      <button
        onClick={() => (dateStr <= today || (dayCounts[dateStr] ?? 0) > 0) && onSelectDate(dateStr)}
        disabled={dateStr > today && !(dayCounts[dateStr] > 0)}
        className={getDayStyle(dateStr)}
      >
        {parseInt(dateStr.slice(8))}
        {dateStr === today && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
        )}
        {(dayCounts[dateStr] ?? 0) >= 2 && (
          <span className="absolute top-0.5 right-1 text-[9px] font-bold text-white">
            {dayCounts[dateStr]}
          </span>
        )}
      </button>
    )
  }

  const legend = (
    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 justify-center flex-wrap">
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-green-400/30 inline-block border border-green-400/50" /> 1 trening
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-orange-500 inline-block" /> 2+ treninger
      </span>
      {firstLogDate && (
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-900/40 inline-block" /> Ikke trent
        </span>
      )}
    </div>
  )

  // --- Komprimert: siste 14 dager ---
  if (!expanded) {
    const last14 = getLast14Days(today)
    const week1 = last14.slice(0, 7)
    const week2 = last14.slice(7, 14)

    return (
      <div className="bg-gray-900 rounded-2xl p-4">
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
          className="w-full text-center text-xs text-gray-500 hover:text-gray-300 mt-3 transition"
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
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition">‹</button>
        <span className="text-white font-semibold">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition">›</button>
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
        className="w-full text-center text-xs text-gray-500 hover:text-gray-300 mt-3 transition"
      >
        Vis mindre ↑
      </button>
    </div>
  )
}
