'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
      <div className="flex bg-muted rounded-xl p-1 gap-1">
        <Button
          onClick={() => setTab('month')}
          variant={tab === 'month' ? 'default' : 'ghost'}
          className="flex-1"
        >
          Denne måneden
        </Button>
        <Button
          onClick={() => setTab('total')}
          variant={tab === 'total' ? 'default' : 'ghost'}
          className="flex-1"
        >
          Totalt
        </Button>
      </div>

      {tab === 'month' && (
        <p className="text-muted-foreground text-sm text-center">Dager trent i {monthName} — alle starter likt 🗓️</p>
      )}
      {tab === 'total' && (
        <p className="text-muted-foreground text-sm text-center">Dager trent / dager siden første økt = konsistens %</p>
      )}

      <div className="space-y-2">
        {sorted.map((entry, i) => (
          <Card
            key={entry.userId}
            size="sm"
            className={entry.isMe ? 'bg-primary text-primary-foreground ring-0' : ''}
          >
            <div className="flex items-center gap-3 px-(--card-spacing)">
              <span className="text-4xl w-10 text-center">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">{entry.name}</span>
                  {entry.activeToday && (
                    <Badge className="bg-green-500/20 text-green-400 border-transparent shrink-0">Aktiv i dag</Badge>
                  )}
                </div>
                <p className={`text-xs mt-0.5 ${entry.isMe ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  🔥 {entry.streak} streak · 📅 {entry.totalDays} dager totalt
                </p>
              </div>
              <div className="text-right shrink-0">
                {tab === 'month' ? (
                  <span className="font-bold text-lg">{entry.monthDays}d</span>
                ) : (
                  <>
                    <span className="font-bold text-lg">{entry.consistencyPct}%</span>
                    <p className={`text-xs ${entry.isMe ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{entry.totalDays} dager</p>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
