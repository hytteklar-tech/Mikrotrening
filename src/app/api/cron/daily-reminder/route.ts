import { createClient } from '@supabase/supabase-js'
import { sendPushNotification } from '@/lib/onesignal'
import { NextResponse } from 'next/server'

// Kjøres hver time av Vercel Cron. Sender til brukere der foretrukket tidspunkt matcher nå.
// Norsk tid = UTC+2 (sommer) / UTC+1 (vinter). Vi bruker UTC+2.

const MESSAGES: Record<string, string[]> = {
  morning: [
    'God morgen! 30 sekunder er alt som trengs. 💪',
    'Start dagen rett — én rask økt?',
    'Morgenen er din. 30 sekunder holder.',
    'Ny dag, ny sjanse. Klar for mikrotrening?',
    'Dagen starter best med bevegelse. 30 sekunder!',
  ],
  midday: [
    'Før lunsjen — en rask økt?',
    'Halvveis gjennom dagen. Et minutt for deg?',
    'Pause? Perfekt tidspunkt for mikrotrening.',
    'Midtdagens boost — 30 sekunder. Du klarer det!',
    'Hjernen trenger pause. Kroppen trenger bevegelse.',
  ],
  afternoon: [
    'Ettermiddagsøkt? 30 sekunder holder.',
    'Dagen er ikke over ennå. Én økt gjenstår.',
    'Hjernen trenger pause. Kroppen trenger bevegelse.',
    'Ettermiddag-boost — klar?',
    '30 sekunder nå. Du angrer ikke.',
  ],
  evening: [
    'Dagen er snart over. Ett minutt gjenstår.',
    'Avslutt dagen sterkt — 30 sekunder.',
    'Siste sjanse i dag. Du klarer det.',
    'Kvelden er din. Et minutt for kroppen?',
    'Ikke gå til sengs uten å ha trent. 30 sekunder!',
  ],
}

// Norsk time (UTC+2) → preferred_time
const HOUR_TO_TIME: Record<number, string> = {
  7: 'morning',
  11: 'midday',
  15: 'afternoon',
  19: 'evening',
}

function pickMessage(messages: string[]): string {
  return messages[Math.floor(Date.now() / 86400000) % messages.length]
}

export async function GET(request: Request) {
  // Sikkerhet: Vercel sender CRON_SECRET
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Norsk tid: UTC + 2 timer
  const nowNorway = new Date(Date.now() + 2 * 60 * 60 * 1000)
  const hour = nowNorway.getUTCHours()
  const preferredTime = HOUR_TO_TIME[hour]

  if (!preferredTime) {
    return NextResponse.json({ skipped: true, hour })
  }

  const { data: users } = await supabase
    .from('users')
    .select('onesignal_id')
    .eq('preferred_time', preferredTime)
    .eq('notifications_enabled', true)
    .not('onesignal_id', 'is', null)

  if (!users?.length) {
    return NextResponse.json({ sent: 0 })
  }

  const playerIds = users.map(u => u.onesignal_id as string)
  const message = pickMessage(MESSAGES[preferredTime])

  await sendPushNotification({
    playerIds,
    title: 'Mikrotrening',
    body: message,
  })

  return NextResponse.json({ sent: playerIds.length, hour, preferredTime })
}
