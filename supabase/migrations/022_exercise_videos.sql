-- Videodemoer knyttet til egne øvelser
-- video_url = sti i clips-bucket (permanent, uavhengig av klipp-utløp)
-- youtube_url = alternativt eksternt klipp

CREATE TABLE public.exercise_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  user_exercise_id uuid REFERENCES public.user_exercises(id) ON DELETE SET NULL,
  exercise_name text NOT NULL,
  video_url text,
  youtube_url text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT has_video CHECK (video_url IS NOT NULL OR youtube_url IS NOT NULL)
);

ALTER TABLE public.exercise_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exercise_videos_select" ON public.exercise_videos
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "exercise_videos_insert" ON public.exercise_videos
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "exercise_videos_delete" ON public.exercise_videos
  FOR DELETE USING (user_id = auth.uid());
