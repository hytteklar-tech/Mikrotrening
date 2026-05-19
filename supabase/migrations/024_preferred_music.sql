ALTER TABLE public.users ADD COLUMN IF NOT EXISTS preferred_music_id uuid REFERENCES public.music_tracks(id) ON DELETE SET NULL;
