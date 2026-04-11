'use client'

import { useState, useEffect, useCallback } from 'react'

type Exercise = {
  id: string
  name: string
  gifUrl: string
  bodyPart: string
  target: string
  equipment: string
  instructions: string[]
}

const BODY_PARTS = ['all', 'back', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist']
const LABELS: Record<string, string> = {
  all: 'Alle', back: 'Rygg', chest: 'Bryst', 'lower arms': 'Underarmer',
  'lower legs': 'Legg', neck: 'Nakke', shoulders: 'Skuldre',
  'upper arms': 'Overarmer', 'upper legs': 'Lår', waist: 'Mage/hofte',
}

export default function TestExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bodyPart, setBodyPart] = useState('waist')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selected, setSelected] = useState<Exercise | null>(null)

  const fetchExercises = useCallback(async () => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams({ limit: '20' })
    if (search) params.set('name', search)
    else if (bodyPart !== 'all') params.set('bodyPart', bodyPart)

    const res = await fetch(`/api/exercises?${params}`)
    if (!res.ok) {
      const data = await res.json()
      setError(data.error === 'no_key' ? 'Mangler RAPIDAPI_KEY i .env.local' : 'Klarte ikke hente øvelser')
      setLoading(false)
      return
    }
    const data = await res.json()
    setExercises(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [bodyPart, search])

  useEffect(() => { fetchExercises() }, [fetchExercises])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
  }

  return (
    <div className="p-4 space-y-4 pb-28">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Øvelsesbibliotek</h1>
        <p className="text-gray-400 text-sm mt-1">Test — velg øvelse for detaljer</p>
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

      {/* Kroppsdel-filter */}
      {!search && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {BODY_PARTS.map(bp => (
            <button
              key={bp}
              onClick={() => setBodyPart(bp)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                bodyPart === bp ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {LABELS[bp]}
            </button>
          ))}
        </div>
      )}

      {/* Feil */}
      {error && (
        <div className="bg-red-900/40 border border-red-700 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-3">
          {exercises.map(ex => (
            <button
              key={ex.id}
              onClick={() => setSelected(ex)}
              className="bg-gray-800 rounded-2xl overflow-hidden text-left hover:ring-2 hover:ring-orange-500 transition"
            >
              <img
                src={ex.gifUrl}
                alt={ex.name}
                className="w-full aspect-square object-cover bg-gray-700"
                loading="lazy"
              />
              <div className="p-2">
                <p className="text-white text-xs font-semibold capitalize leading-tight">{ex.name}</p>
                <p className="text-gray-500 text-xs capitalize mt-0.5">{ex.target}</p>
              </div>
            </button>
          ))}
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
            <img src={selected.gifUrl} alt={selected.name} className="w-full max-w-xs mx-auto block my-4" />
            <div className="px-4 pb-4 space-y-3">
              <div className="flex gap-2 flex-wrap">
                <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full capitalize">{selected.target}</span>
                <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full capitalize">{selected.bodyPart}</span>
                <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full capitalize">{selected.equipment}</span>
              </div>
              {selected.instructions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Slik gjør du det</p>
                  {selected.instructions.map((step, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-orange-500 text-xs font-bold mt-0.5">{i + 1}.</span>
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
