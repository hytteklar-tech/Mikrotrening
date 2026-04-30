'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FeedbackBanner({ initialHasUnread }: { initialHasUnread: boolean }) {
  const [hasUnread, setHasUnread] = useState(initialHasUnread)

  useEffect(() => {
    const hide = () => setHasUnread(false)
    window.addEventListener('feedback-read', hide)
    return () => window.removeEventListener('feedback-read', hide)
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
