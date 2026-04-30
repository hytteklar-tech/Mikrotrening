'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type Reply = { id: string; message: string; created_at: string }
type FeedbackItem = {
  id: string
  message: string
  created_at: string
  feedback_replies: Reply[]
}

export default function MeldingerClient({
  userId,
  initialItems,
}: {
  userId: string
  initialItems: FeedbackItem[]
}) {
  const [items, setItems] = useState(initialItems)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    fetch('/api/feedback/read', { method: 'POST' })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [items])

  async function send() {
    const msg = text.trim()
    if (!msg) return
    setSending(true)
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
    })
    setText('')
    setSending(false)

    // Oppdater listen
    const res = await fetch('/api/feedback/list')
    if (res.ok) setItems(await res.json())
  }

  // Flat liste over alle bobler i kronologisk rekkefølge
  type Bubble = { key: string; type: 'user' | 'reply'; message: string; created_at: string }
  const bubbles: Bubble[] = []
  for (const item of items) {
    bubbles.push({ key: item.id, type: 'user', message: item.message, created_at: item.created_at })
    for (const r of item.feedback_replies) {
      bubbles.push({ key: r.id, type: 'reply', message: r.message, created_at: r.created_at })
    }
  }
  bubbles.sort((a, b) => a.created_at.localeCompare(b.created_at))

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <Link href="/settings" className="text-white font-bold text-lg leading-none">←</Link>
        <h1 className="font-semibold text-white">Meldinger</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {bubbles.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-8">
            Ingen meldinger ennå. Send gjerne et spørsmål!
          </p>
        )}
        {bubbles.map(b => (
          <div key={b.key} className={`flex ${b.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                b.type === 'user'
                  ? 'bg-orange-500 text-white rounded-br-sm'
                  : 'bg-gray-800 text-gray-100 rounded-bl-sm'
              }`}
            >
              <p>{b.message}</p>
              <p className={`text-xs mt-1 ${b.type === 'user' ? 'text-orange-200' : 'text-gray-500'}`}>
                {new Date(b.created_at).toLocaleString('nb-NO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-gray-800 flex gap-2">
        <textarea
          className="flex-1 bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-2xl px-4 py-2 text-sm text-white resize-none outline-none"
          rows={2}
          placeholder="Skriv en melding..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
        />
        <button
          onClick={send}
          disabled={sending || !text.trim()}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-medium px-4 rounded-2xl transition-colors shrink-0"
        >
          {sending ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
