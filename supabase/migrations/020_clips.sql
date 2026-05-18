-- =============================================
-- Klipp-feature: sosial video-feed
-- =============================================

-- Musikk-bibliotek (royalty-free spor lastet opp av admin)
CREATE TABLE public.music_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  url text NOT NULL,
  duration_seconds integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Klipp
CREATE TABLE public.clips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  video_url text NOT NULL,
  thumbnail_url text,
  music_id uuid REFERENCES public.music_tracks(id) ON DELETE SET NULL,
  exercise_id uuid REFERENCES public.exercises(id) ON DELETE SET NULL,
  scope text NOT NULL CHECK (scope IN ('global', 'group')),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
  created_at timestamptz DEFAULT now()
);

-- Hvilke grupper et klipp deles med (kun relevant når scope = 'group')
CREATE TABLE public.clip_groups (
  clip_id uuid NOT NULL REFERENCES public.clips(id) ON DELETE CASCADE,
  group_id uuid NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  PRIMARY KEY (clip_id, group_id)
);

-- Reaksjoner (én per bruker per klipp, kan oppdateres)
CREATE TABLE public.clip_reactions (
  clip_id uuid NOT NULL REFERENCES public.clips(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  emoji text NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (clip_id, user_id)
);

-- Rapporter
CREATE TABLE public.clip_reports (
  clip_id uuid NOT NULL REFERENCES public.clips(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reason text,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (clip_id, user_id)
);

-- =============================================
-- Storage-buckets
-- =============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('clips', 'clips', false, 52428800, ARRAY['video/mp4', 'video/webm', 'video/quicktime']),
  ('music', 'music', true, 20971520, ARRAY['audio/mpeg', 'audio/mp4', 'audio/wav']);

-- =============================================
-- RLS
-- =============================================

ALTER TABLE public.music_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clip_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clip_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clip_reports ENABLE ROW LEVEL SECURITY;

-- Musikk: alle innloggede kan lese
CREATE POLICY "music_read" ON public.music_tracks
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Klipp: se globale klipp ELLER egne klipp ELLER klipp delt med egne grupper
CREATE POLICY "clips_select" ON public.clips
  FOR SELECT USING (
    auth.uid() IS NOT NULL
    AND expires_at > now()
    AND (
      scope = 'global'
      OR user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.clip_groups cg
        JOIN public.group_members gm ON gm.group_id = cg.group_id
        WHERE cg.clip_id = clips.id AND gm.user_id = auth.uid()
      )
    )
  );

-- Klipp: kun egne kan inserte
CREATE POLICY "clips_insert" ON public.clips
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Klipp: kun egne kan slette
CREATE POLICY "clips_delete" ON public.clips
  FOR DELETE USING (user_id = auth.uid());

-- clip_groups: innloggede gruppemedlemmer kan lese
CREATE POLICY "clip_groups_select" ON public.clip_groups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.group_members gm
      WHERE gm.group_id = clip_groups.group_id AND gm.user_id = auth.uid()
    )
  );

CREATE POLICY "clip_groups_insert" ON public.clip_groups
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.clips c WHERE c.id = clip_id AND c.user_id = auth.uid()
    )
  );

-- Reaksjoner: alle innloggede kan lese og legge til/endre
CREATE POLICY "reactions_select" ON public.clip_reactions
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "reactions_insert" ON public.clip_reactions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "reactions_update" ON public.clip_reactions
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "reactions_delete" ON public.clip_reactions
  FOR DELETE USING (user_id = auth.uid());

-- Rapporter: kan sende, kan ikke lese andres
CREATE POLICY "reports_insert" ON public.clip_reports
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- =============================================
-- Storage-policies
-- =============================================

-- Clips-bucket: kun eier kan laste opp
CREATE POLICY "clips_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'clips' AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Clips-bucket: innloggede kan lese (signed URLs håndterer tilgang)
CREATE POLICY "clips_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'clips' AND auth.uid() IS NOT NULL);

-- Clips-bucket: kun eier kan slette
CREATE POLICY "clips_storage_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'clips' AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Music-bucket: alle innloggede kan lese (public bucket)
CREATE POLICY "music_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'music' AND auth.uid() IS NOT NULL);

-- =============================================
-- Cleanup-funksjon (kalles fra cron-job.org)
-- =============================================

CREATE OR REPLACE FUNCTION public.delete_expired_clips()
RETURNS integer AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM public.clips WHERE expires_at < now();
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
