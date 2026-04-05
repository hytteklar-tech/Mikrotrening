'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function saveName() {
    if (!name.trim()) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('users').update({ display_name: name.trim() }).eq('id', user.id)
    }
    setLoading(false)
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-3">💪</div>
          <h1 className="text-2xl font-bold text-white">Velkommen!</h1>
          <p className="text-gray-400 mt-1">Hva skal vi kalle deg?</p>
        </div>
        <input
          type="text"
          placeholder="Ditt navn"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && saveName()}
          className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
          autoFocus
        />
        <button
          onClick={saveName}
          disabled={loading || !name.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
        >
          {loading ? 'Lagrer...' : 'Start!'}
        </button>
      </div>
    </div>
  )
}
