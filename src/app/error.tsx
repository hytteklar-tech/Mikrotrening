'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <p className="text-6xl">⚠️</p>
        <h1 className="text-2xl font-bold">Noe gikk galt</h1>
        <p className="text-gray-400 text-sm">En uventet feil oppstod. Prøv igjen.</p>
        <button
          onClick={reset}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl px-6 py-3 transition"
        >
          Prøv igjen
        </button>
      </div>
    </div>
  )
}
