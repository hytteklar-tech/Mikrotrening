'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body style={{ background: '#030712', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '3rem' }}>⚠️</p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Noe gikk galt</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: '0.5rem 0 1.5rem' }}>En uventet feil oppstod.</p>
          <button
            onClick={reset}
            style={{ background: '#f97316', color: 'white', fontWeight: '600', borderRadius: '0.75rem', padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer' }}
          >
            Prøv igjen
          </button>
        </div>
      </body>
    </html>
  )
}
