'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import ExercisePicker from './ExercisePicker'

type Exercise = { id: string; name: string; reps: number; unit: string; order: number }
type Package = { id: string; name: string; is_active: boolean; exercises: Exercise[] }
type DurationStat = { avgSeconds: number; timedCount: number; untimedCount: number }
type ExerciseRow = { name: string; value: string; unit: 'reps' | 'sek' }

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function UnitToggle({ unit, onChange }: { unit: 'reps' | 'sek'; onChange: (u: 'reps' | 'sek') => void }) {
  return (
    <div className="flex bg-gray-700 rounded-lg p-0.5 gap-0.5 shrink-0">
      <button
        type="button"
        onClick={() => onChange('reps')}
        className={`px-2 py-1 rounded-md text-xs font-medium transition ${unit === 'reps' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
      >reps</button>
      <button
        type="button"
        onClick={() => onChange('sek')}
        className={`px-2 py-1 rounded-md text-xs font-medium transition ${unit === 'sek' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
      >sek</button>
    </div>
  )
}

function ExerciseRowEditor({
  ex, i, onChange, onRemove, userId,
}: {
  ex: ExerciseRow
  i: number
  onChange: (i: number, field: keyof ExerciseRow, val: string) => void
  onRemove: (i: number) => void
  userId: string
}) {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="flex-1 bg-gray-700 text-left text-white rounded-xl px-3 py-2 text-sm truncate outline-none focus:ring-2 focus:ring-orange-500"
        >
          {ex.name || <span className="text-gray-500">Velg øvelse...</span>}
        </button>
        <input
          type="number"
          placeholder="10"
          value={ex.value}
          onChange={e => onChange(i, 'value', e.target.value)}
          className="w-16 bg-gray-700 text-white rounded-xl px-2 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm text-center"
        />
        <UnitToggle unit={ex.unit} onChange={u => onChange(i, 'unit', u)} />
        <button type="button" onClick={() => onRemove(i)} className="text-gray-500 hover:text-red-400 text-sm px-1">×</button>
      </div>
      {showPicker && (
        <ExercisePicker
          userId={userId}
          onPick={picked => {
            onChange(i, 'name', picked.name)
            onChange(i, 'unit', picked.unit)
            onChange(i, 'value', String(picked.suggestedValue))
            setShowPicker(false)
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  )
}

type PreselectedRow = { name: string; value: string; unit: 'reps' | 'sek' }

function suggestName(rows: { value: string }[]): string {
  const total = rows.reduce((s, e) => s + Number(e.value), 0)
  return total > 0 ? `Mikro ${total}` : ''
}

export default function WorkoutList({ packages, userId, durationStats, preselected = [] }: { packages: Package[]; userId: string; durationStats: Record<string, DurationStat>; preselected?: PreselectedRow[] }) {
  const [showNew, setShowNew] = useState(preselected.length > 0)
  const [newName, setNewName] = useState(preselected.length > 0 ? suggestName(preselected) : '')
  const [exercises, setExercises] = useState<ExerciseRow[]>(
    preselected.length > 0 ? preselected : [{ name: '', value: '', unit: 'reps' }]
  )
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (newName.startsWith('Mikro ') || newName === '') {
      setNewName(suggestName(exercises))
    }
  }, [exercises])

  // Gjenopprett WIP-pakke etter retur fra biblioteket
  useEffect(() => {
    const wip = sessionStorage.getItem('wip_package')
    if (wip) {
      try {
        const { name, exercises: ex } = JSON.parse(wip)
        sessionStorage.removeItem('wip_package')
        setNewName(name)
        setExercises(ex)
        setShowNew(true)
      } catch {}
    }
  }, [])
  const [editName, setEditName] = useState('')
  const [editExercises, setEditExercises] = useState<ExerciseRow[]>([])
  const router = useRouter()
  const supabase = createClient()

  function updateRow(rows: ExerciseRow[], i: number, field: keyof ExerciseRow, val: string): ExerciseRow[] {
    return rows.map((x, j) => j === i ? { ...x, [field]: val } : x)
  }

  function startEdit(pkg: Package) {
    setEditingId(pkg.id)
    setEditName(pkg.name)
    setEditExercises(
      pkg.exercises
        .sort((a, b) => a.order - b.order)
        .map(e => ({ name: e.name, value: String(e.reps), unit: (e.unit as 'reps' | 'sek') || 'reps' }))
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
    const valid = editExercises
      .filter(e => e.name.trim() && Number(e.value) > 0)
      .map((e, i) => ({ package_id: pkgId, name: e.name.trim(), reps: Number(e.value), unit: e.unit, order: i }))
    if (valid.length > 0) await supabase.from('exercises').insert(valid)
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
      const valid = exercises
        .filter(e => e.name.trim() && Number(e.value) > 0)
        .map((e, i) => ({ package_id: pkg.id, name: e.name.trim(), reps: Number(e.value), unit: e.unit, order: i }))
      if (valid.length > 0) await supabase.from('exercises').insert(valid)
    }
    setLoading(false)
    setShowNew(false)
    setNewName('')
    setExercises([{ name: '', value: '', unit: 'reps' }])
    router.refresh()
  }

  async function backfillDuration(packageId: string, avgSeconds: number) {
    await supabase.from('daily_logs').update({ duration_seconds: avgSeconds })
      .eq('user_id', userId).eq('package_id', packageId).is('duration_seconds', null)
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
                <ExerciseRowEditor
                  key={i} ex={ex} i={i} userId={userId}
                  onChange={(i, f, v) => setEditExercises(prev => updateRow(prev, i, f, v))}
                  onRemove={i => setEditExercises(prev => prev.filter((_, j) => j !== i))}
                />
              ))}
              <button
                onClick={() => setEditExercises(prev => [...prev, { name: '', value: '', unit: 'reps' }])}
                className="text-orange-500 text-sm"
              >+ Legg til øvelse</button>
            </div>
            <div className="flex gap-2">
              <button onClick={cancelEdit} className="flex-1 bg-gray-700 text-white rounded-xl py-2 text-sm">Avbryt</button>
              <button
                onClick={() => saveEdit(pkg.id)}
                disabled={loading || !editName.trim()}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl py-2 text-sm font-semibold"
              >{loading ? 'Lagrer...' : 'Lagre'}</button>
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
                  <button onClick={() => startEdit(pkg)} className="text-gray-300 hover:text-white text-sm font-medium">Rediger</button>
                )}
                <button
                  onClick={() => toggleActive(pkg.id, pkg.is_active)}
                  className={`text-sm ${pkg.is_active ? 'text-gray-300 hover:text-white' : 'text-orange-400 hover:text-orange-300 font-medium'}`}
                >{pkg.is_active ? 'Deaktiver' : 'Aktiver'}</button>
                <button onClick={() => deletePackage(pkg.id)} className="text-gray-300 hover:text-red-400 text-sm">Slett</button>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              {pkg.exercises
                .sort((a, b) => a.order - b.order)
                .map(ex => (
                  <div key={ex.id} className="flex justify-between text-sm text-gray-300">
                    <span>{ex.name}</span>
                    <span className="text-orange-400 font-medium">{ex.reps} {ex.unit === 'sek' ? 'sek' : 'reps'}</span>
                  </div>
                ))}
            </div>
            {(() => {
              const stat = durationStats[pkg.id]
              if (!stat || stat.timedCount === 0) return null
              return (
                <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                  <p className="text-xs text-gray-400">
                    ⏱ Snitt: <span className="text-orange-400 font-semibold">{formatDuration(stat.avgSeconds)}</span>
                    <span className="text-gray-500"> · basert på {stat.timedCount} {stat.timedCount === 1 ? 'økt' : 'økter'}</span>
                  </p>
                  {stat.untimedCount > 0 && (
                    <button
                      onClick={() => backfillDuration(pkg.id, stat.avgSeconds)}
                      className="text-xs text-orange-500 hover:text-orange-400 transition"
                    >Fyll inn tid for {stat.untimedCount} tidligere {stat.untimedCount === 1 ? 'økt' : 'økter'} →</button>
                  )}
                </div>
              )
            })()}
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
          <p className="text-white text-xs font-semibold uppercase tracking-wide pt-2">Inaktive</p>
          {inactivePackages.map(pkg => renderPackage(pkg))}
        </>
      )}

      {/* Tittel-knapp (B) — vises over listen */}
      {!showNew && (
        <div className="flex items-center justify-between -mt-2">
          <p className="text-xs text-gray-500">{activePackages.length} aktive pakker</p>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-1.5 text-orange-400 text-sm font-semibold hover:text-orange-300 transition"
          >
            <span className="text-xl leading-none">+</span> Ny pakke
          </button>
        </div>
      )}

      {/* Ny pakke — modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50" onClick={() => { setShowNew(false); setNewName(''); setExercises([{ name: '', value: '', unit: 'reps' }]) }}>
          <div className="bg-gray-900 rounded-t-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-white font-bold">Ny treningspakke</h2>
              <button onClick={() => { setShowNew(false); setNewName(''); setExercises([{ name: '', value: '', unit: 'reps' }]) }} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Navn på pakke"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                autoFocus
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Øvelser</p>
                  {(() => {
                    const valid = exercises.filter(e => e.name && Number(e.value) > 0)
                    const total = valid.reduce((s, e) => s + Number(e.value), 0)
                    return total > 0 ? <p className="text-xs text-orange-400 font-medium">Totalt: {total}</p> : null
                  })()}
                </div>
                {exercises.map((ex, i) => (
                  <ExerciseRowEditor
                    key={i} ex={ex} i={i} userId={userId}
                    onChange={(i, f, v) => setExercises(prev => updateRow(prev, i, f, v))}
                    onRemove={i => setExercises(prev => prev.filter((_, j) => j !== i))}
                  />
                ))}
                <button
                  onClick={() => {
                    sessionStorage.setItem('wip_package', JSON.stringify({ name: newName, exercises }))
                    router.push('/test-exercises?addto=1')
                  }}
                  className="text-orange-500 text-sm"
                >+ Legg til fra bibliotek</button>
              </div>
              <div className="flex gap-2 pb-2">
                <button
                  onClick={() => { setShowNew(false); setNewName(''); setExercises([{ name: '', value: '', unit: 'reps' }]) }}
                  className="flex-1 bg-gray-700 text-white rounded-xl py-2 text-sm"
                >Avbryt</button>
                <button
                  onClick={createPackage}
                  disabled={loading || !newName.trim()}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl py-2 text-sm font-semibold"
                >{loading ? 'Lagrer...' : 'Lagre'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
