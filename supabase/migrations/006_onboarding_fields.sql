-- Onboarding: preferred_time og onesignal_id
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS preferred_time text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onesignal_id text;
