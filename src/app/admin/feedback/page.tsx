'use client'

import { useEffect, useState } from 'react'

type Reply = { id: string; message: string; created_at: string }
type FeedbackItem = {
  id: string
  message: string
  is_read: boolean
  created_at: string
  users: { id: string; display_name: string | null }
  feedback_replies: Reply[]
}

export default function AdminFeedbackPage() {
  const [items, setItems] = useState<FeedbackItem[]>([])
  const [loading, setLoading] = useState(true)
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [sending, setSending] = useState<string | null>(null)

  async function load() {
    const res = await fetch('/api/admin/feedback')
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function sendReply(feedbackId: string) {
    const message = replyText[feedbackId]?.trim()
    if (!message) return
    setSending(feedbackId)
    await fetch('/api/admin/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedbackId, message }),
    })
    setReplyText(prev => ({ ...prev, [feedbackId]: '' }))
    await load()
    setSending(null)
  }

  const unread = items.filter(i => !i.is_read).length

  if (loading) return <p className="text-gray-400 mt-8">Laster...</p>

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Tilbakemeldinger</h1>
        {unread > 0 && (
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {unread} ulest
          </span>
        )}
      </div>

      {items.length === 0 && (
        <p className="text-gray-400">Ingen tilbakemeldinger ennå.</p>
      )}

      {items.map(item => (
        <div
          key={item.id}
          className={`rounded-xl border p-4 space-y-3 ${
            !item.is_read ? 'border-orange-500/50 bg-gray-900' : 'border-gray-800 bg-gray-900/50'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-medium text-sm text-white">
                {item.users?.display_name || 'Ukjent bruker'}
              </span>
              <span className="text-gray-500 text-xs ml-2">
                {new Date(item.created_at).toLocaleString('nb-NO')}
              </span>
            </div>
            {!item.is_read && (
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full shrink-0">
                Ny
              </span>
            )}
          </div>

          <p className="text-gray-200 text-sm">{item.message}</p>

          {item.feedback_replies.length > 0 && (
            <div className="space-y-2 pl-3 border-l-2 border-gray-700">
              {item.feedback_replies.map(r => (
                <div key={r.id}>
                  <p className="text-orange-400 text-sm">{r.message}</p>
                  <p className="text-gray-600 text-xs">
                    {new Date(r.created_at).toLocaleString('nb-NO')}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <textarea
              className="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-sm text-white resize-none outline-none border border-gray-700 focus:border-orange-500"
              rows={2}
              placeholder="Skriv svar..."
              value={replyText[item.id] ?? ''}
              onChange={e => setReplyText(prev => ({ ...prev, [item.id]: e.target.value }))}
            />
            <button
              onClick={() => sendReply(item.id)}
              disabled={sending === item.id || !replyText[item.id]?.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-sm font-medium px-4 rounded-lg transition-colors"
            >
              {sending === item.id ? '...' : 'Send'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
