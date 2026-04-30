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

// POST /api/admin/push — send push til alle brukere med push aktivert
export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, body } = await req.json()
  if (!title || !body) return NextResponse.json({ error: 'Mangler tittel eller melding' }, { status: 400 })

  const db = createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: users } = await db
    .from('users')
    .select('onesignal_id, push_subscription, push_enabled')
    .eq('push_enabled', true)

  if (!users?.length) return NextResponse.json({ ok: true, sent: 0 })

  const playerIds = users.filter(u => u.onesignal_id).map(u => u.onesignal_id)
  const nativeSubscriptions = users.filter(u => u.push_subscription).map(u => u.push_subscription)

  await sendPushNotification({ playerIds, nativeSubscriptions, title, body })

  return NextResponse.json({ ok: true, sent: users.length })
}
