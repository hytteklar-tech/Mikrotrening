'use client'

import { useState } from 'react'
import ExercisePicker from './ExercisePicker'

export type ExerciseRow = { name: string; value: string; unit: 'reps' | 'sek' }

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

export default function ExerciseRowEditor({
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
