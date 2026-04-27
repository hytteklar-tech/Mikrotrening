import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import SettingsClient from '@/components/features/SettingsClient'

export default async function SettingsPage() {
  noStore()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('display_name, notifications_enabled, push_enabled, preferred_times, onesignal_id, push_subscription')
    .eq('id', user.id)
    .single()

  const headersList = await headers()
  const ua = headersList.get('user-agent') ?? ''
  const isIos = /iPhone|iPad|iPod/.test(ua)
  const needsActivation = isIos ? !profile?.push_subscription : !profile?.onesignal_id

  return (
    <div className="p-4 space-y-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Innstillinger</h1>
      </div>
<SettingsClient profile={profile} userId={user.id} needsActivation={needsActivation} />
    </div>
  )
}
