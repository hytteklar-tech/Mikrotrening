'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FeedbackBanner() {
  const [hasUnread, setHasUnread] = useState(false)

  function check() {
    fetch('/api/feedback/unread')
      .then(r => r.json())
      .then(d => setHasUnread(d.hasUnread))
  }

  useEffect(() => {
    check()
    window.addEventListener('feedback-read', () => setHasUnread(false))
    document.addEventListener('visibilitychange', check)
    return () => {
      window.removeEventListener('feedback-read', () => setHasUnread(false))
      document.removeEventListener('visibilitychange', check)
    }
  }, [])

  if (!hasUnread) return null

  return (
    <Link
      href="/meldinger"
      className="flex items-center gap-1.5 bg-orange-500 rounded-full px-3 py-1.5 shrink-0"
    >
      <span className="w-2 h-2 bg-white rounded-full shrink-0" />
      <span className="text-white text-xs font-semibold whitespace-nowrap">Ny melding</span>
    </Link>
  )
}
