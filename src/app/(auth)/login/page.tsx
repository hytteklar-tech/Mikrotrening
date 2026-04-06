'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/ui/Logo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function sendMagicLink() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={72} />
          </div>
          <h1 className="text-3xl font-bold text-white">Mikrotrening</h1>
          <p className="text-gray-400 mt-2">Mikrotrening hver dag</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
          {sent ? (
            <div className="text-center space-y-3">
              <p className="text-2xl">📬</p>
              <p className="text-white font-semibold">Sjekk innboksen din</p>
              <p className="text-gray-400 text-sm">
                Vi har sendt en innloggingslenke til <span className="text-white">{email}</span>
              </p>
              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="text-gray-500 text-sm hover:text-white transition"
              >
                Bruk en annen e-post
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-1">E-postadresse</label>
                <input
                  type="email"
                  placeholder="deg@eksempel.no"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMagicLink()}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={sendMagicLink}
                disabled={loading || !email.includes('@')}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
              >
                {loading ? 'Sender...' : 'Send innloggingslenke'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
