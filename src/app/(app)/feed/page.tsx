export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import KlippFeed from '@/components/features/KlippFeed'

export default async function FeedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Hent klipp uten embedded joins (unngår PostgREST FK-problemer)
  const { data: clips, error: klippFeil } = await supabase
    .from('clips')
    .select('id, video_url, thumbnail_url, scope, created_at, expires_at, user_id, music_id, exercise_id')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(100)

  if (klippFeil) console.error('[feed] kode=' + klippFeil.code + ' msg=' + klippFeil.message)

  const clipIds = (clips ?? []).map(c => c.id)
  const userIds = [...new Set((clips ?? []).map(c => c.user_id))]
  const musicIds = [...new Set((clips ?? []).filter(c => c.music_id).map(c => c.music_id as string))]
  const exerciseIds = [...new Set((clips ?? []).filter(c => c.exercise_id).map(c => c.exercise_id as string))]

  const [usersRes, musicRes, exercisesRes, reactionsRes] = await Promise.all([
    userIds.length > 0
      ? supabase.from('users').select('id, display_name').in('id', userIds)
      : Promise.resolve({ data: [] }),
    musicIds.length > 0
      ? supabase.from('music_tracks').select('id, title, artist, url, duration_seconds').in('id', musicIds)
      : Promise.resolve({ data: [] }),
    exerciseIds.length > 0
      ? supabase.from('exercises').select('id, name').in('id', exerciseIds)
      : Promise.resolve({ data: [] }),
    clipIds.length > 0
      ? supabase.from('clip_reactions').select('clip_id, emoji, user_id').in('clip_id', clipIds)
      : Promise.resolve({ data: [] }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const alleKlipp: any[] = (clips ?? []).map(clip => ({
    ...clip,
    users: (usersRes.data ?? []).find((u: { id: string }) => u.id === clip.user_id) ?? null,
    music_tracks: (musicRes.data ?? []).find((m: { id: string }) => m.id === clip.music_id) ?? null,
    exercises: (exercisesRes.data ?? []).find((e: { id: string }) => e.id === clip.exercise_id) ?? null,
    clip_reactions: (reactionsRes.data ?? []).filter((r: { clip_id: string }) => r.clip_id === clip.id),
  }))

  const globalRaw = alleKlipp.filter(c => c.scope === 'global')
  const groupClipsRaw = alleKlipp.filter(c => c.scope === 'group')

  // Hent brukerens grupper
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

  // Generer signed URLs
  async function withSignedUrl(clips: typeof globalRaw) {
    if (!clips) return []
    return Promise.all(clips.map(async (clip) => {
      const { data } = await supabase.storage.from('clips').createSignedUrl(clip.video_url, 3600)
      return { ...clip, signedVideoUrl: data?.signedUrl ?? '' }
    }))
  }

  const globalClips = await withSignedUrl(globalRaw)
  const groupClips = await withSignedUrl(groupClipsRaw)

  return (
    <KlippFeed
      globalClips={globalClips as Parameters<typeof KlippFeed>[0]['globalClips']}
      groupClips={groupClips as Parameters<typeof KlippFeed>[0]['groupClips']}
      groups={groups}
      currentUserId={user.id}
    />
  )
}
