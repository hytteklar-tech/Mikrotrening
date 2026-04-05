'use client'

import { useState } from 'react'

type Props = {
  dayCounts: Record<string, number>
  selectedDate: string
  onSelectDate: (date: string) => void
}

function toLocalDateStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const DAYS = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn']

const MONTHS = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

export default function CalendarView({ dayCounts, selectedDate, onSelectDate }: Props) {
  const today = toLocalDateStr(new Date())
  const [viewYear, setViewYear] = useState(() => parseInt(selectedDate.slice(0, 4)))
  const [viewMonth, setViewMonth] = useState(() => parseInt(selectedDate.slice(5, 7)) - 1)

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

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

  function getDayStyle(dateStr: string) {
    const count = dayCounts[dateStr] ?? 0
    const isPast = dateStr < today
    const isToday = dateStr === today
    const isFuture = dateStr > today
    const isSelected = dateStr === selectedDate

    let base = 'relative w-full aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all cursor-pointer select-none '

    if (isSelected) {
      base += 'ring-2 ring-orange-400 '
    }

    if (count >= 2) {
      base += 'bg-blue-700/70 text-blue-200 hover:bg-blue-600/80'
    } else if (count === 1) {
      base += 'bg-green-900/60 text-green-300 hover:bg-green-800/70'
    } else if (isToday) {
      base += 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
    } else if (isPast) {
      base += 'bg-red-900/40 text-red-400 hover:bg-red-900/60'
    } else {
      base += 'bg-gray-800/50 text-gray-500 hover:bg-gray-700/60'
    }

    return base
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          ‹
        </button>
        <span className="text-white font-semibold">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          ›
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs text-gray-500 py-1">{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((dateStr, i) =>
          dateStr ? (
            <button
              key={dateStr}
              onClick={() => (dateStr <= today || (dayCounts[dateStr] ?? 0) > 0) && onSelectDate(dateStr)}
              disabled={dateStr > today && !(dayCounts[dateStr] > 0)}
              className={getDayStyle(dateStr)}
            >
              {parseInt(dateStr.slice(8))}
              {dateStr === today && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
              )}
              {(dayCounts[dateStr] ?? 0) >= 2 && (
                <span className="absolute top-0.5 right-1 text-[9px] font-bold text-blue-200">
                  {dayCounts[dateStr]}
                </span>
              )}
            </button>
          ) : (
            <div key={`empty-${i}`} />
          )
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 justify-center flex-wrap">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-green-900/60 inline-block" /> 1 trening
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-700/70 inline-block" /> 2+ treninger
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-900/40 inline-block" /> Ikke trent
        </span>
      </div>
    </div>
  )
}
