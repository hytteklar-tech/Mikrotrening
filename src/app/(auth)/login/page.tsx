'use client'

import { useState, Suspense, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/ui/Logo'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)
  const [resendMessage, setResendMessage] = useState('')

  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [resendCooldown])

  const searchParams = useSearchParams()
  const authError = searchParams.get('error') === 'auth'
  const inviteCode = searchParams.get('invite')
  const router = useRouter()
  const supabase = createClient()

  async function sendCode(isResend = false) {
    setLoading(true)
    setError('')
    setResendMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setError(error.message)
    } else {
      setStep('code')
      setResendCooldown(60)
      if (isResend) {
        setCode('')
        setResendMessage('Ny kode sendt — den gamle er nå ugyldig.')
      }
    }
    setLoading(false)
  }

  async function verifyCode() {
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.verifyOtp({ email, token: code.trim(), type: 'email' })
    if (error) {
      setError('Feil kode. Prøv igjen eller be om ny kode.')
    } else {
      const userId = data.user?.id
      // Check if existing user (has display_name set)
      const { data: userData } = userId
        ? await supabase.from('users').select('display_name').eq('id', userId).single()
        : { data: null }

      if (userData?.display_name) {
        // Existing user — join group if invite code, then go home
        if (inviteCode && userId) {
          const { data: group } = await supabase
            .from('groups').select('id').eq('invite_code', inviteCode).single()
          if (group) {
            await supabase.from('group_members')
              .insert({ group_id: group.id, user_id: userId })
          }
        }
        router.replace(inviteCode ? '/group' : '/')
      } else {
        // New user — go to onboarding
        router.replace(inviteCode ? `/onboarding?invite=${inviteCode}` : '/onboarding')
      }
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

        {inviteCode && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3 text-orange-300 text-sm text-center mb-4">
            Logg inn for å bli med i gruppen
          </div>
        )}

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
                onClick={() => sendCode()}
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
                  placeholder="123456"
                  maxLength={6}
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
              {resendMessage && (
                <p className="text-green-400 text-sm text-center">{resendMessage}</p>
              )}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => sendCode(true)}
                  disabled={loading || resendCooldown > 0}
                  className="text-orange-400 text-sm hover:text-orange-300 transition disabled:opacity-50"
                >
                  {resendCooldown > 0 ? `Send på nytt (${resendCooldown}s)` : 'Send koden på nytt'}
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
