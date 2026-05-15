'use client'

import { useLayoutEffect } from 'react'
import posthog from 'posthog-js'

type Props = {
  userId: string
  email: string | undefined
}

export default function PostHogIdentify({ userId, email }: Props) {
  // useLayoutEffect kjører før useEffect — sikrer at identify skjer
  // før $pageview og app_apnet-hendelser sendes til PostHog
  useLayoutEffect(() => {
    posthog.identify(userId, {
      email,
    })
  }, [userId])

  return null
}
