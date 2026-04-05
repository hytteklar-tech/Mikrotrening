-- Tillat flere treninger per dag (én per pakke)
-- Erstatter UNIQUE(user_id, logged_date) med UNIQUE(user_id, logged_date, package_id)

ALTER TABLE public.daily_logs
  DROP CONSTRAINT IF EXISTS daily_logs_user_id_logged_date_key;

ALTER TABLE public.daily_logs
  ADD CONSTRAINT daily_logs_user_id_logged_date_package_id_key
  UNIQUE (user_id, logged_date, package_id);
