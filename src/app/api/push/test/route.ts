import { createClient } from '@/lib/supabase/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { sendPushNotification } from '@/lib/onesignal'
import { NextResponse } from 'next/server'
import webpush from 'web-push'

// GET /api/push/test — sender testvarsel til innlogget bruker og returnerer diagnose
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })

  const admin = createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await admin
    .from('users')
    .select('onesignal_id, push_subscription, push_enabled, preferred_times, display_name')
    .eq('id', user.id)
    .single()

  const diag: Record<string, any> = {
    push_enabled: profile?.push_enabled,
    preferred_times: profile?.preferred_times,
    has_onesignal_id: !!profile?.onesignal_id,
    has_push_subscription: !!profile?.push_subscription,
  }

  if (!profile?.onesignal_id && !profile?.push_subscription) {
    return NextResponse.json({ ...diag, error: 'Ingen push-abonnement registrert på denne brukeren' })
  }

  const results: Record<string, any> = {}

  if (profile.onesignal_id) {
    try {
      const res = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Key ${process.env.ONESIGNAL_REST_API_KEY}`,
        },
        body: JSON.stringify({
          app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          include_subscription_ids: [profile.onesignal_id],
          headings: { en: 'Test', nb: 'Test' },
          contents: { en: 'Testvarsel fra Mikrotrening 🔔', nb: 'Testvarsel fra Mikrotrening 🔔' },
        }),
      })
      const json = await res.json()
      results.onesignal = { status: res.status, body: json }
    } catch (e: any) {
      results.onesignal = { error: e.message }
    }
  }

  if (profile.push_subscription) {
    try {
      webpush.setVapidDetails(
        process.env.VAPID_SUBJECT!,
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        process.env.VAPID_PRIVATE_KEY!,
      )
      await webpush.sendNotification(
        profile.push_subscription,
        JSON.stringify({ title: 'Test', body: 'Testvarsel fra Mikrotrening 🔔' })
      )
      results.webpush = { ok: true }
    } catch (e: any) {
      results.webpush = { error: e.message, statusCode: e.statusCode, body: e.body }
    }
  }

  return NextResponse.json({ ...diag, results })
}
