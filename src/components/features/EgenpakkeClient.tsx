'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import ExerciseRowEditor, { type ExerciseRow } from './ExerciseRowEditor'

type Exercise = { id: string; name: string; reps: number; unit: string; order: number }
type Package = { id: string; name: string; is_active: boolean; category_ids: string[]; exercises: Exercise[] }
type Category = { id: string; name: string }

const DEFAULT_CATEGORIES = ['Hjemme', 'På jobben', 'Treningssenter']

function suggestName(rows: { value: string }[]): string {
  const total = rows.reduce((s, e) => s + Number(e.value), 0)
  return total > 0 ? `Mikro ${total}` : ''
}

function CategoryPicker({ value, onChange, categories }: { value: string[]; onChange: (ids: string[]) => void; categories: Category[] }) {
  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter(x => x !== id) : [...value, id])
  }
  return (
    <div>
      <p className="text-xs text-gray-400 mb-2">Kategorier (valgfritt)</p>
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c.id}
            type="button"
            onClick={() => toggle(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${value.includes(c.id) ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >{c.name}</button>
        ))}
      </div>
    </div>
  )
}

function totalLabel(exercises: Exercise[]) {
  const reps = exercises.filter(e => e.unit !== 'sek').reduce((s, e) => s + e.reps, 0)
  const sek = exercises.filter(e => e.unit === 'sek').reduce((s, e) => s + e.reps, 0)
  const parts = []
  if (reps > 0) parts.push(`${reps} reps`)
  if (sek > 0) parts.push(`${sek} sek`)
  return parts.join(' · ')
}

export default function EgenpakkeClient({
  packages: initialPackages,
  userId,
  preselected = [],
}: {
  packages: Package[]
  userId: string
  preselected?: ExerciseRow[]
}) {
  const [packages, setPackages] = useState(initialPackages)
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCat, setActiveCat] = useState<string | null>(null) // null = Alle
  const [showCatManager, setShowCatManager] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [editingCat, setEditingCat] = useState<Category | null>(null)
  const [editCatName, setEditCatName] = useState('')

  const [selectedId, setSelectedId] = useState<string | null>(
    initialPackages.find(p => p.is_active)?.id ?? initialPackages[0]?.id ?? null
  )

  useEffect(() => {
    setPackages(prev => {
      const localMap = new Map(prev.map(p => [p.id, p]))
      return initialPackages.map(p => ({
        ...p,
        category_ids: (p.category_ids ?? []).length > 0 ? (p.category_ids ?? []) : (localMap.get(p.id)?.category_ids ?? []),
      }))
    })
    setSelectedId(prev => {
      const ids = new Set(initialPackages.map(p => p.id))
      if (prev && ids.has(prev)) return prev
      return initialPackages.find(p => p.is_active)?.id ?? initialPackages[0]?.id ?? null
    })
  }, [initialPackages])

  const supabase = createClient()

  // Last kategorier, lag defaults ved første gang
  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase
        .from('package_categories')
        .select('id, name')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
      if (data && data.length > 0) {
        setCategories(data as Category[])
      } else {
        // Opprett default-kategorier
        const { data: created } = await supabase
          .from('package_categories')
          .insert(DEFAULT_CATEGORIES.map(name => ({ user_id: userId, name })))
          .select('id, name')
        if (created) setCategories(created as Category[])
      }
    }
    loadCategories()
  }, [userId])

  const [showNew, setShowNew] = useState(preselected.length > 0)
  const [showArchive, setShowArchive] = useState(false)
  const [newName, setNewName] = useState(preselected.length > 0 ? suggestName(preselected) : '')
  const [newExercises, setNewExercises] = useState<ExerciseRow[]>(preselected.length > 0 ? preselected : [])
  const [newCategoryIds, setNewCategoryIds] = useState<string[]>([])
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editExercises, setEditExercises] = useState<ExerciseRow[]>([])
  const [editCategoryIds, setEditCategoryIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [saveToLibraryFor, setSaveToLibraryFor] = useState<Package | null>(null)
  const [saveSelected, setSaveSelected] = useState<Set<string>>(new Set())
  const [savingToLibrary, setSavingToLibrary] = useState(false)
  const router = useRouter()

  const active = packages.filter(p => p.is_active)
  const archived = packages.filter(p => !p.is_active)

  const visibleActive = activeCat === null
    ? active
    : active.filter(p => (p.category_ids ?? []).includes(activeCat))

  const selected = packages.find(p => p.id === selectedId) ?? null

  function updateRow(rows: ExerciseRow[], i: number, field: keyof ExerciseRow, val: string): ExerciseRow[] {
    return rows.map((x, j) => j === i ? { ...x, [field]: val } : x)
  }

  useEffect(() => {
    if (newName.startsWith('Mikro ') || newName === '') {
      setNewName(suggestName(newExercises))
    }
  }, [newExercises])

  useEffect(() => {
    const wip = sessionStorage.getItem('wip_package')
    if (wip) {
      try {
        const { name, exercises: ex, categoryIds } = JSON.parse(wip)
        sessionStorage.removeItem('wip_package')
        setNewName(name || suggestName(ex))
        setNewExercises(ex)
        if (Array.isArray(categoryIds)) setNewCategoryIds(categoryIds)
        setShowNew(true)
      } catch {}
    }
  }, [])

  useEffect(() => {
    if (activeCat !== null && selected && !(selected.category_ids ?? []).includes(activeCat)) {
      setSelectedId(visibleActive[0]?.id ?? null)
    }
  }, [activeCat])

  function closeNew() {
    setShowNew(false)
    setNewName('')
    setNewExercises([])
    setNewCategoryIds([])
  }

  function goToLibrary(name: string, exercises: ExerciseRow[], categoryIds?: string[]) {
    sessionStorage.setItem('wip_package', JSON.stringify({ name, exercises, categoryIds: categoryIds ?? newCategoryIds }))
    router.push('/test-exercises?addto=1')
  }

  async function saveCategoryLinks(pkgId: string, catIds: string[]) {
    await supabase.from('workout_package_categories').delete().eq('package_id', pkgId)
    if (catIds.length > 0) {
      await supabase.from('workout_package_categories').insert(catIds.map(category_id => ({ package_id: pkgId, category_id })))
    }
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
      const valid = newExercises
        .filter(e => e.name.trim() && Number(e.value) > 0)
        .map((e, i) => ({ package_id: pkg.id, name: e.name.trim(), reps: Number(e.value), unit: e.unit, order: i }))
      await Promise.all([
        valid.length > 0 ? supabase.from('exercises').insert(valid) : Promise.resolve(),
        saveCategoryLinks(pkg.id, newCategoryIds),
      ])
      const optimistic: Package = {
        id: pkg.id,
        name: newName.trim(),
        is_active: true,
        category_ids: [...newCategoryIds],
        exercises: valid.map((e, i) => ({ id: `tmp-${i}`, name: e.name, reps: e.reps, unit: e.unit, order: i })),
      }
      setPackages(prev => [optimistic, ...prev])
      setSelectedId(pkg.id)
    }
    setLoading(false)
    closeNew()
    router.refresh()
  }

  function startEdit(pkg: Package) {
    setEditName(pkg.name)
    setEditCategoryIds([...(pkg.category_ids ?? [])])
    setEditExercises(pkg.exercises.sort((a, b) => a.order - b.order).map(e => ({
      name: e.name, value: String(e.reps), unit: (e.unit as 'reps' | 'sek') || 'reps',
    })))
    setEditing(true)
  }

  async function saveEdit(pkgId: string) {
    if (!editName.trim()) return
    setLoading(true)
    await supabase.from('workout_packages').update({ name: editName.trim() }).eq('id', pkgId)
    await supabase.from('exercises').delete().eq('package_id', pkgId)
    const valid = editExercises
      .filter(e => e.name.trim() && Number(e.value) > 0)
      .map((e, i) => ({ package_id: pkgId, name: e.name.trim(), reps: Number(e.value), unit: e.unit, order: i }))
    await Promise.all([
      valid.length > 0 ? supabase.from('exercises').insert(valid) : Promise.resolve(),
      saveCategoryLinks(pkgId, editCategoryIds),
    ])
    setPackages(prev => prev.map(p => p.id === pkgId
      ? { ...p, name: editName.trim(), category_ids: [...editCategoryIds], exercises: valid.map((e, i) => ({ id: `tmp-${i}`, name: e.name, reps: e.reps, unit: e.unit, order: e.order })) }
      : p
    ))
    setLoading(false)
    setEditing(false)
    router.refresh()
  }

  async function archivePackage(id: string) {
    await supabase.from('workout_packages').update({ is_active: false }).eq('id', id)
    if (selectedId === id) setSelectedId(visibleActive.find(p => p.id !== id)?.id ?? null)
    router.refresh()
  }

  async function restorePackage(id: string) {
    await supabase.from('workout_packages').update({ is_active: true }).eq('id', id)
    router.refresh()
  }

  async function deletePackage(id: string) {
    await supabase.from('workout_packages').delete().eq('id', id)
    router.refresh()
  }

  function openSaveToLibrary(pkg: Package) {
    setSaveToLibraryFor(pkg)
    setSaveSelected(new Set(pkg.exercises.map(e => e.id)))
  }

  async function confirmSaveToLibrary() {
    if (!saveToLibraryFor) return
    setSavingToLibrary(true)
    const toSave = saveToLibraryFor.exercises
      .filter(e => saveSelected.has(e.id))
      .map(e => ({ user_id: userId, name: e.name, unit: e.unit || 'reps', suggested_value: e.reps }))
    if (toSave.length > 0) await supabase.from('user_exercises').insert(toSave)
    setSavingToLibrary(false)
    setSaveToLibraryFor(null)
  }

  // Kategori-administrasjon
  async function addCategory() {
    if (!newCatName.trim()) return
    const { data } = await supabase
      .from('package_categories')
      .insert({ user_id: userId, name: newCatName.trim() })
      .select('id, name')
      .single()
    if (data) setCategories(prev => [...prev, data as Category])
    setNewCatName('')
  }

  async function saveEditCat() {
    if (!editingCat || !editCatName.trim()) return
    await supabase.from('package_categories').update({ name: editCatName.trim() }).eq('id', editingCat.id)
    setCategories(prev => prev.map(c => c.id === editingCat.id ? { ...c, name: editCatName.trim() } : c))
    setEditingCat(null)
  }

  async function deleteCategory(id: string) {
    await supabase.from('package_categories').delete().eq('id', id)
    setCategories(prev => prev.filter(c => c.id !== id))
    if (activeCat === id) setActiveCat(null)
  }


  return (
    <div className="space-y-5">

      {/* Kategori-filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 items-center">
        <button
          onClick={() => setActiveCat(null)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${activeCat === null ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
        >Alle</button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCat(activeCat === c.id ? null : c.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${activeCat === c.id ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >{c.name}</button>
        ))}
        <button
          onClick={() => setShowCatManager(true)}
          className="shrink-0 text-gray-500 hover:text-gray-300 text-lg leading-none px-1 transition"
          title="Administrer kategorier"
        >⚙</button>
      </div>

      {/* Pakke-velger — "+ Ny" først */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => goToLibrary('', [], activeCat ? [activeCat] : [])}
          className="shrink-0 px-4 py-2.5 rounded-2xl text-sm font-semibold bg-gray-800 text-orange-400 hover:text-orange-300 transition border-2 border-dashed border-gray-700"
        >
          + Ny
        </button>
        {visibleActive.map(pkg => (
          <button
            key={pkg.id}
            onClick={() => setSelectedId(pkg.id)}
            className={`shrink-0 px-4 py-2.5 rounded-2xl text-sm font-semibold transition text-left ${
              selectedId === pkg.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            <p className="leading-tight">{pkg.name}</p>
            <p className={`text-xs font-normal mt-0.5 ${selectedId === pkg.id ? 'text-orange-100' : 'text-gray-500'}`}>
              {pkg.exercises.length} øvelser
              {(pkg.category_ids ?? []).length > 0 && activeCat === null && (
                <span className={`ml-1 ${selectedId === pkg.id ? 'text-orange-200' : 'text-gray-600'}`}>
                  · {(pkg.category_ids ?? []).map(id => categories.find(c => c.id === id)?.name).filter(Boolean).join(', ')}
                </span>
              )}
            </p>
          </button>
        ))}
      </div>

      {/* Tom kategori-melding */}
      {activeCat !== null && visibleActive.length === 0 && !showNew && (
        <div className="bg-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">Ingen pakker i denne kategorien</p>
          <button onClick={() => goToLibrary('', [], activeCat ? [activeCat] : [])} className="text-orange-400 text-sm font-semibold mt-2">+ Lag pakke her</button>
        </div>
      )}

      {active.length === 0 && !showNew && (
        <div className="bg-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">Ingen pakker ennå</p>
          <button onClick={() => goToLibrary('', [])} className="text-orange-400 text-sm font-semibold mt-2">+ Gå til øvelsesbibliotek</button>
        </div>
      )}

      {/* Valgt pakke */}
      {selected && !editing && (
        <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg">{selected.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-gray-400">{totalLabel(selected.exercises)}</p>
                {(selected.category_ids ?? []).map(id => categories.find(c => c.id === id)).filter(Boolean).map(c => (
                  <span key={c!.id} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{c!.name}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => startEdit(selected)} className="text-sm text-gray-300 hover:text-white transition">Rediger</button>
              <button onClick={() => archivePackage(selected.id)} className="text-sm text-gray-500 hover:text-red-400 transition">Arkiver</button>
            </div>
          </div>
          <div className="space-y-2">
            {selected.exercises.sort((a, b) => a.order - b.order).map(ex => (
              <div key={ex.id} className="flex items-center justify-between py-1 border-b border-gray-700/50 last:border-0">
                <span className="text-sm text-gray-200">{ex.name}</span>
                <span className="text-sm text-orange-400 font-semibold">{ex.reps} {ex.unit === 'sek' ? 'sek' : 'reps'}</span>
              </div>
            ))}
          </div>
          {selected.exercises.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-2">Ingen øvelser ennå — trykk Rediger</p>
          )}
          {selected.exercises.length > 0 && (
            <button onClick={() => openSaveToLibrary(selected)} className="text-xs text-gray-500 hover:text-orange-400 transition pt-1">
              Lagre øvelser i biblioteket →
            </button>
          )}
        </div>
      )}

      {/* Øvelsesbibliotek-lenke + Arkiv */}
      <div className="space-y-3">
        <button onClick={() => router.push('/test-exercises')} className="flex items-center gap-1.5 text-orange-400 text-sm font-semibold hover:text-orange-300 transition">
          Øvelsesbibliotek →
        </button>
        {archived.length > 0 && (
          <div>
            <button onClick={() => setShowArchive(v => !v)} className="flex items-center gap-2 text-white text-sm hover:text-gray-300 transition">
              <span className={`transition-transform ${showArchive ? 'rotate-90' : ''}`}>▶</span>
              Arkiv ({archived.length})
            </button>
            {showArchive && (
              <div className="mt-2 space-y-2">
                {archived.map(pkg => (
                  <div key={pkg.id} className="bg-gray-800/50 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 font-medium">{pkg.name}</p>
                      <p className="text-xs text-gray-600">{pkg.exercises.length} øvelser</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => restorePackage(pkg.id)} className="text-xs text-orange-400 hover:text-orange-300 transition">Gjenopprett</button>
                      <button onClick={() => deletePackage(pkg.id)} className="text-xs text-gray-600 hover:text-red-400 transition">Slett</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Kategoriadministrasjon-modal */}
      {showCatManager && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50" onClick={() => setShowCatManager(false)}>
          <div className="bg-gray-900 rounded-t-3xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-white font-bold">Kategorier</h2>
              <button onClick={() => setShowCatManager(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              {categories.map(c => (
                <div key={c.id} className="flex items-center gap-2">
                  {editingCat?.id === c.id ? (
                    <>
                      <input
                        autoFocus
                        value={editCatName}
                        onChange={e => setEditCatName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && saveEditCat()}
                        className="flex-1 bg-gray-700 text-white rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button onClick={saveEditCat} className="text-orange-400 text-sm font-semibold px-2">Lagre</button>
                      <button onClick={() => setEditingCat(null)} className="text-gray-500 text-sm px-1">✕</button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-white text-sm">{c.name}</span>
                      <button onClick={() => { setEditingCat(c); setEditCatName(c.name) }} className="text-gray-500 hover:text-gray-300 text-sm px-2 transition">✎</button>
                      <button onClick={() => deleteCategory(c.id)} className="text-gray-600 hover:text-red-400 text-sm px-1 transition">×</button>
                    </>
                  )}
                </div>
              ))}
              <div className="flex gap-2 pt-2 border-t border-gray-800">
                <input
                  type="text"
                  placeholder="Ny kategori..."
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCategory()}
                  className="flex-1 bg-gray-700 text-white rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={addCategory}
                  disabled={!newCatName.trim()}
                  className="bg-orange-500 disabled:opacity-50 text-white rounded-xl px-4 py-2 text-sm font-semibold"
                >+ Legg til</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lagre i bibliotek-modal */}
      {saveToLibraryFor && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50" onClick={() => setSaveToLibraryFor(null)}>
          <div className="bg-gray-900 rounded-t-3xl max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-white font-bold">Lagre i biblioteket</h2>
              <button onClick={() => setSaveToLibraryFor(null)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-gray-400 text-sm">Velg øvelser du vil lagre under <span className="text-orange-400 font-semibold">Egne</span>:</p>
              <div className="space-y-2">
                {saveToLibraryFor.exercises.sort((a, b) => a.order - b.order).map(ex => {
                  const checked = saveSelected.has(ex.id)
                  return (
                    <button
                      key={ex.id}
                      onClick={() => setSaveSelected(prev => { const next = new Set(prev); checked ? next.delete(ex.id) : next.add(ex.id); return next })}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${checked ? 'bg-orange-500/10 border border-orange-500/40' : 'bg-gray-800'}`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${checked ? 'bg-orange-500 border-orange-500' : 'border-gray-500'}`}>
                        {checked && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <span className="flex-1 text-left text-sm text-white">{ex.name}</span>
                      <span className="text-orange-400 text-xs font-semibold">{ex.reps} {ex.unit === 'sek' ? 'sek' : 'reps'}</span>
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-2 pb-2 pt-1">
                <button onClick={() => setSaveToLibraryFor(null)} className="flex-1 bg-gray-700 text-white rounded-xl py-2.5 text-sm">Avbryt</button>
                <button
                  onClick={confirmSaveToLibrary}
                  disabled={savingToLibrary || saveSelected.size === 0}
                  className="flex-1 bg-orange-500 disabled:opacity-50 text-white rounded-xl py-2.5 text-sm font-semibold"
                >{savingToLibrary ? 'Lagrer...' : `Lagre ${saveSelected.size} øvelse${saveSelected.size !== 1 ? 'r' : ''}`}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rediger-modal */}
      {editing && selected && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50" onClick={() => setEditing(false)}>
          <div className="bg-gray-900 rounded-t-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-white font-bold">Rediger pakke</h2>
              <button onClick={() => setEditing(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <CategoryPicker value={editCategoryIds} onChange={setEditCategoryIds} categories={categories} />
              <div className="space-y-2">
                <p className="text-xs text-gray-400">Øvelser</p>
                {editExercises.map((ex, i) => (
                  <ExerciseRowEditor
                    key={i} ex={ex} i={i} userId={userId}
                    onChange={(i, f, v) => setEditExercises(prev => updateRow(prev, i, f, v))}
                    onRemove={i => setEditExercises(prev => prev.filter((_, j) => j !== i))}
                  />
                ))}
                <button onClick={() => goToLibrary(editName, editExercises, editCategoryIds)} className="text-orange-500 text-sm">+ Legg til fra bibliotek</button>
              </div>
              <div className="flex gap-2 pb-2">
                <button onClick={() => setEditing(false)} className="flex-1 bg-gray-700 text-white rounded-xl py-2 text-sm">Avbryt</button>
                <button
                  onClick={() => saveEdit(selected.id)}
                  disabled={loading || !editName.trim()}
                  className="flex-1 bg-orange-500 disabled:opacity-50 text-white rounded-xl py-2 text-sm font-semibold"
                >{loading ? 'Lagrer...' : 'Lagre'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ny pakke-modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50" onClick={closeNew}>
          <div className="bg-gray-900 rounded-t-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-white font-bold">Ny pakke</h2>
              <button onClick={closeNew} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <input
                autoFocus
                type="text"
                placeholder="Navn på pakke"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <CategoryPicker value={newCategoryIds} onChange={setNewCategoryIds} categories={categories} />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Øvelser</p>
                  {(() => {
                    const total = newExercises.filter(e => e.name && Number(e.value) > 0).reduce((s, e) => s + Number(e.value), 0)
                    return total > 0 ? <p className="text-xs text-orange-400 font-medium">Totalt: {total}</p> : null
                  })()}
                </div>
                {newExercises.map((ex, i) => (
                  <ExerciseRowEditor
                    key={i} ex={ex} i={i} userId={userId}
                    onChange={(i, f, v) => setNewExercises(prev => updateRow(prev, i, f, v))}
                    onRemove={i => setNewExercises(prev => prev.filter((_, j) => j !== i))}
                  />
                ))}
                <button onClick={() => goToLibrary(newName, newExercises)} className="text-orange-400 text-sm">+ Legg til flere fra biblioteket</button>
              </div>
              <div className="flex gap-2 pb-2">
                <button onClick={closeNew} className="flex-1 bg-gray-700 text-white rounded-xl py-2 text-sm">Avbryt</button>
                <button
                  onClick={createPackage}
                  disabled={loading || !newName.trim()}
                  className="flex-1 bg-orange-500 disabled:opacity-50 text-white rounded-xl py-2 text-sm font-semibold"
                >{loading ? 'Lagrer...' : 'Lagre'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
