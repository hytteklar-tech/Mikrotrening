-- Bytt fra én preferred_time til array av tidspunkter
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS preferred_times text[] DEFAULT '{}';

-- Migrer eksisterende data
UPDATE public.users
SET preferred_times = ARRAY[preferred_time]
WHERE preferred_time IS NOT NULL AND preferred_time != 'manual';

ALTER TABLE public.users DROP COLUMN IF EXISTS preferred_time;
