'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/ui/Logo'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const authError = searchParams.get('error') === 'auth'
  const router = useRouter()
  const supabase = createClient()

  async function sendCode() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setError(error.message)
    } else {
      setStep('code')
    }
    setLoading(false)
  }

  async function verifyCode() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.verifyOtp({ email, token: code.trim(), type: 'email' })
    if (error) {
      setError('Feil kode. Prøv igjen eller be om ny kode.')
    } else {
      router.replace('/')
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

        {authError && (
          <div className="bg-red-900/40 border border-red-700 rounded-xl px-4 py-3 text-red-300 text-sm text-center mb-4">
            Innloggingen feilet. Prøv på nytt.
          </div>
        )}

        <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
          {step === 'email' ? (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-1">E-postadresse</label>
                <input
                  type="email"
                  placeholder="deg@eksempel.no"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && email.includes('@') && sendCode()}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={sendCode}
                disabled={loading || !email.includes('@')}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
              >
                {loading ? 'Sender...' : 'Send kode'}
              </button>
            </>
          ) : (
            <>
              <div className="text-center space-y-1">
                <p className="text-2xl">📬</p>
                <p className="text-white font-semibold">Sjekk innboksen din</p>
                <p className="text-gray-400 text-sm">
                  Vi sendte en kode til <span className="text-white">{email}</span>
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Kode</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="12345678"
                  maxLength={8}
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={e => e.key === 'Enter' && code.length >= 6 && verifyCode()}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl tracking-widest"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button
                onClick={verifyCode}
                disabled={loading || code.length < 6}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
              >
                {loading ? 'Verifiserer...' : 'Logg inn'}
              </button>
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={sendCode}
                  disabled={loading}
                  className="text-orange-400 text-sm hover:text-orange-300 transition disabled:opacity-50"
                >
                  Send koden på nytt
                </button>
                <button
                  onClick={() => { setStep('email'); setCode(''); setError('') }}
                  className="text-gray-500 text-sm hover:text-white transition"
                >
                  ← Bruk annen e-post
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
