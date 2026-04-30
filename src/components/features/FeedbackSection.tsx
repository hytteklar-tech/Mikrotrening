'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FeedbackSection() {
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

  return (
    <Link
      href="/meldinger"
      className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 rounded-2xl px-4 py-3 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-white">Meldinger</span>
        {hasUnread && <span className="w-2 h-2 bg-orange-500 rounded-full" />}
      </div>
      <span className="text-gray-400 text-sm">→</span>
    </Link>
  )
}
