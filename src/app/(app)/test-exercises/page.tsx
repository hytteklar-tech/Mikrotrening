'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { exercises, MUSCLE_GROUP_LABELS } from '@/data/exercises'
import type { Exercise } from '@/data/exercises'
import { createClient } from '@/lib/supabase/client'

type UserExercise = { id: string; name: string; unit: 'reps' | 'sek'; suggested_value: number; muscle_group: string | null; description: string | null }

function ExerciseMedia({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1
  }, [])

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
      />
    )
  }
  return <img src={src} alt={alt} className={className} loading="lazy" />
}

const MUSCLE_GROUPS = ['alle', 'egne', ...Object.keys(MUSCLE_GROUP_LABELS)] as const
const LABELS: Record<string, string> = { alle: 'Alle', egne: 'Egne', ...MUSCLE_GROUP_LABELS }

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'text-green-400',
  intermediate: 'text-yellow-400',
  expert: 'text-red-400',
}
const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Nybegynner',
  intermediate: 'Middels',
  expert: 'Ekspert',
}

export default function TestExercisesPage() {
  const [muscleGroup, setMuscleGroup] = useState<string>('alle')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selected, setSelected] = useState<Exercise | null>(null)
  const [speed, setSpeed] = useState(1)
  const [picked, setPicked] = useState<Set<string>>(new Set())
  const [userExercises, setUserExercises] = useState<UserExercise[]>([])
  const [showNewForm, setShowNewForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newUnit, setNewUnit] = useState<'reps' | 'sek'>('reps')
  const [newValue, setNewValue] = useState('10')
  const [newDescription, setNewDescription] = useState('')
  const [editingExercise, setEditingExercise] = useState<UserExercise | null>(null)
  const [editName, setEditName] = useState('')
  const [editUnit, setEditUnit] = useState<'reps' | 'sek'>('reps')
  const [editValue, setEditValue] = useState('10')
  const [editDescription, setEditDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const supabase = createClient()
  const addto = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('addto')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase
        .from('user_exercises')
        .select('id, name, unit, suggested_value, muscle_group, description')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => setUserExercises((data ?? []) as UserExercise[]))
    })
  }, [])

  useEffect(() => {
    if (modalVideoRef.current) modalVideoRef.current.playbackRate = speed
  }, [speed, selected])

  const filtered = exercises.filter(ex => {
    const matchGroup = muscleGroup === 'alle' || ex.muscleGroup === muscleGroup
    const matchSearch = !search || ex.name.toLowerCase().includes(search.toLowerCase())
    return matchGroup && matchSearch
  })

  const filteredUserExercises = userExercises.filter(ex =>
    !search || ex.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
  }

  function togglePick(id: string) {
    setPicked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function saveNewExercise() {
    if (!newName.trim() || !Number(newValue)) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }
    const { data } = await supabase
      .from('user_exercises')
      .insert({ user_id: user.id, name: newName.trim(), unit: newUnit, suggested_value: Number(newValue), description: newDescription.trim() || null })
      .select()
      .single()
    if (data) {
      setUserExercises(prev => [data as UserExercise, ...prev])
    }
    setNewName('')
    setNewValue('10')
    setNewUnit('reps')
    setNewDescription('')
    setShowNewForm(false)
    setMuscleGroup('egne')
    setSaving(false)
  }

  async function deleteUserExercise(id: string) {
    await supabase.from('user_exercises').delete().eq('id', id)
    setUserExercises(prev => prev.filter(e => e.id !== id))
    setPicked(prev => { const next = new Set(prev); next.delete(id); return next })
  }

  function startEdit(ex: UserExercise) {
    setEditingExercise(ex)
    setEditName(ex.name)
    setEditUnit(ex.unit)
    setEditValue(String(ex.suggested_value))
    setEditDescription(ex.description ?? '')
  }

  async function saveEdit() {
    if (!editingExercise || !editName.trim() || !Number(editValue)) return
    setSaving(true)
    const { data } = await supabase
      .from('user_exercises')
      .update({ name: editName.trim(), unit: editUnit, suggested_value: Number(editValue), description: editDescription.trim() || null })
      .eq('id', editingExercise.id)
      .select()
      .single()
    if (data) {
      setUserExercises(prev => prev.map(e => e.id === editingExercise.id ? data as UserExercise : e))
    }
    setEditingExercise(null)
    setSaving(false)
  }

  function buildPickedRows() {
    const libraryRows = exercises
      .filter(e => picked.has(e.id))
      .map(e => ({ name: e.name, value: String(e.suggestedValue), unit: e.unit }))
    const userRows = userExercises
      .filter(e => picked.has(e.id))
      .map(e => ({ name: e.name, value: String(e.suggested_value), unit: e.unit }))
    return [...libraryRows, ...userRows]
  }

  return (
    <div className="p-4 space-y-4 pb-28">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Øvelsesbibliotek</h1>
        <p className="text-gray-400 text-sm mt-1">Trykk for å velge · ℹ for beskrivelse</p>
      </div>

      {/* Søk */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Søk øvelse..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        />
        <button type="submit" className="bg-orange-500 text-white rounded-xl px-4 py-2 text-sm font-semibold">
          Søk
        </button>
        {search && (
          <button type="button" onClick={() => { setSearch(''); setSearchInput('') }} className="text-gray-400 text-sm px-2">
            ✕
          </button>
        )}
      </form>

      {/* Muskelgruppe-filter inkl. Egne */}
      {!search && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {MUSCLE_GROUPS.map(mg => (
            <button
              key={mg}
              onClick={() => setMuscleGroup(mg)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                muscleGroup === mg ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {LABELS[mg]}
            </button>
          ))}
        </div>
      )}

      {/* Grid — egne øvelser */}
      {muscleGroup === 'egne' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* + Ny øvelse-kort — alltid først */}
            <button
              onClick={() => setShowNewForm(true)}
              className="bg-gray-800 rounded-2xl overflow-hidden border-2 border-dashed border-gray-700 hover:border-orange-500 transition text-left"
            >
              <div className="w-full aspect-square bg-gray-700 flex flex-col items-center justify-center gap-1">
                <span className="text-orange-400 text-2xl leading-none">+</span>
                <span className="text-orange-400 text-xs font-semibold">Ny øvelse</span>
              </div>
              <div className="p-2">
                <p className="text-gray-600 text-xs font-medium">—</p>
              </div>
            </button>

            {filteredUserExercises.map(ex => {
              const isPicked = picked.has(ex.id)
              return (
                <div
                  key={ex.id}
                  className={`bg-gray-800 rounded-2xl overflow-hidden relative transition ${isPicked ? 'ring-2 ring-orange-500' : ''}`}
                >
                  <button
                    onClick={() => togglePick(ex.id)}
                    className={`absolute top-2 left-2 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                      isPicked ? 'bg-orange-500 border-orange-500' : 'border-gray-400 bg-black/40'
                    }`}
                  >
                    {isPicked && <span className="text-white text-xs leading-none font-bold">✓</span>}
                  </button>
                  <button onClick={() => togglePick(ex.id)} className="w-full text-left">
                    <div className="w-full aspect-square bg-gray-700 flex flex-col items-center justify-center px-3 gap-1.5">
                      <p className="text-white text-sm font-semibold text-center leading-snug">{ex.name}</p>
                      {ex.description && (
                        <p className="text-gray-400 text-xs text-center leading-snug line-clamp-3">{ex.description}</p>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-orange-400 text-xs font-medium">{ex.suggested_value} {ex.unit}</p>
                    </div>
                  </button>
                  <button
                    onClick={() => startEdit(ex)}
                    className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center text-gray-400 hover:text-white text-xs transition"
                  >✎</button>
                  <button
                    onClick={() => deleteUserExercise(ex.id)}
                    className="absolute top-2 right-9 z-10 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center text-gray-400 hover:text-red-400 text-sm transition"
                  >×</button>
                </div>
              )
            })}

          </div>

          {filteredUserExercises.length === 0 && (
            <p className="text-gray-500 text-center py-6 text-sm">Ingen egne øvelser ennå</p>
          )}
        </div>
      )}

      {/* Grid — bibliotek */}
      {muscleGroup !== 'egne' && (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(ex => {
            const isPicked = picked.has(ex.id)
            return (
              <div
                key={ex.id}
                className={`bg-gray-800 rounded-2xl overflow-hidden relative transition ${
                  isPicked ? 'ring-2 ring-orange-500' : ''
                }`}
              >
                <button
                  onClick={() => togglePick(ex.id)}
                  className={`absolute top-2 left-2 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    isPicked ? 'bg-orange-500 border-orange-500' : 'border-gray-400 bg-black/40'
                  }`}
                >
                  {isPicked && <span className="text-white text-xs leading-none font-bold">✓</span>}
                </button>
                <button
                  onClick={() => setSelected(ex)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center text-white text-xs font-bold hover:bg-black/70 transition"
                >ℹ</button>
                <button onClick={() => togglePick(ex.id)} className="w-full text-left">
                  <ExerciseMedia
                    src={ex.image}
                    alt={ex.name}
                    className="w-full aspect-square object-cover bg-gray-700"
                  />
                  <div className="p-2">
                    <p className="text-white text-xs font-semibold capitalize leading-tight">{ex.name}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-gray-500 text-xs capitalize">{LABELS[ex.muscleGroup] ?? ex.muscleGroup}</p>
                      <p className="text-orange-400 text-xs font-medium">{ex.suggestedValue} {ex.unit}</p>
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      )}

      {muscleGroup !== 'egne' && filtered.length === 0 && (
        <p className="text-gray-500 text-center py-12 text-sm">Ingen øvelser funnet</p>
      )}

      {/* Valg-bar */}
      {picked.size > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-40 flex justify-center">
          <button
            onClick={() => {
              const newOnes = buildPickedRows()
              if (addto) {
                const wip = sessionStorage.getItem('wip_package')
                const existing = wip ? JSON.parse(wip) : { name: '', exercises: [] }
                sessionStorage.setItem('wip_package', JSON.stringify({
                  name: existing.name,
                  exercises: [...existing.exercises, ...newOnes],
                }))
                router.push('/workouts')
              } else {
                sessionStorage.setItem('wip_package', JSON.stringify({ name: '', exercises: newOnes }))
                router.push('/workouts')
              }
            }}
            className="bg-gray-900 border border-gray-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2"
          >
            <span className="bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">{picked.size}</span>
            {addto ? 'Legg til i pakke →' : 'Lag pakke →'}
          </button>
        </div>
      )}

      {/* Ny egendefinert øvelse — bottom sheet */}
      {showNewForm && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50" onClick={() => setShowNewForm(false)}>
          <div className="bg-gray-900 rounded-t-3xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <h2 className="text-white font-bold">Ny egendefinert øvelse</h2>
              <button onClick={() => setShowNewForm(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3 pb-8">
              <input
                autoFocus
                type="text"
                placeholder="Navn på øvelse"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <div className="flex gap-3 items-center">
                <div className="flex bg-gray-700 rounded-xl p-0.5 gap-0.5">
                  <button
                    onClick={() => setNewUnit('reps')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${newUnit === 'reps' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
                  >reps</button>
                  <button
                    onClick={() => setNewUnit('sek')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${newUnit === 'sek' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
                  >sek</button>
                </div>
                <input
                  type="number"
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  className="w-24 bg-gray-700 text-white rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm text-center"
                />
              </div>
              <textarea
                placeholder="Beskrivelse (valgfritt) — vises på kortet"
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                rows={3}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none"
              />
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowNewForm(false)}
                  className="flex-1 bg-gray-700 text-white rounded-xl py-2.5 text-sm"
                >Avbryt</button>
                <button
                  onClick={saveNewExercise}
                  disabled={saving || !newName.trim() || !Number(newValue)}
                  className="flex-1 bg-orange-500 disabled:opacity-50 text-white rounded-xl py-2.5 text-sm font-semibold"
                >{saving ? 'Lagrer...' : 'Lagre øvelse'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rediger egendefinert øvelse */}
      {editingExercise && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50" onClick={() => setEditingExercise(null)}>
          <div className="bg-gray-900 rounded-t-3xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <h2 className="text-white font-bold">Rediger øvelse</h2>
              <button onClick={() => setEditingExercise(null)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3 pb-8">
              <input
                autoFocus
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <div className="flex gap-3 items-center">
                <div className="flex bg-gray-700 rounded-xl p-0.5 gap-0.5">
                  <button onClick={() => setEditUnit('reps')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${editUnit === 'reps' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}>reps</button>
                  <button onClick={() => setEditUnit('sek')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${editUnit === 'sek' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}>sek</button>
                </div>
                <input
                  type="number"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  className="w-24 bg-gray-700 text-white rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm text-center"
                />
              </div>
              <textarea
                placeholder="Beskrivelse (valgfritt)"
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                rows={3}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none"
              />
              <div className="flex gap-2 pt-1">
                <button onClick={() => setEditingExercise(null)} className="flex-1 bg-gray-700 text-white rounded-xl py-2.5 text-sm">Avbryt</button>
                <button
                  onClick={saveEdit}
                  disabled={saving || !editName.trim() || !Number(editValue)}
                  className="flex-1 bg-orange-500 disabled:opacity-50 text-white rounded-xl py-2.5 text-sm font-semibold"
                >{saving ? 'Lagrer...' : 'Lagre'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detalj-modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50" onClick={() => setSelected(null)}>
          <div className="bg-gray-900 rounded-t-3xl max-h-[65vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-white font-bold truncate">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-orange-400 font-semibold text-sm shrink-0 ml-3">← Lukk</button>
            </div>
            {(selected.image.endsWith('.mp4') || selected.image.endsWith('.webm')) ? (
              <div className="flex flex-col items-center my-4 gap-2">
                <video
                  ref={modalVideoRef}
                  src={selected.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-w-xs mx-auto block"
                />
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>Hastighet:</span>
                  {[0.05, 0.1, 0.25, 0.5, 1].map(s => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`px-2 py-1 rounded-full ${speed === s ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <img src={selected.image} alt={selected.name} className="w-full max-w-xs mx-auto block my-4" />
            )}
            <div className="px-4 pb-8 space-y-3">
              <div className="flex gap-2 flex-wrap">
                <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full capitalize">
                  {LABELS[selected.muscleGroup] ?? selected.muscleGroup}
                </span>
                <span className="bg-gray-800 text-orange-400 text-xs px-2 py-1 rounded-full font-semibold">
                  {selected.suggestedValue} {selected.unit}
                </span>
                {selected.equipment && (
                  <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full capitalize">
                    {selected.equipment}
                  </span>
                )}
                {selected.level && (
                  <span className={`bg-gray-800 text-xs px-2 py-1 rounded-full capitalize ${LEVEL_COLORS[selected.level] ?? 'text-gray-400'}`}>
                    {LEVEL_LABELS[selected.level] ?? selected.level}
                  </span>
                )}
              </div>
              {selected.primaryMuscles.length > 0 && (
                <p className="text-gray-500 text-xs capitalize">
                  Primærmuskel: {selected.primaryMuscles.join(', ')}
                </p>
              )}
              {selected.description && selected.description.length > 0 && (
                <div className="space-y-3 pt-1">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Slik gjør du det</p>
                  {selected.description.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-orange-500 text-sm font-bold mt-0.5 shrink-0">{i + 1}.</span>
                      <p className="text-gray-200 text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => { togglePick(selected.id); setSelected(null) }}
                className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition ${
                  picked.has(selected.id)
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {picked.has(selected.id) ? '✓ Valgt — fjern' : '+ Velg denne øvelsen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
