'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type TestType = {
  id: string
  name: string
  unit: string
  higherIsBetter: boolean
  isOwn: boolean
}

export type TestResult = {
  id: string
  testTypeId: string
  result: number
  testedDate: string
  notes: string | null
}

type Props = {
  initialTestTypes: TestType[]
  initialTestResults: TestResult[]
  userId: string
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function TestSparkline({
  values,
  labels,
  higherIsBetter,
}: {
  values: number[]
  labels?: string[]
  higherIsBetter: boolean
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  if (values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const W = 280
  const H = 56
  const pad = 6
  const tooltipH = 20
  const tooltipPad = 6

  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (W - 2 * pad)
    const y = H - pad - ((v - min) / range) * (H - 2 * pad)
    return [x, y] as [number, number]
  })

  const last = values[values.length - 1]
  const first = values[0]
  const improving = higherIsBetter ? last >= first : last <= first
  const color = improving ? '#4ade80' : '#f87171'

  function tooltip(i: number) {
    const [x, y] = pts[i]
    const label = labels?.[i] ?? String(values[i])
    const charW = 7
    const boxW = label.length * charW + tooltipPad * 2
    const boxX = Math.min(Math.max(x - boxW / 2, 0), W - boxW)
    const boxY = y - tooltipH - 6
    const textY = boxY + tooltipH / 2 + 4.5
    return (
      <g key={`tip-${i}`} style={{ pointerEvents: 'none' }}>
        <rect x={boxX} y={boxY} width={boxW} height={tooltipH} rx="4" fill="#1f2937" opacity="0.95" />
        <text x={boxX + boxW / 2} y={textY} textAnchor="middle" fontSize="10" fill="white" fontWeight="600">
          {label}
        </text>
      </g>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-14"
      onMouseLeave={() => setActiveIdx(null)}
    >
      <polyline
        points={pts.map(([x, y]) => `${x},${y}`).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={activeIdx === i ? 5 : 3.5}
          fill={color}
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setActiveIdx(i)}
          onClick={() => setActiveIdx(prev => prev === i ? null : i)}
        />
      ))}
      {activeIdx !== null && tooltip(activeIdx)}
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  )
}

export default function TestClient({ initialTestTypes, initialTestResults, userId }: Props) {
  const [types, setTypes] = useState(initialTestTypes)
  const [results, setResults] = useState(initialTestResults)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showInfoId, setShowInfoId] = useState<string | null>(null)
  const [addingToId, setAddingToId] = useState<string | null>(null)
  const [formResult, setFormResult] = useState('')
  const [formDate, setFormDate] = useState(todayStr())
  const [formNotes, setFormNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customUnit, setCustomUnit] = useState('reps')
  const [customHigher, setCustomHigher] = useState(true)
  const [customLoading, setCustomLoading] = useState(false)
  const supabase = createClient()

  function toggleExpand(id: string) {
    setExpandedId(prev => prev === id ? null : id)
    setAddingToId(null)
    resetForm()
  }

  function openAddForm(id: string) {
    setAddingToId(id)
    setExpandedId(id)
    resetForm()
  }

  function resetForm() {
    setFormResult('')
    setFormDate(todayStr())
    setFormNotes('')
  }

  async function addResult(testType: TestType) {
    const val = parseFloat(formResult)
    if (!val || val <= 0) return
    setLoading(true)

    const optimistic: TestResult = {
      id: `opt-${Date.now()}`,
      testTypeId: testType.id,
      result: val,
      testedDate: formDate,
      notes: formNotes.trim() || null,
    }
    setResults(prev => [...prev, optimistic].sort((a, b) => a.testedDate.localeCompare(b.testedDate)))

    const { data, error } = await supabase
      .from('test_results')
      .insert({
        user_id: userId,
        test_type_id: testType.id,
        result: val,
        tested_date: formDate,
        notes: formNotes.trim() || null,
      })
      .select('id')
      .single()

    if (error) {
      console.error('[TestClient] Insert error:', error.message)
      setResults(prev => prev.filter(r => r.id !== optimistic.id))
    } else if (data) {
      setResults(prev =>
        prev.map(r => r.id === optimistic.id ? { ...optimistic, id: data.id as string } : r)
          .sort((a, b) => a.testedDate.localeCompare(b.testedDate))
      )
    }

    setAddingToId(null)
    resetForm()
    setLoading(false)
  }

  async function deleteResult(id: string) {
    setDeletingId(id)
    const prev = results
    setResults(r => r.filter(x => x.id !== id))
    const { error } = await supabase
      .from('test_results')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
    if (error) {
      console.error('[TestClient] Delete error:', error.message)
      setResults(prev)
    }
    setDeletingId(null)
  }

  async function createCustomType() {
    if (!customName.trim()) return
    setCustomLoading(true)

    const optimistic: TestType = {
      id: `opt-${Date.now()}`,
      name: customName.trim(),
      unit: customUnit,
      higherIsBetter: customHigher,
      isOwn: true,
    }
    setTypes(prev => [...prev, optimistic])

    const { data, error } = await supabase
      .from('test_types')
      .insert({ user_id: userId, name: customName.trim(), unit: customUnit, higher_is_better: customHigher })
      .select('id')
      .single()

    if (error) {
      console.error('[TestClient] Create type error:', error.message)
      setTypes(prev => prev.filter(t => t.id !== optimistic.id))
    } else if (data) {
      setTypes(prev =>
        prev.map(t => t.id === optimistic.id ? { ...optimistic, id: data.id as string } : t)
      )
    }

    setCustomName('')
    setCustomUnit('reps')
    setCustomHigher(true)
    setShowCustomForm(false)
    setCustomLoading(false)
  }

  async function deleteCustomType(id: string) {
    setTypes(prev => prev.filter(t => t.id !== id))
    setResults(prev => prev.filter(r => r.testTypeId !== id))
    await supabase.from('test_types').delete().eq('id', id).eq('user_id', userId)
  }

  function formatResult(val: number, unit: string) {
    if (unit === 'sekunder') {
      if (val >= 60) {
        const m = Math.floor(val / 60)
        const s = Math.round(val % 60)
        return s > 0 ? `${m}m ${s}s` : `${m}m`
      }
      return `${val}s`
    }
    return `${val} ${unit}`
  }

  function formatDate(str: string) {
    return new Date(str + 'T12:00:00').toLocaleDateString('nb-NO', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  return (
    <div className="space-y-3">
      {types.map(t => {
        const typeResults = results
          .filter(r => r.testTypeId === t.id)
          .sort((a, b) => a.testedDate.localeCompare(b.testedDate))
        const latest = typeResults[typeResults.length - 1]
        const best = typeResults.length
          ? (t.higherIsBetter
            ? typeResults.reduce((a, b) => b.result > a.result ? b : a)
            : typeResults.reduce((a, b) => b.result < a.result ? b : a))
          : null
        const values = typeResults.map(r => r.result)
        const isExpanded = expandedId === t.id
        const isAdding = addingToId === t.id

        let progressLabel: string | null = null
        if (typeResults.length >= 2) {
          const first = typeResults[0].result
          const last = typeResults[typeResults.length - 1].result
          const diff = ((last - first) / first) * 100
          const sign = diff >= 0 ? '+' : ''
          progressLabel = `${sign}${diff.toFixed(0)}%`
        }

        return (
          <div key={t.id} className="bg-gray-800 rounded-2xl overflow-hidden">
            {/* Test header */}
            <div
              onClick={() => toggleExpand(t.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && toggleExpand(t.id)}
              className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
            >
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {latest
                    ? `Sist: ${formatResult(latest.result, t.unit)} — ${formatDate(latest.testedDate)}`
                    : 'Ingen resultater ennå'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {progressLabel && (
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-bold ${
                      (t.higherIsBetter ? parseFloat(progressLabel) >= 0 : parseFloat(progressLabel) <= 0)
                        ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {progressLabel}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); setShowInfoId(prev => prev === t.id ? null : t.id) }}
                      className="text-gray-500 hover:text-gray-300 transition"
                      aria-label="Hva betyr prosenten?"
                    >
                      <InfoIcon />
                    </button>
                  </div>
                )}
                <span className="text-gray-500 text-sm">{isExpanded ? '▲' : '▼'}</span>
              </div>
            </div>

            {/* Info-boks */}
            {showInfoId === t.id && (
              <div className="mx-4 mb-3 bg-gray-700/60 rounded-xl px-3 py-2 text-xs text-gray-300">
                Viser fremgang fra din <span className="text-white font-medium">første</span> til din <span className="text-white font-medium">siste</span> registrerte test.
                {t.higherIsBetter
                  ? ' Høyere er bedre — grønn betyr fremgang.'
                  : ' Lavere er bedre — grønn betyr fremgang.'}
              </div>
            )}

            {/* Expanded */}
            {isExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-700/50">

                {/* Sparkline */}
                {values.length >= 2 && (
                  <div className="pt-3">
                    <TestSparkline
                      values={values}
                      labels={typeResults.map(r => formatResult(r.result, t.unit))}
                      higherIsBetter={t.higherIsBetter}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1 px-0.5">
                      <span>{formatDate(typeResults[0].testedDate)}</span>
                      <span>{formatDate(typeResults[typeResults.length - 1].testedDate)}</span>
                    </div>
                  </div>
                )}

                {/* Best + count */}
                {best && (
                  <div className="flex gap-3">
                    <div className="flex-1 bg-gray-700/50 rounded-xl p-3">
                      <p className="text-xs text-gray-400">Beste</p>
                      <p className="text-white font-bold">{formatResult(best.result, t.unit)}</p>
                    </div>
                    <div className="flex-1 bg-gray-700/50 rounded-xl p-3">
                      <p className="text-xs text-gray-400">Antall tester</p>
                      <p className="text-white font-bold">{typeResults.length}</p>
                    </div>
                  </div>
                )}

                {/* History list */}
                {typeResults.length > 0 && (
                  <div className="space-y-1">
                    {[...typeResults].reverse().map(r => (
                      <div key={r.id} className="flex items-center justify-between py-1.5 px-1 border-b border-gray-700/40 last:border-0">
                        <div>
                          <span className="text-white text-sm font-medium">{formatResult(r.result, t.unit)}</span>
                          {r.notes && <p className="text-gray-500 text-xs">{r.notes}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-xs">{formatDate(r.testedDate)}</span>
                          <button
                            onClick={() => deleteResult(r.id)}
                            disabled={deletingId === r.id}
                            className="text-gray-400 hover:text-red-400 text-xs transition disabled:opacity-40 px-2 py-1 rounded-lg hover:bg-red-400/10"
                          >
                            {deletingId === r.id ? '...' : 'Slett'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add result form */}
                {isAdding ? (
                  <div className="space-y-2 pt-1">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-xs text-gray-400">Resultat ({t.unit})</label>
                        <input
                          type="number"
                          inputMode="decimal"
                          placeholder="0"
                          value={formResult}
                          onChange={e => setFormResult(e.target.value)}
                          className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                          autoFocus
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-400">Dato</label>
                        <input
                          type="date"
                          value={formDate}
                          max={todayStr()}
                          onChange={e => setFormDate(e.target.value)}
                          className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Notat (valgfritt)"
                      value={formNotes}
                      onChange={e => setFormNotes(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => addResult(t)}
                        disabled={loading || !formResult}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-2.5 text-sm transition"
                      >
                        {loading ? 'Lagrer...' : 'Lagre resultat'}
                      </button>
                      <button
                        onClick={() => setAddingToId(null)}
                        className="px-4 bg-gray-700 text-gray-300 rounded-xl text-sm"
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => openAddForm(t.id)}
                      className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 font-semibold rounded-xl px-4 py-2 text-sm transition"
                    >
                      + Ta test
                    </button>
                    {t.isOwn && (
                      <button
                        onClick={() => deleteCustomType(t.id)}
                        className="text-gray-600 hover:text-red-400 text-xs transition"
                      >
                        Slett test
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Quick "Ta test" button when collapsed and has no results */}
            {!isExpanded && typeResults.length === 0 && (
              <div className="px-4 pb-3">
                <button
                  onClick={() => openAddForm(t.id)}
                  className="w-full bg-gray-700/60 hover:bg-gray-700 text-gray-300 text-sm rounded-xl py-2 transition"
                >
                  Ta første test →
                </button>
              </div>
            )}
          </div>
        )
      })}

      {/* Add custom test type */}
      {showCustomForm ? (
        <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-300">Ny egendefinert test</p>
          <input
            type="text"
            placeholder="Navn (f.eks. Dips)"
            value={customName}
            onChange={e => setCustomName(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            autoFocus
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Enhet</label>
              <select
                value={customUnit}
                onChange={e => setCustomUnit(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="reps">reps</option>
                <option value="sekunder">sekunder</option>
                <option value="kg">kg</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Høyere = bedre?</label>
              <button
                onClick={() => setCustomHigher(h => !h)}
                className={`w-full rounded-xl px-3 py-2 text-sm font-medium transition ${
                  customHigher ? 'bg-green-700/50 text-green-300' : 'bg-red-900/40 text-red-300'
                }`}
              >
                {customHigher ? 'Ja' : 'Nei'}
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={createCustomType}
              disabled={customLoading || !customName.trim()}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-2.5 text-sm transition"
            >
              {customLoading ? 'Oppretter...' : 'Opprett test'}
            </button>
            <button
              onClick={() => setShowCustomForm(false)}
              className="px-4 bg-gray-700 text-gray-300 rounded-xl text-sm"
            >
              Avbryt
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCustomForm(true)}
          className="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-2xl py-3 text-sm transition"
        >
          + Legg til egendefinert test
        </button>
      )}
    </div>
  )
}
