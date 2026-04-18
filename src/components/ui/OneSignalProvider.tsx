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
      await OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
        safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_ID!,
        notifyButton: { enable: false },
      })

      // Lagre OneSignal-ID til databasen når bruker er abonnert
      OneSignal.User.PushSubscription.addEventListener('change', async () => {
        const id = OneSignal.User.PushSubscription.id
        if (!id) return
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('users').update({ onesignal_id: id }).eq('id', user.id)
        }
      })
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
    OneSignalDeferred: ((os: OneSignalType) => void)[]
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
