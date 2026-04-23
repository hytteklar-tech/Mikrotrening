'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function PushSetupPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function activate() {
    setStatus('loading')
    try {
      if (!('Notification' in window)) {
        setMessage('Push-varsler støttes ikke i denne nettleseren.')
        setStatus('error')
        return
      }

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setMessage('Du må tillate varsler for at dette skal fungere.\n\nGå til iPhone-innstillinger → Mikrotrening → Varsler → Tillat.')
        setStatus('error')
        return
      }

      const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent)
      if (isIos) {
        const swReg = await navigator.serviceWorker.register('/push-sw.js', { scope: '/push-scope/' })
        await swReg.update()
        const existing = await swReg.pushManager.getSubscription()
        const sub = existing ?? await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        })
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setMessage('Ikke innlogget.'); setStatus('error'); return }
        const { error } = await supabase.from('users').update({ push_subscription: sub.toJSON() }).eq('id', user.id)
        if (error) throw new Error(error.message)
        setStatus('done')
        setMessage('Push aktivert! Du vil nå få daglige påminnelser på iPhone.')
      } else {
        setMessage('Denne siden er bare for iPhone. Gå til Innstillinger i appen for Android/PC.')
        setStatus('error')
      }
    } catch (e: any) {
      setMessage('Feil: ' + e.message)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-start justify-center p-6 pt-16">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="text-5xl">🔔</div>
        <h1 className="text-2xl font-bold text-white">Aktiver push på iPhone</h1>
        <p className="text-gray-400 text-sm">Trykk på knappen og godta varsel-forespørselen.</p>

        {status === 'idle' && (
          <button
            onClick={activate}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-4 text-lg transition"
          >
            Aktiver push-varsler
          </button>
        )}

        {status === 'loading' && (
          <p className="text-orange-400 font-medium">Aktiverer...</p>
        )}

        {status === 'done' && (
          <div className="space-y-4">
            <p className="text-green-400 font-medium">{message}</p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-3 transition"
            >
              Tilbake til appen
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <p className="text-red-400 text-sm whitespace-pre-line">{message}</p>
            <button
              onClick={() => setStatus('idle')}
              className="w-full bg-gray-700 text-white rounded-xl py-3 transition"
            >
              Prøv igjen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
