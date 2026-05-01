'use client'

import { useState, useEffect, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'

type TimeOption = 'morning' | 'midday' | 'afternoon' | 'evening'

const TIME_OPTIONS: { value: TimeOption; label: string; hint: string; emoji: string }[] = [
  { value: 'morning', label: 'Morgen', hint: 'kl 08 · kl 09 i helg', emoji: '🌅' },
  { value: 'midday', label: 'Formiddag', hint: 'kl 11', emoji: '☀️' },
  { value: 'afternoon', label: 'Ettermiddag', hint: 'kl 15', emoji: '🌤️' },
  { value: 'evening', label: 'Kveld', hint: 'kl 19', emoji: '🌙' },
]

function OnboardingForm() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [preferredTimes, setPreferredTimes] = useState<TimeOption[]>([])
  const [loading, setLoading] = useState(false)
  const [notificationsDone, setNotificationsDone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [installed, setInstalled] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const inviteCode = searchParams.get('invite')
  const supabase = createClient()

  useEffect(() => {
    posthog.capture('onboarding_startet')
  }, [])

  useEffect(() => {
    // Allerede installert som PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true)
    }
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function saveAndGoToInstall(pushEnabled: boolean) {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('users').upsert({
        id: user.id,
        display_name: name.trim(),
        preferred_times: preferredTimes,
        push_enabled: pushEnabled,
      })

      // Pre-registrer gårsdagens økt på "Mikro 30" — første ekte økt blir bonus
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().slice(0, 10)

      let { data: pkg } = await supabase
        .from('workout_packages')
        .select('id')
        .eq('user_id', user.id)
        .eq('name', 'Mikro 30')
        .single()

      // Opprett Mikro 30 hvis den mangler (f.eks. bruker som ble re-slettet fra users-tabellen)
      if (!pkg) {
        const { data: newPkg } = await supabase
          .from('workout_packages')
          .insert({ user_id: user.id, name: 'Mikro 30', is_active: true })
          .select('id')
          .single()
        if (newPkg) {
          await supabase.from('exercises').insert({ package_id: newPkg.id, name: 'Knebøy', reps: 15, order: 1 })
          pkg = newPkg
        }
      }

      if (pkg) {
        await supabase.from('daily_logs').insert({
          user_id: user.id,
          package_id: pkg.id,
          logged_date: yesterdayStr,
        })
      }

      // Auto-join group if coming from invite
      if (inviteCode) {
        const { data: group } = await supabase
          .from('groups').select('id').eq('invite_code', inviteCode).single()
        if (group) {
          await supabase.from('group_members')
            .insert({ group_id: group.id, user_id: user.id })
        }
      }
    }
    setLoading(false)
    setNotificationsDone(true)
  }

  async function handleNotifications(want: boolean) {
    setLoading(true)
    if (!want) {
      posthog.capture('onboarding_push_avvist')
      await saveAndGoToInstall(false)
      return
    }
    posthog.capture('onboarding_push_akseptert')
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
    await saveAndGoToInstall(true)
  }

  async function handleAndroidInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
    }
    router.push('/')
    router.refresh()
  }

  function toggleTime(val: TimeOption) {
    setPreferredTimes(prev =>
      prev.includes(val) ? prev.filter(t => t !== val) : [...prev, val]
    )
  }

  const isIos = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent)
  const TOTAL_STEPS = 4

  // Steg 1: Velkomst
  if (step === 1) {
    return (
      <Screen>
        <div className="space-y-6 text-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white leading-tight">
              Velkommen til Mikrotrening.
            </h1>
            <p className="text-orange-400 font-semibold text-lg">
              Du har tatt et godt valg.
            </p>
          </div>
          <p className="text-2xl font-bold text-white">
            30 sekunder om dagen.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Gode treningsvaner er én av de viktigste tingene du kan gjøre for helsen din. Forskning på 90 000 mennesker viser at det er nok til å gjøre en reell forskjell — ti til fjorten ekstra leveår.
          </p>
        </div>
        <button
          onClick={() => setStep(2)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-3 transition"
        >
          Kom i gang
        </button>
        <StepDots current={1} total={TOTAL_STEPS} />
      </Screen>
    )
  }

  // Steg 2: Navn
  if (step === 2) {
    return (
      <Screen>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-white">Hva skal vi kalle deg?</h2>
          <p className="text-gray-400 text-sm">Vi bruker navnet ditt når du trener og følger fremgangen din.</p>
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
        <StepDots current={2} total={TOTAL_STEPS} />
      </Screen>
    )
  }

  // Steg 3: Tidspunkt
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
        <button
          onClick={() => saveAndGoToInstall(false)}
          className="w-full text-gray-400 hover:text-gray-200 text-sm py-1 transition"
        >
          Jeg vil ikke ha varsler
        </button>
        <BackButton onClick={() => setStep(2)} />
        <StepDots current={3} total={TOTAL_STEPS} />
      </Screen>
    )
  }

  // Steg 4: Varsler
  if (step === 4) {
    return (
      <Screen>
        <div className="text-center space-y-3">
          <div className="text-5xl">🔔</div>
          <h2 className="text-xl font-bold text-white">Daglig påminnelse?</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Den enkleste måten å bygge en god vane på er å få en daglig påminnelse.
          </p>
        </div>
        {notificationsDone ? (
          <div className="space-y-5">
            {!installed && (
              <div className="space-y-3">
                <p className="text-white font-semibold text-center">Legg til på hjemskjermen</p>
                {isIos ? (
                  <ol className="space-y-2">
                    {[
                      { icon: '1', text: 'Trykk på del-ikonet (□↑) nederst i Safari' },
                      { icon: '2', text: 'Scroll ned og velg «Legg til på Hjem-skjerm»' },
                      { icon: '3', text: 'Trykk «Legg til» øverst til høyre' },
                    ].map(s => (
                      <li key={s.icon} className="flex items-start gap-3 bg-gray-800 rounded-xl px-4 py-3">
                        <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{s.icon}</span>
                        <span className="text-gray-300 text-sm">{s.text}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ol className="space-y-2">
                    {[
                      { icon: '1', text: 'Trykk på ⋮ øverst til høyre i Chrome' },
                      { icon: '2', text: 'Velg «Legg til på startskjerm»' },
                      { icon: '3', text: 'Trykk «Legg til»' },
                    ].map(s => (
                      <li key={s.icon} className="flex items-start gap-3 bg-gray-800 rounded-xl px-4 py-3">
                        <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{s.icon}</span>
                        <span className="text-gray-300 text-sm">{s.text}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {!isIos && deferredPrompt && (
                  <button
                    onClick={handleAndroidInstall}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl py-3 transition text-sm"
                  >
                    Legg til automatisk
                  </button>
                )}
              </div>
            )}
            <button
              onClick={() => { posthog.capture('onboarding_fullfort'); router.push('/'); router.refresh() }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl py-4 text-lg transition"
            >
              Start din første mikroøkt nå →
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
        <StepDots current={4} total={TOTAL_STEPS} />
      </Screen>
    )
  }

}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingForm />
    </Suspense>
  )
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-start justify-center p-6 pt-16">
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
      className="w-full text-gray-400 hover:text-gray-200 disabled:opacity-30 text-sm py-1 transition"
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
