'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { createClient } from '@/lib/supabase/client'

export default function OneSignalProvider() {
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || []
  }, [])

  function onLoad() {
    window.OneSignalDeferred = window.OneSignalDeferred || []
    window.OneSignalDeferred.push(async (OneSignal: OneSignalType) => {
      try {
        await OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
          safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_ID,
          notifyButton: { enable: false },
          serviceWorkerParam: { scope: '/' },
        })
      } catch (err) {
        console.error('[OneSignal] init feilet:', err)
        return
      }

      async function saveId(id: string | null) {
        if (!id) return
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('users').update({ onesignal_id: id }).eq('id', user.id)
        }
      }

      // Lagre ved fremtidige endringer (ny abonnement / optIn)
      OneSignal.User.PushSubscription.addEventListener('change', () => {
        saveId(OneSignal.User.PushSubscription.id)
      })

      // Sjekk umiddelbart, og igjen etter kort forsinkelse (abonnement kan ta litt tid)
      await saveId(OneSignal.User.PushSubscription.id)
      setTimeout(() => saveId(OneSignal.User.PushSubscription.id), 3000)
    })
  }

  return (
    <Script
      src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
      strategy="afterInteractive"
      onLoad={onLoad}
    />
  )
}

// Minimal type-deklarasjon for window
declare global {
  interface Window {
    OneSignalDeferred: ((os: OneSignalType) => void | Promise<void>)[]
    OneSignal: OneSignalType
  }
}

interface OneSignalType {
  init: (config: object) => Promise<void>
  User: {
    PushSubscription: {
      id: string | null
      optIn: () => Promise<void>
      optOut: () => Promise<void>
      addEventListener: (event: string, cb: () => void) => void
    }
  }
}
