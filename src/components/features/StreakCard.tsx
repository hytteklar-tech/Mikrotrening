'use client'

import { useState } from 'react'

function InfoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  )
}

const STREAK_BADGES = [
  { days: 7,   emoji: '🥉', name: 'Gnisten' },
  { days: 30,  emoji: '🥈', name: 'Vanebygger' },
  { days: 90,  emoji: '🥇', name: 'Maskinen' },
  { days: 180, emoji: '💎', name: 'Ustoppelig' },
  { days: 270, emoji: '🔥', name: 'Jernvilje' },
  { days: 365, emoji: '👑', name: 'Legenden' },
]

const VOLUME_BADGES = [
  { sessions: 10,   emoji: '⭐',    name: 'Første steg' },
  { sessions: 50,   emoji: '⭐⭐',  name: 'På gang' },
  { sessions: 100,  emoji: '⭐⭐⭐', name: 'Hundringen' },
  { sessions: 250,  emoji: '🏆',   name: 'Kvart tusen' },
  { sessions: 500,  emoji: '🏆🏆', name: 'Halvveis til tusen' },
  { sessions: 1000, emoji: '💪',   name: 'Tusenkunstner' },
]

export default function StreakCard({ streak, hasTrained, totalSessions }: {
  streak: number
  hasTrained: boolean
  totalSessions: number
}) {
  const [showInfo, setShowInfo] = useState(false)
  const [showStreakInfo, setShowStreakInfo] = useState(false)
  const [showVolumeInfo, setShowVolumeInfo] = useState(false)

  const earnedStreakBadge = [...STREAK_BADGES].reverse().find(b => streak >= b.days)
  const nextStreakBadge = STREAK_BADGES.find(b => b.days > streak)

  const earnedVolumeBadge = [...VOLUME_BADGES].reverse().find(b => totalSessions >= b.sessions)
  const nextVolumeBadge = VOLUME_BADGES.find(b => b.sessions > totalSessions)

  return (
    <div className={`rounded-2xl p-5 ${hasTrained ? 'bg-orange-500' : 'bg-gray-800'}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm opacity-75">{hasTrained ? 'Trent i dag! 🎉' : 'Streak'}</p>
            <button
              onClick={() => setShowInfo(v => !v)}
              className="opacity-60 hover:opacity-100 transition"
              aria-label="Hva er streak?"
            >
              <InfoIcon />
            </button>
          </div>
          <div className="flex items-end gap-1 mt-1">
            <span className="text-5xl font-bold">{streak}</span>
            <span className="text-lg mb-1 opacity-75">dager på rad</span>
          </div>
        </div>
        <span className="text-6xl">🔥</span>
      </div>

      {showInfo && (
        <div className="mt-3 bg-black/20 rounded-xl px-3 py-2 text-sm">
          Streak teller antall dager på rad du har trent. Hopper du over én dag nullstilles den. Tren i dag eller i går for å holde den i live.
        </div>
      )}

      {!showInfo && (
        <div className="mt-3 bg-black/20 rounded-xl px-3 py-2 text-sm space-y-2">
          {/* Streak badge */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <p className="opacity-60 text-xs uppercase tracking-wide">Streak-badge</p>
              <button
                onClick={() => setShowStreakInfo(v => !v)}
                className="opacity-50 hover:opacity-100 transition"
                aria-label="Hva er streak-badges?"
              >
                <InfoIcon />
              </button>
            </div>
            {showStreakInfo ? (
              <div className="space-y-0.5">
                {STREAK_BADGES.map(b => (
                  <div key={b.days} className={`flex items-center justify-between text-xs ${streak >= b.days ? 'opacity-100' : 'opacity-40'}`}>
                    <span>{b.emoji} {b.name}</span>
                    <span>{b.days} dager på rad {streak >= b.days ? '✓' : ''}</span>
                  </div>
                ))}
              </div>
            ) : nextStreakBadge ? (
              <p>{nextStreakBadge.days - streak} dager til {nextStreakBadge.emoji} {nextStreakBadge.name}
                {earnedStreakBadge && <span className="ml-2 opacity-60">· har: {earnedStreakBadge.emoji} {earnedStreakBadge.name}</span>}
              </p>
            ) : (
              <p>👑 Legenden — du har nådd toppen!</p>
            )}
          </div>

          {/* Volume badge */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <p className="opacity-60 text-xs uppercase tracking-wide">Volum-badge</p>
              <button
                onClick={() => setShowVolumeInfo(v => !v)}
                className="opacity-50 hover:opacity-100 transition"
                aria-label="Hva er volum-badges?"
              >
                <InfoIcon />
              </button>
            </div>
            {showVolumeInfo ? (
              <div className="space-y-0.5">
                {VOLUME_BADGES.map(b => (
                  <div key={b.sessions} className={`flex items-center justify-between text-xs ${totalSessions >= b.sessions ? 'opacity-100' : 'opacity-40'}`}>
                    <span>{b.emoji} {b.name}</span>
                    <span>{b.sessions} økter {totalSessions >= b.sessions ? '✓' : ''}</span>
                  </div>
                ))}
              </div>
            ) : nextVolumeBadge ? (
              <p>{nextVolumeBadge.sessions - totalSessions} økter til {nextVolumeBadge.emoji} {nextVolumeBadge.name}
                {earnedVolumeBadge && <span className="ml-2 opacity-60">· har: {earnedVolumeBadge.emoji} {earnedVolumeBadge.name}</span>}
              </p>
            ) : (
              <p>💪 Tusenkunstner — du har nådd toppen!</p>
            )}
            {!showVolumeInfo && <p className="opacity-50 text-xs mt-0.5">{totalSessions} økter totalt</p>}
          </div>
        </div>
      )}
    </div>
  )
}
