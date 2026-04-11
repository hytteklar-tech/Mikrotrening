'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Exercise = { id: string; name: string; reps: number; order: number }
type Package = { id: string; name: string; is_active: boolean; exercises: Exercise[] }

export default function WorkoutList({ packages, userId }: { packages: Package[]; userId: string }) {
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [exercises, setExercises] = useState([{ name: '', reps: '' }])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editExercises, setEditExercises] = useState<{ name: string; reps: string }[]>([])
  const router = useRouter()
  const supabase = createClient()

  function startEdit(pkg: Package) {
    setEditingId(pkg.id)
    setEditName(pkg.name)
    setEditExercises(
      pkg.exercises
        .sort((a, b) => a.order - b.order)
        .map(e => ({ name: e.name, reps: String(e.reps) }))
    )
  }

  function cancelEdit() {
    setEditingId(null)
    setEditName('')
    setEditExercises([])
  }

  async function saveEdit(pkgId: string) {
    if (!editName.trim()) return
    setLoading(true)
    await supabase.from('workout_packages').update({ name: editName.trim() }).eq('id', pkgId)
    await supabase.from('exercises').delete().eq('package_id', pkgId)
    const validExercises = editExercises
      .filter(e => e.name.trim() && Number(e.reps) > 0)
      .map((e, i) => ({ package_id: pkgId, name: e.name.trim(), reps: Number(e.reps), order: i }))
    if (validExercises.length > 0) {
      await supabase.from('exercises').insert(validExercises)
    }
    setLoading(false)
    cancelEdit()
    router.refresh()
  }

  async function createPackage() {
    if (!newName.trim()) return
    setLoading(true)
    const { data: pkg } = await supabase
      .from('workout_packages')
      .insert({ user_id: userId, name: newName.trim() })
      .select()
      .single()

    if (pkg) {
      const validExercises = exercises
        .filter(e => e.name.trim() && Number(e.reps) > 0)
        .map((e, i) => ({ package_id: pkg.id, name: e.name.trim(), reps: Number(e.reps), order: i }))
      if (validExercises.length > 0) {
        await supabase.from('exercises').insert(validExercises)
      }
    }
    setLoading(false)
    setShowNew(false)
    setNewName('')
    setExercises([{ name: '', reps: '' }])
    router.refresh()
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from('workout_packages').update({ is_active: !current }).eq('id', id)
    router.refresh()
  }

  async function deletePackage(id: string) {
    await supabase.from('workout_packages').delete().eq('id', id)
    router.refresh()
  }

  const activePackages = packages.filter(p => p.is_active)
  const inactivePackages = packages.filter(p => !p.is_active)

  function renderPackage(pkg: Package) {
    return (
        <div key={pkg.id} className={`bg-gray-800 rounded-2xl p-4 ${!pkg.is_active ? 'opacity-50' : ''}`}>
          {editingId === pkg.id ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Navn på pakke"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <div className="space-y-2">
                <p className="text-xs text-gray-400">Øvelser</p>
                {editExercises.map((ex, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Øvelse"
                      value={ex.name}
                      onChange={e => setEditExercises(prev => prev.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                      className="flex-1 bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Reps"
                      value={ex.reps}
                      onChange={e => setEditExercises(prev => prev.map((x, j) => j === i ? { ...x, reps: e.target.value } : x))}
                      className="w-20 bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    <button
                      onClick={() => setEditExercises(prev => prev.filter((_, j) => j !== i))}
                      className="text-gray-500 hover:text-red-400 text-sm px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setEditExercises(prev => [...prev, { name: '', reps: '' }])}
                  className="text-orange-500 text-sm"
                >
                  + Legg til øvelse
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={cancelEdit}
                  className="flex-1 bg-gray-700 text-white rounded-xl py-2 text-sm"
                >
                  Avbryt
                </button>
                <button
                  onClick={() => saveEdit(pkg.id)}
                  disabled={loading || !editName.trim()}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl py-2 text-sm font-semibold"
                >
                  {loading ? 'Lagrer...' : 'Lagre'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{pkg.name}</h3>
                  {!pkg.is_active && <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Inaktiv</span>}
                </div>
                <div className="flex gap-3">
                  {pkg.is_active && (
                    <button onClick={() => startEdit(pkg)} className="text-gray-400 hover:text-white text-sm">
                      Rediger
                    </button>
                  )}
                  <button
                    onClick={() => toggleActive(pkg.id, pkg.is_active)}
                    className={`text-sm ${pkg.is_active ? 'text-gray-500 hover:text-yellow-400' : 'text-orange-500 hover:text-orange-400'}`}
                  >
                    {pkg.is_active ? 'Deaktiver' : 'Aktiver'}
                  </button>
                  <button onClick={() => deletePackage(pkg.id)} className="text-gray-500 hover:text-red-400 text-sm">
                    Slett
                  </button>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                {pkg.exercises
                  .sort((a, b) => a.order - b.order)
                  .map(ex => (
                    <div key={ex.id} className="flex justify-between text-sm text-gray-300">
                      <span>{ex.name}</span>
                      <span className="text-orange-400 font-medium">{ex.reps} reps</span>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
    )
  }

  return (
    <div className="space-y-3">
      {activePackages.map(pkg => renderPackage(pkg))}

      {inactivePackages.length > 0 && (
        <>
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide pt-2">Inaktive</p>
          {inactivePackages.map(pkg => renderPackage(pkg))}
        </>
      )}

      {showNew ? (
        <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
          <input
            type="text"
            placeholder="Navn på pakke"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
          <div className="space-y-2">
            <p className="text-xs text-gray-400">Øvelser</p>
            {exercises.map((ex, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Øvelse"
                  value={ex.name}
                  onChange={e => setExercises(prev => prev.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                  className="flex-1 bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={ex.reps}
                  onChange={e => setExercises(prev => prev.map((x, j) => j === i ? { ...x, reps: e.target.value } : x))}
                  className="w-20 bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>
            ))}
            <button
              onClick={() => setExercises(prev => [...prev, { name: '', reps: '' }])}
              className="text-orange-500 text-sm"
            >
              + Legg til øvelse
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowNew(false); setNewName(''); setExercises([{ name: '', reps: '' }]) }}
              className="flex-1 bg-gray-700 text-white rounded-xl py-2 text-sm"
            >
              Avbryt
            </button>
            <button
              onClick={createPackage}
              disabled={loading || !newName.trim()}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl py-2 text-sm font-semibold"
            >
              {loading ? 'Lagrer...' : 'Lagre'}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowNew(true)}
          className="w-full border-2 border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 rounded-2xl py-4 text-sm transition"
        >
          + Ny treningspakke
        </button>
      )}
    </div>
  )
}
