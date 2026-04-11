'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import CalendarView from './CalendarView'
import type { DayLog } from './DashboardClient'

type Package = { id: string; name: string }

type Props = {
  dayLogs: DayLog[]
  onLogChange: (logs: DayLog[]) => void
  dayCounts: Record<string, number>
  packages: Package[]
  userId: string
}

function toLocalDateStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export default function TrainTodayButton({ dayLogs, onLogChange, dayCounts, packages, userId }: Props) {
  const today = toLocalDateStr(new Date())
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(packages[0] ?? null)
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createClient()

  const isToday = selectedDate === today
  const isFuture = selectedDate > today

  const logsForDay = dayLogs.filter(l => l.date === selectedDate)
  const availablePackages = packages
  const canAdd = !isFuture && packages.length > 0

  const activePackage = selectedPackage && packages.find(p => p.id === selectedPackage.id)
    ? selectedPackage
    : packages[0] ?? null

  const labelDate = isToday
    ? 'I dag'
    : new Date(selectedDate + 'T12:00:00').toLocaleDateString('nb-NO', {
        weekday: 'long', day: 'numeric', month: 'long',
      })

  async function addLog() {
    if (!activePackage || isFuture) return
    setLoading(true)

    const optimisticLog: DayLog = {
      id: `optimistic-${Date.now()}`,
      date: selectedDate,
      packageId: activePackage.id,
      packageName: activePackage.name,
    }
    onLogChange([...dayLogs, optimisticLog])

    const { data, error } = await supabase.from('daily_logs').insert({
      user_id: userId,
      package_id: activePackage.id,
      logged_date: selectedDate,
    }).select('id').single()

    if (error) {
      console.error('[TrainTodayButton] Insert error:', error)
      onLogChange(dayLogs)
    } else if (data) {
      // Replace optimistic entry with real id
      onLogChange([...dayLogs, { ...optimisticLog, id: data.id as string }])
    }

    setLoading(false)
  }

  async function deleteLog(log: DayLog) {
    setDeletingId(log.id)
    const prev = dayLogs
    onLogChange(dayLogs.filter(l => l.id !== log.id))

    const { error } = await supabase.from('daily_logs')
      .delete()
      .eq('id', log.id)
      .eq('user_id', userId)

    if (error) {
      console.error('[TrainTodayButton] Delete error:', error)
      onLogChange(prev)
    }
    setDeletingId(null)
  }

  return (
    <div className="space-y-3">
      <CalendarView
        dayCounts={dayCounts}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <p className="text-center text-sm text-gray-400 capitalize">{labelDate}</p>

      {packages.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-4 text-center">
          <p className="text-gray-400 text-sm">Du har ingen treningspakker ennå.</p>
          <a href="/workouts" className="text-orange-500 font-semibold text-sm mt-1 block">
            Opprett din første pakke →
          </a>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-2xl p-4 space-y-3">

          {/* Registered workouts for selected day */}
          {logsForDay.length > 0 && (
            <div className="space-y-2">
              {logsForDay.map(log => (
                <div key={log.id} className="flex items-center justify-between bg-gray-700/50 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm text-white font-medium">{log.packageName}</span>
                  </div>
                  <button
                    onClick={() => deleteLog(log)}
                    disabled={deletingId === log.id}
                    className="text-gray-500 text-xs hover:text-red-400 transition disabled:opacity-40"
                  >
                    {deletingId === log.id ? '...' : 'Angre'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add another workout */}
          {canAdd && (
            <>
              {availablePackages.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {availablePackages.map(pkg => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`flex-1 min-w-0 px-3 py-2 rounded-xl text-sm font-medium transition truncate ${
                        activePackage?.id === pkg.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-400 hover:text-white'
                      }`}
                    >
                      {pkg.name}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={addLog}
                disabled={loading || !activePackage}
                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:opacity-50 text-white font-bold text-lg rounded-xl py-4 transition"
              >
                {loading
                  ? 'Registrerer...'
                  : logsForDay.length > 0
                  ? `➕ Legg til — ${activePackage?.name}`
                  : `💪 Registrer — ${activePackage?.name}`}
              </button>
            </>
          )}

          {/* Future date notice */}
          {isFuture && logsForDay.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-2">
              Kan ikke registrere fremtidige datoer
            </p>
          )}


          {/* Nothing logged, past day */}
          {logsForDay.length === 0 && !isFuture && !isToday && (
            <p className="text-center text-gray-500 text-xs">Ingen trening registrert</p>
          )}
        </div>
      )}
    </div>
  )
}
