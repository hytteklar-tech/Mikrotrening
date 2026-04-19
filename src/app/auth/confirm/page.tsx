'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/ui/Logo'

function ConfirmForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  useEffect(() => {
    if (!token_hash || !type) {
      router.replace('/login?error=auth')
    } else {
      setReady(true)
    }
  }, [token_hash, type, router])

  async function handleConfirm() {
    if (!token_hash || !type) return
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (error) {
      router.replace('/login?error=auth')
    } else {
      router.replace('/')
    }
  }

  if (!ready) return null

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={72} />
          </div>
          <h1 className="text-3xl font-bold text-white">Mikrotrening</h1>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 space-y-4 text-center">
          <p className="text-white font-semibold">Klar til å logge inn?</p>
          <p className="text-gray-400 text-sm">Klikk knappen nedenfor for å fullføre innloggingen.</p>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
          >
            {loading ? 'Logger inn...' : 'Logg inn'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmForm />
    </Suspense>
  )
}
