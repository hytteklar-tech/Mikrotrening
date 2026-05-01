'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

// Tracker app_apnet når appen kommer i forgrunnen (PWA-vennlig)
export default function PostHogAppOpened() {
  useEffect(() => {
    // Første gang (app åpnes)
    posthog.capture('app_apnet')

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        posthog.capture('app_apnet')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return null
}
