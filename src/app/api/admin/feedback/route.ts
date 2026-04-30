export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { sendPushNotification } from '@/lib/onesignal'
import { NextRequest, NextResponse } from 'next/server'

async function checkAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== process.env.ADMIN_EMAIL) return null
  return user
}

const adminDb = () => createAdmin(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/admin/feedback — hent alle tilbakemeldinger med svar og brukerinfo
export async function GET() {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = adminDb()
  const { data, error } = await db
    .from('feedback')
    .select(`
      id, message, is_read, created_at,
      users (id, display_name),
      feedback_replies (id, message, created_at)
    `)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/admin/feedback — svar på en melding
export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { feedbackId, message } = await req.json()
  if (!feedbackId || !message) return NextResponse.json({ error: 'Mangler data' }, { status: 400 })

  const db = adminDb()

  // Lagre svar
  const { error } = await db
    .from('feedback_replies')
    .insert({ feedback_id: feedbackId, message })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Merk som ulest for bruker (de har ikke sett svaret ennå)
  await db.from('feedback').update({ is_read: false }).eq('id', feedbackId)

  // Hent brukerens push-info for å sende varsel
  const { data: fb } = await db
    .from('feedback')
    .select('user_id, users (onesignal_id, push_subscription, push_enabled)')
    .eq('id', feedbackId)
    .single()

  const u = fb?.users as any
  if (u?.push_enabled) {
    await sendPushNotification({
      playerIds: u.onesignal_id ? [u.onesignal_id] : [],
      nativeSubscriptions: u.push_subscription ? [u.push_subscription] : [],
      title: 'Du har fått svar',
      body: 'Du har fått svar på meldingen din i Mikrotrening',
    })
  }

  return NextResponse.json({ ok: true })
}
