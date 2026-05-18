'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type MusicTrack = { id: string; title: string; artist: string; url: string; duration_seconds: number }
type Group = { id: string; name: string }
type Exercise = { id: string; name: string }

function formatDuration(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}

export default function KlippOpplasting({
  userId,
  musicTracks,
  groups,
  exercises,
}: {
  userId: string
  musicTracks: MusicTrack[]
  groups: Group[]
  exercises: Exercise[]
}) {
  const router = useRouter()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [scope, setScope] = useState<'global' | 'group'>('global')
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [step, setStep] = useState<'video' | 'detaljer'>('video')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null)
  const [playingMusicId, setPlayingMusicId] = useState<string | null>(null)

  function handleVideoValgt(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 52428800) {
      setError('Videoen er for stor (maks 50 MB). Prøv en kortere video.')
      return
    }
    setVideoFile(file)
    setVideoPreview(URL.createObjectURL(file))
    setStep('detaljer')
    setError(null)
  }

  function toggleGroup(id: string) {
    setSelectedGroups(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  function togglePreviewMusic(track: MusicTrack) {
    if (playingMusicId === track.id) {
      previewAudio?.pause()
      setPlayingMusicId(null)
      setPreviewAudio(null)
    } else {
      previewAudio?.pause()
      const audio = new Audio(track.url)
      audio.play().catch(() => {})
      setPreviewAudio(audio)
      setPlayingMusicId(track.id)
    }
  }

  async function lastOpp() {
    if (!videoFile) return
    if (scope === 'group' && selectedGroups.length === 0) {
      setError('Velg minst én gruppe å dele med.')
      return
    }
    setUploading(true)
    setError(null)
    previewAudio?.pause()

    try {
      const clipId = crypto.randomUUID()
      const ext = videoFile.name.split('.').pop() ?? 'mp4'
      const path = `${userId}/${clipId}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('clips')
        .upload(path, videoFile, { contentType: videoFile.type })

      if (uploadError) throw new Error(uploadError.message)

      const { data: clip, error: insertError } = await supabase
        .from('clips')
        .insert({
          id: clipId,
          user_id: userId,
          video_url: path,
          music_id: selectedMusic?.id ?? null,
          exercise_id: selectedExercise?.id ?? null,
          scope,
        })
        .select()
        .single()

      if (insertError || !clip) throw new Error(insertError?.message ?? 'Feil ved lagring')

      if (scope === 'group' && selectedGroups.length > 0) {
        await supabase.from('clip_groups').insert(
          selectedGroups.map(gid => ({ clip_id: clipId, group_id: gid }))
        )
      }

      router.push('/feed')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt')
    } finally {
      setUploading(false)
    }
  }

  if (step === 'video') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <p className="text-4xl mb-4">🎬</p>
        <h1 className="text-2xl font-bold text-white mb-2">Nytt klipp</h1>
        <p className="text-gray-400 text-sm mb-8">Ta opp eller velg en video (maks 30 sek)</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          capture="user"
          onChange={handleVideoValgt}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-xs bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl py-4 text-lg mb-3 transition"
        >
          📷 Åpne kamera
        </button>

        <input
          type="file"
          accept="video/*"
          onChange={handleVideoValgt}
          className="hidden"
          id="gallery-input"
        />
        <label
          htmlFor="gallery-input"
          className="w-full max-w-xs bg-gray-800 text-white font-semibold rounded-2xl py-4 text-lg text-center cursor-pointer block transition hover:bg-gray-700"
        >
          🖼 Velg fra galleri
        </label>

        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

        <button onClick={() => router.back()} className="text-gray-500 text-sm mt-6">Avbryt</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800 shrink-0">
        <button onClick={() => { setStep('video'); setVideoFile(null); setVideoPreview(null) }} className="text-gray-400">
          ‹ Tilbake
        </button>
        <h1 className="text-white font-bold">Del klipp</h1>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-8">
        {/* Forhåndsvisning */}
        {videoPreview && (
          <div className="relative rounded-2xl overflow-hidden bg-black mx-auto" style={{ maxWidth: 200, aspectRatio: '9/16' }}>
            <video src={videoPreview} className="w-full h-full object-cover" muted loop autoPlay playsInline />
          </div>
        )}

        {/* Musikk */}
        <div>
          <p className="text-white font-semibold mb-2">🎵 Musikk</p>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedMusic(null)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${!selectedMusic ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              <span>🔇</span>
              <span>Ingen musikk</span>
            </button>
            {musicTracks.map(track => (
              <div
                key={track.id}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition cursor-pointer ${selectedMusic?.id === track.id ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => setSelectedMusic(track)}
              >
                <button
                  onClick={e => { e.stopPropagation(); togglePreviewMusic(track) }}
                  className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center shrink-0"
                >
                  {playingMusicId === track.id ? '⏸' : '▶️'}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{track.title}</p>
                  <p className="text-xs opacity-75">{track.artist} · {formatDuration(track.duration_seconds)}</p>
                </div>
                {selectedMusic?.id === track.id && <span>✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Øvelse */}
        {exercises.length > 0 && (
          <div>
            <p className="text-white font-semibold mb-2">💪 Tagg en øvelse (valgfritt)</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedExercise(null)}
                className={`px-3 py-1.5 rounded-full text-sm transition ${!selectedExercise ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                Ingen
              </button>
              {exercises.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExercise(ex)}
                  className={`px-3 py-1.5 rounded-full text-sm transition ${selectedExercise?.id === ex.id ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  {ex.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hvem ser dette? */}
        <div>
          <p className="text-white font-semibold mb-2">👁 Hvem kan se dette?</p>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setScope('global')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${scope === 'global' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'}`}
            >
              🌍 Alle
            </button>
            <button
              onClick={() => setScope('group')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${scope === 'group' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'}`}
            >
              👥 Gruppe
            </button>
          </div>

          {scope === 'group' && groups.length > 0 && (
            <div className="space-y-2">
              {groups.map(g => (
                <button
                  key={g.id}
                  onClick={() => toggleGroup(g.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${selectedGroups.includes(g.id) ? 'bg-orange-500/20 border border-orange-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${selectedGroups.includes(g.id) ? 'bg-orange-500 border-orange-500' : 'border-gray-500'}`}>
                    {selectedGroups.includes(g.id) && <span className="text-white text-xs">✓</span>}
                  </span>
                  {g.name}
                </button>
              ))}
            </div>
          )}

          {scope === 'group' && groups.length === 0 && (
            <p className="text-gray-500 text-sm">Du er ikke med i noen grupper ennå.</p>
          )}
        </div>

        {/* Samtykke-tekst */}
        <p className="text-gray-500 text-xs text-center">
          Ved deling godtar du at {scope === 'global' ? 'alle brukere' : 'valgte grupper'} kan se videoen din i 7 dager.
        </p>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Del-knapp */}
        <button
          onClick={lastOpp}
          disabled={uploading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-2xl py-4 text-lg transition"
        >
          {uploading ? 'Laster opp...' : '🚀 Del klipp'}
        </button>
      </div>
    </div>
  )
}
