'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type UserExercise = { id: string; name: string }

type Props = {
  clip: { video_url: string }
  onClose: () => void
  onSaved: () => void
}

export default function OvelsesDemoModal({ clip, onClose, onSaved }: Props) {
  const supabase = createClient()
  const router = useRouter()
  const [exercises, setExercises] = useState<UserExercise[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [nyNavn, setNyNavn] = useState('')
  const [visNy, setVisNy] = useState(false)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase
        .from('user_exercises')
        .select('id, name')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => setExercises((data ?? []) as UserExercise[]))
    })
  }, [])

  async function lagre() {
    const navn = visNy ? nyNavn.trim() : exercises.find(e => e.id === selectedId)?.name ?? ''
    if (!navn) return
    setSaving(true)

    // Lag ny øvelse i user_exercises hvis det er ny
    let userExerciseId = visNy ? null : selectedId
    if (visNy && nyNavn.trim()) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('user_exercises')
          .insert({ user_id: user.id, name: nyNavn.trim(), unit: 'reps', suggested_value: 10 })
          .select('id')
          .single()
        userExerciseId = data?.id ?? null
      }
    }

    await fetch('/api/exercise-videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        exerciseName: navn,
        userExerciseId,
        videoUrl: clip.video_url,
      }),
    })

    setSaving(false)
    setDone(true)
  }

  const kanLagre = visNy ? nyNavn.trim().length > 0 : selectedId !== null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60" onClick={onClose}>
      <div className="bg-gray-900 rounded-t-3xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h2 className="text-white font-bold">Lagre som øvelsesdemo</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">✕</button>
        </div>

        {done ? (
          <div className="p-6 space-y-3 pb-8 text-center">
            <p className="text-3xl mb-1">✅</p>
            <p className="text-white font-bold">Lagret som øvelsesdemo!</p>
            <button
              onClick={() => router.push('/test-exercises?tab=pakker')}
              className="w-full bg-orange-500 text-white rounded-xl py-3 text-sm font-semibold"
            >
              Gå til Mine øvelser →
            </button>
            <button
              onClick={onSaved}
              className="w-full bg-gray-800 text-gray-300 rounded-xl py-3 text-sm"
            >
              Tilbake til feed
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3 pb-8">
            {/* Eksisterende øvelser */}
            {exercises.length > 0 && !visNy && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {exercises.map(ex => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedId(ex.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition ${
                      selectedId === ex.id
                        ? 'bg-orange-500 text-white font-semibold'
                        : 'bg-gray-800 text-gray-200'
                    }`}
                  >
                    {ex.name}
                  </button>
                ))}
              </div>
            )}

            {/* Ny øvelse */}
            {!visNy ? (
              <button
                onClick={() => { setVisNy(true); setSelectedId(null) }}
                className="w-full py-2.5 rounded-xl text-sm font-medium text-orange-400 bg-orange-500/10 border border-orange-500/30"
              >
                + Ny øvelse
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="Navn på øvelse"
                  value={nyNavn}
                  onChange={e => setNyNavn(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <button
                  onClick={() => setVisNy(false)}
                  className="text-gray-500 text-xs"
                >
                  ← Velg eksisterende
                </button>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <button onClick={onClose} className="flex-1 bg-gray-800 text-white rounded-xl py-2.5 text-sm">
                Avbryt
              </button>
              <button
                onClick={lagre}
                disabled={saving || !kanLagre}
                className="flex-1 bg-orange-500 disabled:opacity-50 text-white rounded-xl py-2.5 text-sm font-semibold"
              >
                {saving ? 'Lagrer...' : 'Lagre demo'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
