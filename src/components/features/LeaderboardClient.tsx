'use client'

import { useState } from 'react'

export type LeaderboardEntry = {
  userId: string
  name: string
  streak: number
  totalDays: number
  monthDays: number
  consistencyPct: number
  activeToday: boolean
  isMe: boolean
}

const MONTH_NAMES = ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des']

export default function LeaderboardClient({ board, monthName }: { board: LeaderboardEntry[], monthName: string }) {
  const [tab, setTab] = useState<'month' | 'total'>('month')

  const sorted = tab === 'month'
    ? [...board].sort((a, b) => b.monthDays - a.monthDays || b.totalDays - a.totalDays)
    : [...board].sort((a, b) => b.consistencyPct - a.consistencyPct || b.totalDays - a.totalDays)

  return (
    <div className="space-y-4">
      <div className="flex bg-gray-800 rounded-xl p-1 gap-1">
        <button
          onClick={() => setTab('month')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${tab === 'month' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Denne måneden
        </button>
        <button
          onClick={() => setTab('total')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${tab === 'total' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Totalt
        </button>
      </div>

      {tab === 'month' && (
        <p className="text-gray-400 text-sm text-center">Dager trent i {monthName} — alle starter likt 🗓️</p>
      )}
      {tab === 'total' && (
        <p className="text-gray-400 text-sm text-center">Dager trent / dager siden første økt = konsistens %</p>
      )}

      <div className="space-y-2">
        {sorted.map((entry, i) => (
          <div
            key={entry.userId}
            className={`rounded-2xl p-4 flex items-center gap-3 ${entry.isMe ? 'bg-orange-500' : 'bg-gray-800'}`}
          >
            <span className="text-4xl w-10 text-center">
              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold truncate">{entry.name}</span>
                {entry.activeToday && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full shrink-0">Aktiv i dag</span>
                )}
              </div>
              <p className={`text-xs mt-0.5 ${entry.isMe ? 'text-orange-100' : 'text-gray-400'}`}>
                🔥 {entry.streak} streak · 📅 {entry.totalDays} dager totalt
              </p>
            </div>
            <div className="text-right shrink-0">
              {tab === 'month' ? (
                <span className="font-bold text-lg">{entry.monthDays}d</span>
              ) : (
                <>
                  <span className="font-bold text-lg">{entry.consistencyPct}%</span>
                  <p className={`text-xs ${entry.isMe ? 'text-orange-100' : 'text-gray-400'}`}>{entry.totalDays} dager</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
