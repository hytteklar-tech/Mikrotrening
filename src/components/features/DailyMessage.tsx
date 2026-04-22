'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'Hver økt teller.',
  'La oss mikrotrene!',
  'Tid for tredve sekunder.',
  'Klar for dagens økt?',
  'Tredve sekunder endrer dagen.',
  'En liten innsats. Hver dag.',
  'Kroppen din venter.',
  'Det starter her.',
  'Gjør det nå — du angrer ikke.',
  'Én økt nærmere vanen.',
  'Små steg. Stor effekt.',
  'Du er i gang — fortsett.',
  'Forskningen er klar. Du vet hva du skal gjøre.',
]

export default function DailyMessage() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    const storedDate = localStorage.getItem('daily_msg_date')
    const storedMsg = localStorage.getItem('daily_msg')

    if (storedDate === today && storedMsg) {
      setMessage(storedMsg)
      return
    }

    // Trekk ny melding, ekskluder gårsdagens
    const yesterday = localStorage.getItem('daily_msg') ?? ''
    const available = MESSAGES.filter(m => m !== yesterday)
    const picked = available[Math.floor(Math.random() * available.length)]

    localStorage.setItem('daily_msg_yesterday', yesterday)
    localStorage.setItem('daily_msg', picked)
    localStorage.setItem('daily_msg_date', today)
    setMessage(picked)
  }, [])

  if (!message) return null
  return <p className="text-gray-400 text-sm mt-0.5">{message}</p>
}
