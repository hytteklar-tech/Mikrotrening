'use client'

import { useState } from 'react'

export default function SentryTestPage() {
  const [crash, setCrash] = useState(false)

  if (crash) {
    throw new Error('Sentry test-feil fra mikrotrening.no')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <p className="text-4xl">🧪</p>
        <h1 className="text-xl font-bold">Sentry-test</h1>
        <button
          onClick={() => setCrash(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-6 py-3 transition"
        >
          Trigger feil
        </button>
      </div>
    </div>
  )
}
