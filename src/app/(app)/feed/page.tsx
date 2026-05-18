import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import KlippFeed from '@/components/features/KlippFeed'

export default async function FeedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Hent globale klipp (top 10 etter opprettelsesdato, sortering etter reaksjoner skjer client-side)
  const { data: globalRaw } = await supabase
    .from('clips')
    .select('id, video_url, thumbnail_url, scope, created_at, expires_at, user_id, users(display_name), music_tracks(id, title, artist, url, duration_seconds), exercises(id, name), clip_reactions(emoji, user_id)')
    .eq('scope', 'global')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(30)

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

  // Hent gruppe-klipp
  const groupIds = groups.map(g => g.id)
  let groupClipsRaw: typeof globalRaw = []
  if (groupIds.length > 0) {
    const { data } = await supabase
      .from('clips')
      .select('id, video_url, thumbnail_url, scope, created_at, expires_at, user_id, users(display_name), music_tracks(id, title, artist, url, duration_seconds), exercises(id, name), clip_reactions(emoji, user_id), clip_groups(group_id)')
      .eq('scope', 'group')
      .gt('expires_at', new Date().toISOString())
      .in('clip_groups.group_id', groupIds)
      .order('created_at', { ascending: false })
      .limit(50)
    groupClipsRaw = data ?? []
  }

  // Generer signed URLs for videoer
  async function withSignedUrl(clips: typeof globalRaw) {
    if (!clips) return []
    return Promise.all(clips.map(async (clip) => {
      const path = clip.video_url
      const { data } = await supabase.storage.from('clips').createSignedUrl(path, 3600)
      return { ...clip, signedVideoUrl: data?.signedUrl ?? '' }
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalClips = (await withSignedUrl(globalRaw ?? [])) as any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupClips = (await withSignedUrl(groupClipsRaw ?? [])) as any[]

  return (
    <KlippFeed
      globalClips={globalClips}
      groupClips={groupClips}
      groups={groups}
      currentUserId={user.id}
    />
  )
}
