'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'


type MusicTrack = { id: string; title: string; artist: string; url: string; duration_seconds: number }
type TimeOption = 'morning' | 'midday' | 'afternoon' | 'evening'

const TIME_OPTIONS: { value: TimeOption; label: string; hint: string }[] = [
  { value: 'morning', label: 'Morgen', hint: 'kl 08 · kl 09 i helg' },
  { value: 'midday', label: 'Formiddag', hint: 'kl 11' },
  { value: 'afternoon', label: 'Ettermiddag', hint: 'kl 15' },
  { value: 'evening', label: 'Kveld', hint: 'kl 19' },
]

function formatDuration(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}

export default function SettingsClient({ profile, userId, needsActivation, musicTracks }: { profile: any; userId: string; needsActivation: boolean; musicTracks: MusicTrack[] }) {
  const [name, setName] = useState(profile?.display_name ?? '')
  const [company, setCompany] = useState(profile?.company_name ?? '')
  const [preferredMusicId, setPreferredMusicId] = useState<string | null>(profile?.preferred_music_id ?? null)
  const [autoFillDuration, setAutoFillDuration] = useState(profile?.auto_fill_duration ?? false)
  const [musikkliste, setMusikkliste] = useState(false)
  const [previewAudio] = useState(() => typeof window !== 'undefined' ? new Audio() : null)
  const [notifications, setNotifications] = useState(profile?.notifications_enabled ?? true)
  const [pushEnabled, setPushEnabled] = useState(profile?.push_enabled ?? true)
  const [preferredTimes, setPreferredTimes] = useState<TimeOption[]>(profile?.preferred_times ?? [])
  const [showActivateButton, setShowActivateButton] = useState(needsActivation)
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
    previewAudio?.pause()
    const { error } = await supabase.from('users').update({
      display_name: name.trim(),
      company_name: company.trim() || null,
      preferred_music_id: preferredMusicId,
      auto_fill_duration: autoFillDuration,
      notifications_enabled: notifications,
      push_enabled: pushEnabled,
      preferred_times: preferredTimes,
    }).eq('id', userId)
    setSaving(false)
    if (error) {
      alert('Feil ved lagring: ' + error.message)
      return
    }
    router.push('/')
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
      <Card>
        <CardContent className="space-y-3">
          <p className="text-sm font-semibold">Profil</p>
          <div className="space-y-1">
            <Label htmlFor="display-name" className="text-xs text-muted-foreground font-normal">Visningsnavn</Label>
            <Input
              id="display-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="company" className="text-xs text-muted-foreground font-normal">Firma</Label>
            <Input
              id="company"
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="Valgfritt"
            />
          </div>
        </CardContent>
      </Card>

      {musicTracks.length > 0 && (
        <Card>
          <CardContent>
            <button
              onClick={() => setMusikkliste(v => !v)}
              className="w-full flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-left">🎵 Treningsmusikk</p>
                <p className="text-xs text-muted-foreground mt-0.5 text-left">
                  {preferredMusicId
                    ? musicTracks.find(t => t.id === preferredMusicId)?.title ?? 'Valgt'
                    : 'Ingen musikk valgt'}
                </p>
              </div>
              <span className="text-muted-foreground text-sm ml-2">{musikkliste ? '▲' : '▼'}</span>
            </button>
            {musikkliste && (
              <div className="space-y-1.5 mt-3">
                <button
                  onClick={() => {
                    previewAudio?.pause()
                    setPreferredMusicId(null)
                  }}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition text-left ${!preferredMusicId ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                >
                  <span>🔇</span>
                  <span>Ingen musikk</span>
                </button>
                {musicTracks.map(track => (
                  <button
                    key={track.id}
                    onClick={() => {
                      if (preferredMusicId === track.id) {
                        previewAudio?.pause()
                        setPreferredMusicId(null)
                      } else {
                        setPreferredMusicId(track.id)
                        if (previewAudio) {
                          previewAudio.src = track.url
                          previewAudio.loop = false
                          previewAudio.play().catch(() => {})
                          setTimeout(() => previewAudio.pause(), 8000)
                        }
                      }
                    }}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition text-left ${preferredMusicId === track.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                  >
                    <span className="w-7 h-7 bg-black/20 rounded-full flex items-center justify-center shrink-0">
                      {preferredMusicId === track.id ? '✓' : '▶'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{track.title}</p>
                      <p className="text-xs opacity-75">{track.artist} · {formatDuration(track.duration_seconds)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">⏱ Fyll inn manglende tid</p>
            <p className="text-xs text-muted-foreground mt-0.5">Bruker snittet ditt til å estimere tid på treninger uten tidtaker</p>
          </div>
          <button
            onClick={() => setAutoFillDuration((v: boolean) => !v)}
            className={`w-12 h-6 rounded-full transition-colors shrink-0 ml-3 ${autoFillDuration ? 'bg-primary' : 'bg-muted'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full mx-0.5 transition-transform ${autoFillDuration ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Motivasjonsmeldinger</p>
              <p className="text-xs text-muted-foreground mt-0.5">Vis forskningstips underveis i treningen</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-primary' : 'bg-muted'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full mx-0.5 transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Push-varsler</p>
              <p className="text-xs text-muted-foreground mt-0.5">Daglig påminnelse på valgte tidspunkt</p>
            </div>
            <button
              onClick={() => setPushEnabled(!pushEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${pushEnabled ? 'bg-primary' : 'bg-muted'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full mx-0.5 transition-transform ${pushEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {pushEnabled && showActivateButton && (
            <div className="space-y-2">
              <Button
                onClick={activatePush}
                disabled={activating}
                variant="outline"
                className="w-full border-primary/40 text-primary hover:bg-primary/10"
              >
                {activating ? 'Aktiverer...' : '🔔 Trykk her for å aktivere push på denne enheten'}
              </Button>
              {activateError && <p className="text-xs text-destructive text-center">{activateError}</p>}
            </div>
          )}

          {pushEnabled && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Når vil du ha påminnelse?</p>
              {TIME_OPTIONS.map(opt => {
                const selected = preferredTimes.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleTime(opt.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition text-left
                      ${selected
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border bg-muted text-muted-foreground'}`}
                  >
                    <div>
                      <span className="text-sm font-medium">{opt.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">{opt.hint}</span>
                    </div>
                    {selected && <span className="text-primary text-xs">✓</span>}
                  </button>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        onClick={save}
        disabled={saving}
        size="xl"
        className="w-full"
      >
        {saving ? 'Lagrer...' : saved ? '✅ Lagret!' : 'Lagre endringer'}
      </Button>

      <a
        href="/mikrotrening"
        className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-full gap-2')}
      >
        <span>🧠</span> Hvorfor mikrotrening?
      </a>

      <Button
        onClick={signOut}
        variant="secondary"
        size="lg"
        className="w-full"
      >
        Logg ut
      </Button>

      <div className="flex gap-2 text-xs text-muted-foreground justify-center">
        <a href="/personvern" className="hover:text-foreground transition underline">Personvern</a>
        <span>·</span>
        <a href="/vilkaar" className="hover:text-foreground transition underline">Vilkår</a>
      </div>

      <Card>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Farlig sone</p>
          {!confirmDelete ? (
            <Button
              onClick={() => setConfirmDelete(true)}
              variant="ghost"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Slett konto og alle data
            </Button>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Er du sikker? All data slettes permanent.</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setConfirmDelete(false)}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Avbryt
                </Button>
                <Button
                  onClick={deleteAccount}
                  disabled={deleting}
                  variant="destructive"
                  size="lg"
                  className="flex-1"
                >
                  {deleting ? 'Sletter...' : 'Ja, slett alt'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
