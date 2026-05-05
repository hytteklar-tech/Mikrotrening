'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { exercises as predefined, MUSCLE_GROUP_LABELS } from '@/data/exercises'

type PickedExercise = { name: string; unit: 'reps' | 'sek'; suggestedValue: number }
type UserExercise = { id: string; name: string; unit: 'reps' | 'sek'; suggested_value: number; muscle_group: string | null }

type Props = {
  userId: string
  onPick: (exercise: PickedExercise) => void
  onClose: () => void
}

const MUSCLE_GROUPS = Object.keys(MUSCLE_GROUP_LABELS)

export default function ExercisePicker({ userId, onPick, onClose }: Props) {
  const [search, setSearch] = useState('')
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const [userExercises, setUserExercises] = useState<UserExercise[]>([])
  const [showNewForm, setShowNewForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newUnit, setNewUnit] = useState<'reps' | 'sek'>('reps')
  const [newValue, setNewValue] = useState('10')
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase
      .from('user_exercises')
      .select('id, name, unit, suggested_value, muscle_group')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data }) => setUserExercises((data ?? []) as UserExercise[]))
  }, [userId])

  const q = search.toLowerCase().trim()

  const filteredPredefined = predefined.filter(e =>
    (!activeGroup || e.muscleGroup === activeGroup) &&
    (!q || e.name.toLowerCase().includes(q))
  )

  const filteredUser = userExercises.filter(e =>
    (!q || e.name.toLowerCase().includes(q))
  )

  async function saveAndPick() {
    if (!newName.trim() || !Number(newValue)) return
    setSaving(true)
    const { data } = await supabase
      .from('user_exercises')
      .insert({ user_id: userId, name: newName.trim(), unit: newUnit, suggested_value: Number(newValue) })
      .select()
      .single()
    if (data) setUserExercises(prev => [data as UserExercise, ...prev])
    onPick({ name: newName.trim(), unit: newUnit, suggestedValue: Number(newValue) })
    setSaving(false)
  }

  async function deleteUserExercise(id: string) {
    await supabase.from('user_exercises').delete().eq('id', id)
    setUserExercises(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-950" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <button onClick={onClose} className="text-gray-400 hover:text-white text-sm">← Avbryt</button>
        <h2 className="font-semibold text-white flex-1">Velg øvelse</h2>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2">
        <input
          autoFocus
          type="text"
          placeholder="Søk øvelse..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        />
      </div>

      {/* Muscle group filter */}
      {!q && (
        <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveGroup(null)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${!activeGroup ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            Alle
          </button>
          {MUSCLE_GROUPS.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(activeGroup === g ? null : g)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${activeGroup === g ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              {MUSCLE_GROUP_LABELS[g]}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">

        {/* Mine øvelser */}
        {filteredUser.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2 mt-3">Mine øvelser</p>
            <div className="space-y-1">
              {filteredUser.map(e => (
                <div key={e.id} className="flex items-center gap-2">
                  <button
                    onClick={() => onPick({ name: e.name, unit: e.unit as 'reps' | 'sek', suggestedValue: e.suggested_value })}
                    className="flex-1 flex items-center justify-between bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-3 transition text-left"
                  >
                    <span className="text-white text-sm font-medium">{e.name}</span>
                    <span className="text-orange-400 text-sm">{e.suggested_value} {e.unit}</span>
                  </button>
                  <button
                    onClick={() => deleteUserExercise(e.id)}
                    className="text-gray-600 hover:text-red-400 px-2 py-3 text-sm transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bibliotek */}
        {filteredPredefined.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2 mt-3">Bibliotek</p>
            <div className="space-y-1">
              {filteredPredefined.map(e => (
                <button
                  key={e.id}
                  onClick={() => onPick({ name: e.name, unit: e.unit, suggestedValue: e.suggestedValue })}
                  className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-3 transition text-left"
                >
                  <div>
                    <span className="text-white text-sm font-medium">{e.name}</span>
                    <span className="text-gray-500 text-xs ml-2">{MUSCLE_GROUP_LABELS[e.muscleGroup] ?? e.muscleGroup}</span>
                  </div>
                  <span className="text-orange-400 text-sm shrink-0 ml-2">{e.suggestedValue} {e.unit}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredPredefined.length === 0 && filteredUser.length === 0 && q && (
          <p className="text-gray-500 text-sm text-center pt-6">Ingen treff på «{search}»</p>
        )}

        {/* Ny egendefinert */}
        <div className="border-t border-gray-800 pt-4">
          {!showNewForm ? (
            <button
              onClick={() => { setShowNewForm(true); setNewName(search) }}
              className="w-full border-2 border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 rounded-xl py-3 text-sm transition"
            >
              + Lag ny egendefinert øvelse
            </button>
          ) : (
            <div className="bg-gray-800 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-white">Ny øvelse</p>
              <input
                type="text"
                placeholder="Navn på øvelse"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="flex gap-2">
                <div className="flex bg-gray-700 rounded-xl p-0.5 gap-0.5">
                  <button
                    onClick={() => setNewUnit('reps')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${newUnit === 'reps' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
                  >reps</button>
                  <button
                    onClick={() => setNewUnit('sek')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${newUnit === 'sek' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
                  >sek</button>
                </div>
                <input
                  type="number"
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  className="w-20 bg-gray-700 text-white rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowNewForm(false)}
                  className="flex-1 bg-gray-700 text-white rounded-xl py-2 text-sm"
                >Avbryt</button>
                <button
                  onClick={saveAndPick}
                  disabled={saving || !newName.trim()}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl py-2 text-sm font-semibold"
                >{saving ? 'Lagrer...' : 'Lagre og legg til'}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
