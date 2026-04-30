'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Reply = { id: string; message: string; created_at: string }
type FeedbackItem = {
  id: string
  message: string
  created_at: string
  feedback_replies: Reply[]
}

export default function FeedbackSection({ userId }: { userId: string }) {
  const [items, setItems] = useState<FeedbackItem[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  async function load() {
    const { data } = await supabase
      .from('feedback')
      .select('id, message, created_at, feedback_replies (id, message, created_at)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    setItems(data ?? [])
  }

  useEffect(() => { load() }, [])

  async function send() {
    const msg = text.trim()
    if (!msg) return
    setSending(true)
    await supabase.from('feedback').insert({ user_id: userId, message: msg })
    setText('')
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    await load()
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
      <p className="text-sm font-semibold text-white">Spørsmål og tilbakemelding</p>
      <p className="text-xs text-gray-400">Send en melding til Arild — du får svar i appen.</p>

      <div className="flex gap-2">
        <textarea
          className="flex-1 bg-gray-700 rounded-xl px-3 py-2 text-sm text-white resize-none outline-none focus:ring-2 focus:ring-orange-500"
          rows={3}
          placeholder="Skriv her..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          onClick={send}
          disabled={sending || !text.trim()}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-sm font-medium px-4 rounded-xl transition-colors"
        >
          {sending ? '...' : 'Send'}
        </button>
      </div>

      {sent && <p className="text-xs text-green-400">Sendt! Du horer fra meg snart.</p>}

      {items.length > 0 && (
        <div className="space-y-3 pt-1">
          {items.map(item => (
            <div key={item.id} className="space-y-2">
              <div className="bg-gray-700 rounded-xl px-3 py-2">
                <p className="text-sm text-gray-200">{item.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.created_at).toLocaleDateString('nb-NO')}
                </p>
              </div>
              {item.feedback_replies.map(r => (
                <div key={r.id} className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-3 py-2 ml-4">
                  <p className="text-xs text-orange-400 font-medium mb-1">Arild</p>
                  <p className="text-sm text-gray-200">{r.message}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
