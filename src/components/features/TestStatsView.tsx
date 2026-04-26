'use client'

import { TestSparkline, type TestType, type TestResult } from './TestClient'

type Props = {
  testTypes: TestType[]
  testResults: TestResult[]
}

export default function TestStatsView({ testTypes, testResults }: Props) {
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

  const typesWithResults = testTypes.filter(t =>
    testResults.some(r => r.testTypeId === t.id)
  )

  if (typesWithResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-3 text-center">
        <p className="text-4xl">📏</p>
        <p className="text-gray-300">Ingen testresultater ennå.</p>
        <a href="/test" className="text-orange-500 font-semibold text-sm">
          Gå til Tester →
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {typesWithResults.map(t => {
        const typeResults = testResults
          .filter(r => r.testTypeId === t.id)
          .sort((a, b) => a.testedDate.localeCompare(b.testedDate))


        const values = typeResults.map(r => r.result)
        const best = t.higherIsBetter
          ? Math.max(...values)
          : Math.min(...values)
        const first = values[0]
        const last = values[values.length - 1]
        const diffPct = typeResults.length >= 2
          ? ((last - first) / first) * 100
          : null
        const improving = diffPct === null
          ? null
          : t.higherIsBetter ? diffPct >= 0 : diffPct <= 0

        return (
          <div key={t.id} className="bg-gray-800 rounded-2xl p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-xs text-gray-500">{typeResults.length} tester</p>
              </div>
              {diffPct !== null && (
                <span className={`text-sm font-bold ${improving ? 'text-green-400' : 'text-red-400'}`}>
                  {diffPct >= 0 ? '+' : ''}{diffPct.toFixed(0)}%
                </span>
              )}
            </div>

            {/* Best + first/last */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-700/50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-white font-medium">Beste</p>
                <p className="text-green-400 font-bold text-sm">{formatResult(best, t.unit)}</p>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-300">Første</p>
                <p className="text-white font-bold text-sm">{formatResult(first, t.unit)}</p>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-300">Siste</p>
                <p className="text-white font-bold text-sm">{formatResult(last, t.unit)}</p>
              </div>
            </div>

            {/* Sparkline */}
            {values.length >= 2 && (
              <div>
                <TestSparkline
                  values={values}
                  labels={typeResults.map(r => formatResult(r.result, t.unit))}
                  higherIsBetter={t.higherIsBetter}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatDate(typeResults[0].testedDate)}</span>
                  <span>{formatDate(typeResults[typeResults.length - 1].testedDate)}</span>
                </div>
              </div>
            )}

            {/* All results */}
            <div className="space-y-1 pt-1">
              {[...typeResults].reverse().map((r, i) => (
                <div key={r.id} className="flex justify-between items-center py-1 border-b border-gray-700/40 last:border-0">
                  <div className="flex items-center gap-2">
                    {i === 0 && <span className="text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded">siste</span>}
                    <span className="text-white text-sm">{formatResult(r.result, t.unit)}</span>
                    {r.notes && <span className="text-gray-500 text-xs">— {r.notes}</span>}
                  </div>
                  <span className="text-gray-300 text-xs">{formatDate(r.testedDate)}</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
      <a href="/test" className="block text-center text-orange-400 hover:text-orange-300 text-sm font-medium py-2 transition">
        Legg til testresultat →
      </a>
    </div>
  )
}
