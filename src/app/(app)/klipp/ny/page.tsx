import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import KlippOpplasting from '@/components/features/KlippOpplasting'

export default async function NyttKlippPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: musicTracks } = await supabase
    .from('music_tracks')
    .select('id, title, artist, url, duration_seconds')
    .order('title', { ascending: true })

  const { data: memberships } = await supabase
    .from('group_members')
    .select('group_id, groups(id, name)')
    .eq('user_id', user.id)

  const groups = (memberships ?? []).flatMap(m => {
    const g = m.groups as { id: string; name: string } | { id: string; name: string }[] | null
    if (!g) return []
    const single = Array.isArray(g) ? g[0] : g
    if (!single) return []
    return [{ id: single.id, name: single.name }]
  })

  const { data: userExercises } = await supabase
    .from('exercises')
    .select('id, name, workout_packages!inner(user_id)')
    .eq('workout_packages.user_id', user.id)
    .order('name', { ascending: true })
    .limit(50)

  const exercises = (userExercises ?? []).map(e => ({ id: e.id, name: e.name }))

  return (
    <KlippOpplasting
      userId={user.id}
      musicTracks={musicTracks ?? []}
      groups={groups}
      exercises={exercises}
    />
  )
}
