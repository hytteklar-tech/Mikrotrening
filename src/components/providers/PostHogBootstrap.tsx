'use client'

import { useLayoutEffect } from 'react'
import posthog from 'posthog-js'

type Props = {
  userId: string
  email?: string
}

export default function PostHogBootstrap({ userId, email }: Props) {
  // Bootstrap: init PostHog med userId som distinct_id fra aller første event.
  // Kjøres under render (før effects) så ingen events sendes anonymt.
  if (typeof window !== 'undefined' && !posthog.__loaded) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: '2026-01-30',
      person_profiles: 'always',
      capture_pageview: false,
      bootstrap: {
        distinctID: userId,
        isIdentifiedID: true,
      },
    })
  }

  // Kall identify ved hver mount — setter email som person-property selv om
  // bootstrap allerede satte correct distinct_id (bootstrap setter ikke properties).
  useLayoutEffect(() => {
    posthog.identify(userId, { email })
  }, [userId])

  return null
}
