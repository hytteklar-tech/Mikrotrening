-- Tillat samme pakke flere ganger per dag (fjern unik constraint per pakke per dag)
ALTER TABLE public.daily_logs
  DROP CONSTRAINT IF EXISTS daily_logs_user_id_logged_date_package_id_key;

-- Aktiv/inaktiv-flagg på treningspakker
ALTER TABLE public.workout_packages
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;
