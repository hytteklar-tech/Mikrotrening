'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type TimeOption = 'morning' | 'midday' | 'afternoon' | 'evening'

const TIME_OPTIONS: { value: TimeOption; label: string; hint: string; emoji: string }[] = [
  { value: 'morning', label: 'Morgen', hint: 'kl 08 · kl 09 i helg', emoji: '🌅' },
  { value: 'midday', label: 'Formiddag', hint: 'kl 11', emoji: '☀️' },
  { value: 'afternoon', label: 'Ettermiddag', hint: 'kl 15', emoji: '🌤️' },
  { value: 'evening', label: 'Kveld', hint: 'kl 19', emoji: '🌙' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [preferredTimes, setPreferredTimes] = useState<TimeOption[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function finish(pushEnabled: boolean) {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('users').update({
        display_name: name.trim(),
        preferred_times: preferredTimes,
        push_enabled: pushEnabled,
      }).eq('id', user.id)
    }
    router.push('/')
    router.refresh()
  }

  async function handleNotifications(want: boolean) {
    setLoading(true)
    if (!want) {
      await finish(false)
      return
    }
    let granted = false
    try {
      await Promise.race([
        new Promise<void>(resolve => {
          window.OneSignalDeferred = window.OneSignalDeferred || []
          window.OneSignalDeferred.push(async (OneSignal: any) => {
            try {
              await OneSignal.User.PushSubscription.optIn()
              const id = OneSignal.User.PushSubscription.id
              if (id) {
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                  await supabase.from('users').update({ onesignal_id: id }).eq('id', user.id)
                }
              }
            } catch {}
            resolve()
          })
        }),
        new Promise<void>(resolve => setTimeout(resolve, 5000)),
      ])
      granted = Notification.permission === 'granted'
    } catch {
      granted = false
    }
    await finish(granted)
  }

  function toggleTime(val: TimeOption) {
    setPreferredTimes(prev =>
      prev.includes(val) ? prev.filter(t => t !== val) : [...prev, val]
    )
  }

  // Steg 1: Velkomst
  if (step === 1) {
    return (
      <Screen>
        <div className="text-center space-y-4">
          <div className="text-6xl">💪</div>
          <h1 className="text-2xl font-bold text-white leading-snug">
            3 korte økter om dagen.<br />
            <span className="text-orange-400">48% lavere risiko</span> for hjertedød.
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Ingen utstyr. Ingen planlegging.<br />Bare 30 sekunder.
          </p>
        </div>
        <button
          onClick={() => setStep(2)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-3 transition"
        >
          Kom i gang
        </button>
        <StepDots current={1} total={4} />
      </Screen>
    )
  }

  // Steg 2: Navn
  if (step === 2) {
    return (
      <Screen>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-white">Hva skal vi kalle deg?</h2>
          <p className="text-gray-400 text-sm">Navnet vises på resultattavlen.</p>
        </div>
        <input
          type="text"
          placeholder="Ditt navn"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(3)}
          className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
          autoFocus
        />
        <button
          onClick={() => setStep(3)}
          disabled={!name.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
        >
          Neste
        </button>
        <BackButton onClick={() => setStep(1)} />
        <StepDots current={2} total={4} />
      </Screen>
    )
  }

  // Steg 3: Habit-anker (multiselekt)
  if (step === 3) {
    return (
      <Screen>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-white">Når passer det best å mikrotrene?</h2>
          <p className="text-gray-400 text-sm">Velg én eller flere — du får varsel på hvert tidspunkt.</p>
        </div>
        <div className="space-y-2">
          {TIME_OPTIONS.map(opt => {
            const selected = preferredTimes.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => toggleTime(opt.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition text-left
                  ${selected
                    ? 'border-orange-500 bg-orange-500/10 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500'}`}
              >
                <span className="text-xl">{opt.emoji}</span>
                <div className="flex-1">
                  <div className="font-medium">{opt.label}</div>
                  <div className="text-xs text-gray-500">{opt.hint}</div>
                </div>
                {selected && <span className="text-orange-400 text-sm">✓</span>}
              </button>
            )
          })}
        </div>
        <button
          onClick={() => setStep(4)}
          disabled={preferredTimes.length === 0}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
        >
          Neste
        </button>
        <BackButton onClick={() => setStep(2)} />
        <StepDots current={3} total={4} />
      </Screen>
    )
  }

  // Steg 4: Varsler
  return (
    <Screen>
      <div className="text-center space-y-3">
        <div className="text-5xl">🔔</div>
        <h2 className="text-xl font-bold text-white">Daglig påminnelse?</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          En liten dytt på rett tidspunkt. Ikke stress — bare en invitasjon.
        </p>
      </div>
      <div className="space-y-3">
        <button
          onClick={() => handleNotifications(true)}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
        >
          {loading ? 'Lagrer...' : 'Ja, send meg påminnelser'}
        </button>
        <button
          onClick={() => handleNotifications(false)}
          disabled={loading}
          className="w-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-300 font-medium rounded-xl py-3 transition"
        >
          Ikke nå
        </button>
      </div>
      <BackButton onClick={() => setStep(3)} disabled={loading} />
      <StepDots current={4} total={4} />
    </Screen>
  )
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        {children}
      </div>
    </div>
  )
}

function BackButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full text-gray-500 hover:text-gray-300 disabled:opacity-30 text-sm py-1 transition"
    >
      ← Tilbake
    </button>
  )
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex justify-center gap-2 pt-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i + 1 === current ? 'w-6 bg-orange-500' : 'w-1.5 bg-gray-700'
          }`}
        />
      ))}
    </div>
  )
}
