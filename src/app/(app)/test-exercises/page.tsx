'use client'

import { useState, useRef, useEffect } from 'react'
import { exercises, MUSCLE_GROUP_LABELS } from '@/data/exercises'
import type { Exercise } from '@/data/exercises'

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

const MUSCLE_GROUPS = ['alle', ...Object.keys(MUSCLE_GROUP_LABELS)] as const
const LABELS: Record<string, string> = { alle: 'Alle', ...MUSCLE_GROUP_LABELS }

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
  const [selectMode, setSelectMode] = useState(false)
  const [picked, setPicked] = useState<Set<string>>(new Set())
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (modalVideoRef.current) modalVideoRef.current.playbackRate = speed
  }, [speed, selected])

  const filtered = exercises.filter(ex => {
    const matchGroup = muscleGroup === 'alle' || ex.muscleGroup === muscleGroup
    const matchSearch = !search || ex.name.toLowerCase().includes(search.toLowerCase())
    return matchGroup && matchSearch
  })

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

  function handleCardClick(ex: Exercise) {
    if (selectMode) {
      togglePick(ex.id)
    } else {
      setSelected(ex)
    }
  }

  const pickedExercises = exercises.filter(e => picked.has(e.id))

  return (
    <div className="p-4 space-y-4 pb-28">
      <div className="pt-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Øvelsesbibliotek</h1>
          <p className="text-gray-400 text-sm mt-1">{exercises.length} øvelser — trykk for detaljer</p>
        </div>
        <button
          onClick={() => { setSelectMode(v => !v); if (selectMode) setPicked(new Set()) }}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            selectMode ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400'
          }`}
        >
          {selectMode ? 'Avbryt' : 'Velg'}
        </button>
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

      {/* Muskelgruppe-filter */}
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

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(ex => {
          const isPicked = picked.has(ex.id)
          return (
            <button
              key={ex.id}
              onClick={() => handleCardClick(ex)}
              className={`bg-gray-800 rounded-2xl overflow-hidden text-left transition relative ${
                isPicked
                  ? 'ring-2 ring-orange-500'
                  : 'hover:ring-2 hover:ring-orange-500'
              }`}
            >
              {selectMode && (
                <div className={`absolute top-2 right-2 z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                  isPicked ? 'bg-orange-500 border-orange-500' : 'border-gray-400 bg-black/40'
                }`}>
                  {isPicked && <span className="text-white text-xs leading-none">✓</span>}
                </div>
              )}
              <ExerciseMedia
                src={ex.image}
                alt={ex.name}
                className="w-full aspect-square object-cover bg-gray-700"
              />
              <div className="p-2">
                <p className="text-white text-xs font-semibold capitalize leading-tight">{ex.name}</p>
                <p className="text-gray-500 text-xs capitalize mt-0.5">{LABELS[ex.muscleGroup] ?? ex.muscleGroup}</p>
              </div>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center py-12 text-sm">Ingen øvelser funnet</p>
      )}

      {/* Valg-bar */}
      {selectMode && picked.size > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 flex items-center justify-between shadow-xl">
            <div>
              <p className="text-white font-semibold text-sm">{picked.size} øvelse{picked.size !== 1 ? 'r' : ''} valgt</p>
              <p className="text-gray-400 text-xs mt-0.5 truncate max-w-[200px]">
                {pickedExercises.map(e => e.name).join(', ')}
              </p>
            </div>
            <button
              onClick={() => {
                // TODO: koble til treningspakke
                alert(`Valgte:\n${pickedExercises.map(e => e.name).join('\n')}`)
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold ml-4 shrink-0"
            >
              Bruk disse
            </button>
          </div>
        </div>
      )}

      {/* Detalj-modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end" onClick={() => setSelected(null)}>
          <div className="bg-gray-900 rounded-t-3xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="text-white font-bold capitalize">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 text-xl">✕</button>
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
            <div className="px-4 pb-4 space-y-2">
              <div className="flex gap-2 flex-wrap">
                <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full capitalize">
                  {LABELS[selected.muscleGroup] ?? selected.muscleGroup}
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
                <div className="space-y-2 pt-2">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Slik gjør du det</p>
                  {selected.description.map((step, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-orange-500 text-xs font-bold mt-0.5 shrink-0">{i + 1}.</span>
                      <p className="text-gray-300 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
