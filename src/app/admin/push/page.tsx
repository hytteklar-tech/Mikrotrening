'use client'

import { useState } from 'react'

export default function AdminPushPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  async function send() {
    if (!title.trim() || !body.trim()) return
    setSending(true)
    setStatus(null)
    const res = await fetch('/api/admin/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    })
    const data = await res.json()
    if (data.ok) {
      setStatus(`Sendt til ${data.sent} bruker(e)`)
      setTitle('')
      setBody('')
    } else {
      setStatus(`Feil: ${data.error}`)
    }
    setSending(false)
  }

  return (
    <div className="space-y-6 mt-4">
      <h1 className="text-xl font-bold">Send push-melding</h1>
      <p className="text-gray-400 text-sm">Sendes til alle brukere med push aktivert.</p>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Tittel</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-lg px-3 py-2 text-white outline-none"
            placeholder="F.eks. Rask undersøkelse"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Melding</label>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-lg px-3 py-2 text-white outline-none resize-none"
            rows={4}
            placeholder="F.eks. Ta 2 min og hjelp oss bli bedre: https://..."
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        <button
          onClick={send}
          disabled={sending || !title.trim() || !body.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {sending ? 'Sender...' : 'Send til alle'}
        </button>

        {status && (
          <p className={`text-sm text-center ${status.startsWith('Feil') ? 'text-red-400' : 'text-green-400'}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  )
}
