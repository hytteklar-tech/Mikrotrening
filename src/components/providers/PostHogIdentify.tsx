'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

type Props = {
  userId: string
  email: string | undefined
}

export default function PostHogIdentify({ userId, email }: Props) {
  useEffect(() => {
    posthog.identify(userId, {
      email,
    })
  }, [userId])

  return null
}
