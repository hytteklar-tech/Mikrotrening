import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })

  const { exerciseName, userExerciseId, videoUrl, youtubeUrl } = await req.json()
  if (!exerciseName?.trim()) return NextResponse.json({ error: 'Mangler navn' }, { status: 400 })
  if (!videoUrl && !youtubeUrl) return NextResponse.json({ error: 'Mangler video' }, { status: 400 })

  const { error } = await supabase.from('exercise_videos').insert({
    user_id: user.id,
    user_exercise_id: userExerciseId ?? null,
    exercise_name: exerciseName.trim(),
    video_url: videoUrl ?? null,
    youtube_url: youtubeUrl ?? null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
