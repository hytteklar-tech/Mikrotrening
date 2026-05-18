export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { sendPushNotification } from '@/lib/onesignal'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })

  const { clipId, reason } = await req.json()
  if (!clipId) return NextResponse.json({ error: 'Mangler clipId' }, { status: 400 })

  const db = createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await db
    .from('clip_reports')
    .insert({ clip_id: clipId, user_id: user.id, reason: reason ?? null })

  if (error && error.code !== '23505') {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Varsle admin
  const { data: { users: authUsers } } = await db.auth.admin.listUsers()
  const adminAuthId = authUsers.find(u => u.email === process.env.ADMIN_EMAIL)?.id

  const { data: adminUser } = adminAuthId ? await db
    .from('users')
    .select('onesignal_id, push_subscription, push_enabled')
    .eq('id', adminAuthId)
    .single() : { data: null }

  if (adminUser?.push_enabled) {
    const { data: reporter } = await db
      .from('users')
      .select('display_name')
      .eq('id', user.id)
      .single()

    await sendPushNotification({
      playerIds: adminUser.onesignal_id ? [adminUser.onesignal_id] : [],
      nativeSubscriptions: adminUser.push_subscription ? [adminUser.push_subscription] : [],
      title: 'Klipp rapportert',
      body: `${reporter?.display_name ?? 'En bruker'} rapporterte et klipp${reason ? ': ' + reason : ''}`,
    })
  }

  return NextResponse.json({ ok: true })
}
