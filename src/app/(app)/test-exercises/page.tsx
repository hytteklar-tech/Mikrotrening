'use client'

import { useState } from 'react'
import { exercises, MUSCLE_GROUP_LABELS } from '@/data/exercises'
import type { Exercise } from '@/data/exercises'

const MUSCLE_GROUPS = ['alle', 'bryst', 'ben'] as const
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

  const filtered = exercises.filter(ex => {
    const matchGroup = muscleGroup === 'alle' || ex.muscleGroup === muscleGroup
    const matchSearch = !search || ex.name.toLowerCase().includes(search.toLowerCase())
    return matchGroup && matchSearch
  })

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
  }

  return (
    <div className="p-4 space-y-4 pb-28">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Øvelsesbibliotek</h1>
        <p className="text-gray-400 text-sm mt-1">{exercises.length} øvelser — trykk for detaljer</p>
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
        {filtered.map(ex => (
          <button
            key={ex.id}
            onClick={() => setSelected(ex)}
            className="bg-gray-800 rounded-2xl overflow-hidden text-left hover:ring-2 hover:ring-orange-500 transition"
          >
            <img
              src={ex.image}
              alt={ex.name}
              className="w-full aspect-square object-cover bg-gray-700"
              loading="lazy"
            />
            <div className="p-2">
              <p className="text-white text-xs font-semibold capitalize leading-tight">{ex.name}</p>
              <p className="text-gray-500 text-xs capitalize mt-0.5">{LABELS[ex.muscleGroup] ?? ex.muscleGroup}</p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center py-12 text-sm">Ingen øvelser funnet</p>
      )}

      {/* Detalj-modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end" onClick={() => setSelected(null)}>
          <div className="bg-gray-900 rounded-t-3xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="text-white font-bold capitalize">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 text-xl">✕</button>
            </div>
            <img src={selected.image} alt={selected.name} className="w-full max-w-xs mx-auto block my-4" />
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
