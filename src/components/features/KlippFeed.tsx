'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Reaction = { emoji: string; user_id: string }
type Clip = {
  id: string
  signedVideoUrl: string
  thumbnail_url: string | null
  scope: string
  created_at: string
  expires_at: string
  user_id: string
  users: { display_name: string | null } | null
  music_tracks: { id: string; title: string; artist: string; url: string; duration_seconds: number } | null
  exercises: { id: string; name: string } | null
  clip_reactions: Reaction[]
}

type Group = { id: string; name: string }

const EMOJIS = ['❤️', '🔥', '💪', '😂', '👏']

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'Akkurat nå'
  if (h < 24) return `${h}t siden`
  const d = Math.floor(h / 24)
  return `${d}d siden`
}

function KlippKort({ clip, currentUserId }: { clip: Clip; currentUserId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [reactions, setReactions] = useState<Reaction[]>(clip.clip_reactions)
  const [myEmoji, setMyEmoji] = useState<string | null>(
    clip.clip_reactions.find(r => r.user_id === currentUserId)?.emoji ?? null
  )
  const [showEmojis, setShowEmojis] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [reported, setReported] = useState(false)
  const [playing, setPlaying] = useState(false)

  // IntersectionObserver — spill av kun når synlig
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {})
          audioRef.current?.play().catch(() => {})
          setPlaying(true)
        } else {
          videoRef.current?.pause()
          audioRef.current?.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.7 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  async function react(emoji: string) {
    const removing = myEmoji === emoji
    setShowEmojis(false)

    if (removing) {
      setMyEmoji(null)
      setReactions(prev => prev.filter(r => r.user_id !== currentUserId))
      await fetch('/api/clips/react', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clipId: clip.id }),
      })
    } else {
      setMyEmoji(emoji)
      setReactions(prev => [
        ...prev.filter(r => r.user_id !== currentUserId),
        { emoji, user_id: currentUserId },
      ])
      await fetch('/api/clips/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clipId: clip.id, emoji }),
      })
    }
  }

  async function report(reason: string) {
    setShowReport(false)
    setReported(true)
    await fetch('/api/clips/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clipId: clip.id, reason }),
    })
  }

  async function addExercise() {
    if (!clip.exercises) return
    router.push(`/workouts?ids=${clip.exercises.id}`)
  }

  // Tell reaksjoner per emoji
  const reactionCounts = reactions.reduce<Record<string, number>>((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] ?? 0) + 1
    return acc
  }, {})

  return (
    <div ref={cardRef} className="relative bg-black rounded-2xl overflow-hidden" style={{ aspectRatio: '9/16', maxHeight: '70vh' }}>
      <video
        ref={videoRef}
        src={clip.signedVideoUrl}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        poster={clip.thumbnail_url ?? undefined}
      />

      {clip.music_tracks && (
        <audio ref={audioRef} src={clip.music_tracks.url} loop />
      )}

      {/* Bruker + info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-semibold text-sm">{clip.users?.display_name ?? 'Bruker'}</p>
        {clip.music_tracks && (
          <p className="text-gray-300 text-xs mt-0.5">🎵 {clip.music_tracks.title} — {clip.music_tracks.artist}</p>
        )}
        {clip.exercises && (
          <button
            onClick={addExercise}
            className="mt-1.5 bg-orange-500/90 text-white text-xs px-3 py-1 rounded-full font-medium"
          >
            + Legg til {clip.exercises.name}
          </button>
        )}
        <p className="text-gray-400 text-xs mt-1">{timeAgo(clip.created_at)}</p>
      </div>

      {/* Høyre-side: reaksjoner + rapport */}
      <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4">
        {/* Reaksjoner */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setShowEmojis(v => !v)}
            className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-xl"
          >
            {myEmoji ?? '❤️'}
          </button>
          <span className="text-white text-xs font-medium">{reactions.length}</span>
        </div>

        {/* Rapport */}
        {clip.user_id !== currentUserId && (
          <button
            onClick={() => setShowReport(true)}
            className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
            aria-label="Rapporter"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </button>
        )}
      </div>

      {/* Emoji-velger */}
      {showEmojis && (
        <div className="absolute right-14 bottom-28 flex gap-2 bg-black/80 rounded-2xl p-2">
          {EMOJIS.map(e => (
            <button
              key={e}
              onClick={() => react(e)}
              className={`text-2xl transition-transform ${myEmoji === e ? 'scale-125' : ''}`}
            >
              {e}
            </button>
          ))}
        </div>
      )}

      {/* Reaksjons-sammendrag */}
      {Object.entries(reactionCounts).length > 0 && (
        <div className="absolute left-3 bottom-20 flex gap-1 flex-wrap max-w-[60%]">
          {Object.entries(reactionCounts).map(([emoji, count]) => (
            <span key={emoji} className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
              {emoji} {count}
            </span>
          ))}
        </div>
      )}

      {/* Rapporter-modal */}
      {showReport && (
        <div className="absolute inset-0 bg-black/70 flex items-end z-10" onClick={() => setShowReport(false)}>
          <div className="w-full bg-gray-900 rounded-t-3xl p-5 space-y-3" onClick={e => e.stopPropagation()}>
            <p className="text-white font-bold text-center">Rapporter klipp</p>
            {['Upassende innhold', 'Spam', 'Annet'].map(reason => (
              <button
                key={reason}
                onClick={() => report(reason)}
                className="w-full bg-gray-800 text-white rounded-xl py-3 text-sm"
              >{reason}</button>
            ))}
            <button onClick={() => setShowReport(false)} className="w-full text-gray-400 py-2 text-sm">Avbryt</button>
          </div>
        </div>
      )}

      {reported && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <p className="text-white font-semibold bg-gray-900 px-4 py-2 rounded-xl">Takk — vi ser på det 👍</p>
        </div>
      )}
    </div>
  )
}

export default function KlippFeed({
  globalClips,
  groupClips,
  groups,
  currentUserId,
}: {
  globalClips: (Clip & { signedVideoUrl: string })[]
  groupClips: (Clip & { signedVideoUrl: string })[]
  groups: Group[]
  currentUserId: string
}) {
  const [tab, setTab] = useState<'global' | 'gruppe'>('global')

  // Sorter global etter antall reaksjoner, ta top 10
  const sortedGlobal = [...globalClips]
    .sort((a, b) => b.clip_reactions.length - a.clip_reactions.length)
    .slice(0, 10)

  const clips = tab === 'global' ? sortedGlobal : groupClips

  // Marker feed som besøkt
  useEffect(() => {
    localStorage.setItem('lastFeedVisit', new Date().toISOString())
  }, [])

  return (
    <div className="flex flex-col h-full relative">
      {/* Fane-header */}
      <div className="flex items-center border-b border-gray-800 px-4 pt-4 pb-0 shrink-0">
        <div className="flex gap-4 flex-1">
          <button
            onClick={() => setTab('global')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${tab === 'global' ? 'border-orange-500 text-white' : 'border-transparent text-gray-500'}`}
          >
            Global
          </button>
          <button
            onClick={() => setTab('gruppe')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${tab === 'gruppe' ? 'border-orange-500 text-white' : 'border-transparent text-gray-500'}`}
          >
            Mine grupper
          </button>
        </div>
        <Link
          href="/klipp/ny"
          className="mb-2 flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-3 py-1.5 rounded-xl transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" />
          </svg>
          Del klipp
        </Link>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {clips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-5xl mb-4">🎬</p>
            <p className="text-white font-bold text-lg">Ingen klipp ennå</p>
            <p className="text-gray-400 text-sm mt-1 mb-6">Vær den første til å dele!</p>
            <Link
              href="/klipp/ny"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-base transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
              Ta opp video
            </Link>
          </div>
        ) : (
          clips.map(clip => (
            <KlippKort key={clip.id} clip={clip} currentUserId={currentUserId} />
          ))
        )}
      </div>

      {/* Flytende kamera-knapp */}
      <Link
        href="/klipp/ny"
        className="absolute bottom-6 right-4 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded-2xl shadow-lg transition"
        style={{ zIndex: 20 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
        Ta opp video
      </Link>
    </div>
  )
}
