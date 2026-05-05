'use client'

import { useState } from 'react'

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="bg-gray-700 hover:bg-gray-600 text-orange-400 rounded-xl px-4 py-3 text-sm font-semibold transition whitespace-nowrap"
    >
      {copied ? 'Kopiert ✓' : 'Kopier'}
    </button>
  )
}
