'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'


type TimeOption = 'morning' | 'midday' | 'afternoon' | 'evening'

const TIME_OPTIONS: { value: TimeOption; label: string; hint: string }[] = [
  { value: 'morning', label: 'Morgen', hint: 'kl 08 · kl 09 i helg' },
  { value: 'midday', label: 'Formiddag', hint: 'kl 11' },
  { value: 'afternoon', label: 'Ettermiddag', hint: 'kl 15' },
  { value: 'evening', label: 'Kveld', hint: 'kl 19' },
]

export default function SettingsClient({ profile, userId }: { profile: any; userId: string }) {
  const [name, setName] = useState(profile?.display_name ?? '')
  const [notifications, setNotifications] = useState(profile?.notifications_enabled ?? true)
  const [pushEnabled, setPushEnabled] = useState(profile?.push_enabled ?? true)
  const [preferredTimes, setPreferredTimes] = useState<TimeOption[]>(profile?.preferred_times ?? [])
  const [hasOnesignalId, setHasOnesignalId] = useState(!!(profile?.onesignal_id || profile?.push_subscription))
  const [showActivateButton, setShowActivateButton] = useState(false)

  useEffect(() => {
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent)
    const needsActivation = isIos ? !profile?.push_subscription : !profile?.onesignal_id
    setShowActivateButton(needsActivation)
  }, [])
  const [activating, setActivating] = useState(false)
  const [activateError, setActivateError] = useState('')

  // Absolutt sikkerhetsstopp — stopper spinneren uansett hva som henger
  useEffect(() => {
    if (!activating) return
    const t = setTimeout(() => {
      setActivating(false)
      setActivateError('Tidsavbrudd. Prøv igjen eller restart appen.')
    }, 20000)
    return () => clearTimeout(t)
  }, [activating])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [testing, setTesting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function activatePush() {
    setActivating(true)
    setActivateError('')
    let saved = false
    const safetyStop = setTimeout(() => {
      setActivating(false)
      if (!saved) setActivateError('Tidsavbrudd — prøv igjen eller restart appen.')
    }, 15000)
    try {
      if (!('Notification' in window)) {
        setActivateError('Push-varsler støttes ikke på denne enheten/nettleseren.')
        setActivating(false)
        return
      }

      const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent)

      if (Notification.permission !== 'granted') {
        const permission = await Promise.race([
          Notification.requestPermission(),
          new Promise<NotificationPermission>((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 10000)
          ),
        ])
        if (permission !== 'granted') {
          setActivateError(isIos
            ? 'Tillat varsler i iPhone-innstillinger → Mikrotrening → Varsler'
            : 'Tillat varsler ved å klikke hengelåsen i adressefeltet → Varsler → Tillat'
          )
          setActivating(false)
          return
        }
      }

      if (isIos) {
        const swReg = await Promise.race([
          navigator.serviceWorker.register('/push-sw.js', { scope: '/push-scope/' }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Service worker registrering feilet')), 8000)
          ),
        ])
        await Promise.race([
          swReg.update(),
          new Promise(r => setTimeout(r, 3000)),
        ])
        const existing = await swReg.pushManager.getSubscription()
        const sub = existing ?? await Promise.race([
          swReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('PushManager.subscribe timed out')), 10000)
          ),
        ])
        const { error } = await supabase
          .from('users')
          .update({ push_subscription: sub.toJSON() })
          .eq('id', userId)
        if (error) throw new Error('Kunne ikke lagre abonnement: ' + error.message)
        setShowActivateButton(false)
        saved = true
      } else {
        const os = (window as any).OneSignal
        if (os) {
          os.User.PushSubscription.optIn().catch(() => {})
          const id = await new Promise<string | null>(resolve => {
            let attempts = 0
            const interval = setInterval(() => {
              attempts++
              const newId = os.User.PushSubscription.id
              if (newId) { clearInterval(interval); resolve(newId) }
              if (attempts >= 10) { clearInterval(interval); resolve(null) }
            }, 1000)
          })
          if (id) {
            await supabase.from('users').update({ onesignal_id: id }).eq('id', userId)
            setShowActivateButton(false)
            saved = true
          }
        }
      }
    } catch (e: any) {
      clearTimeout(safetyStop)
      setActivateError(`Feil: ${e.message}`)
      setActivating(false)
      return
    }
    clearTimeout(safetyStop)
    if (!saved) setActivateError('Fikk ikke registrert enheten. Prøv igjen.')
    setActivating(false)
  }

  async function testPush() {
    setTesting(true)
    setTestResult(null)
    try {
      const res = await fetch('/api/push/test')
      const text = await res.text()
      let json: any
      try { json = JSON.parse(text) } catch { setTestResult('Ugyldig svar: ' + text.slice(0, 200)); setTesting(false); return }
      setTestResult(JSON.stringify(json, null, 2))
    } catch (e: any) {
      setTestResult('Nettverksfeil: ' + e.message)
    }
    setTesting(false)
  }

  function toggleTime(val: TimeOption) {
    setPreferredTimes(prev =>
      prev.includes(val) ? prev.filter(t => t !== val) : [...prev, val]
    )
  }

  async function save() {
    setSaving(true)
    await supabase.from('users').update({
      display_name: name.trim(),
      notifications_enabled: notifications,
      push_enabled: pushEnabled,
      preferred_times: preferredTimes,
    }).eq('id', userId)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    router.refresh()
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  async function deleteAccount() {
    setDeleting(true)
    await supabase.from('users').delete().eq('id', userId)
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <p className="text-sm font-semibold text-gray-300">Profil</p>
        <div>
          <label className="text-xs text-gray-400">Visningsnavn</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-xl px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Motivasjonsmeldinger</p>
            <p className="text-xs text-gray-400 mt-0.5">Vis forskningstips underveis i treningen</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-orange-500' : 'bg-gray-600'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full mx-0.5 transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="border-t border-gray-700" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Push-varsler</p>
            <p className="text-xs text-gray-400 mt-0.5">Daglig påminnelse på valgte tidspunkt</p>
          </div>
          <button
            onClick={() => setPushEnabled(!pushEnabled)}
            className={`w-12 h-6 rounded-full transition-colors ${pushEnabled ? 'bg-orange-500' : 'bg-gray-600'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full mx-0.5 transition-transform ${pushEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <p className="text-xs text-gray-600">dbg: push={String(pushEnabled)} show={String(showActivateButton)} sub={String(!!profile?.push_subscription)} os={String(!!profile?.onesignal_id)}</p>

        {pushEnabled && showActivateButton && (
          <div className="space-y-2">
            <button
              onClick={activatePush}
              disabled={activating}
              className="w-full bg-orange-500/20 border border-orange-500/40 text-orange-400 rounded-xl py-2 text-sm font-medium transition hover:bg-orange-500/30 disabled:opacity-50"
            >
              {activating ? 'Aktiverer...' : '🔔 Trykk her for å aktivere push på denne enheten'}
            </button>
            {activateError && <p className="text-xs text-red-400 text-center">{activateError}</p>}
          </div>
        )}

        {pushEnabled && (
          <div className="space-y-2">
            <p className="text-xs text-gray-400">Når vil du ha påminnelse?</p>
            {TIME_OPTIONS.map(opt => {
              const selected = preferredTimes.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleTime(opt.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition text-left
                    ${selected
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-gray-700 bg-gray-700 text-gray-400'}`}
                >
                  <div>
                    <span className="text-sm font-medium">{opt.label}</span>
                    <span className="text-xs text-gray-500 ml-2">{opt.hint}</span>
                  </div>
                  {selected && <span className="text-orange-400 text-xs">✓</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={testPush}
          disabled={testing}
          className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-gray-300 rounded-xl py-2 text-sm transition"
        >
          {testing ? 'Sender...' : '🔔 Send testvarsel nå'}
        </button>
        {testResult && (
          <pre className="text-xs text-gray-300 bg-gray-900 rounded-xl p-3 overflow-auto whitespace-pre-wrap break-all">{testResult}</pre>
        )}
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
      >
        {saving ? 'Lagrer...' : saved ? '✅ Lagret!' : 'Lagre endringer'}
      </button>

      <a
        href="/mikrotrening"
        className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl py-3 text-sm transition flex items-center justify-center gap-2"
      >
        <span>🧠</span> Hvorfor mikrotrening?
      </a>

      <button
        onClick={signOut}
        className="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl py-3 text-sm transition"
      >
        Logg ut
      </button>

      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Farlig sone</p>
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full text-red-500 hover:text-red-400 text-sm py-1 transition"
          >
            Slett konto og alle data
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-300">Er du sikker? All data slettes permanent.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 bg-gray-700 text-white rounded-xl py-2 text-sm"
              >
                Avbryt
              </button>
              <button
                onClick={deleteAccount}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl py-2 text-sm font-semibold"
              >
                {deleting ? 'Sletter...' : 'Ja, slett alt'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
