'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SettingsClient({ profile, userId }: { profile: any; userId: string }) {
  const [name, setName] = useState(profile?.display_name ?? '')
  const [notifications, setNotifications] = useState(profile?.notifications_enabled ?? true)
  const [pushEnabled, setPushEnabled] = useState(profile?.push_enabled ?? true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function save() {
    setSaving(true)
    await supabase.from('users').update({
      display_name: name.trim(),
      notifications_enabled: notifications,
      push_enabled: pushEnabled,
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
