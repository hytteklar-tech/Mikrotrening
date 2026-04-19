-- Skiller push-varsler fra in-app motivasjonsmeldinger.
-- push_enabled: styrer om cron sender push til brukeren.
-- notifications_enabled: styrer in-app motivasjonsmeldinger (dashboardet).

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS push_enabled boolean DEFAULT true;

-- Brukere som allerede har sagt nei til varsler: sett push_enabled = false
UPDATE users SET push_enabled = false WHERE notifications_enabled = false;

-- notifications_enabled skal nå alltid være true (kun in-app meldinger)
UPDATE users SET notifications_enabled = true WHERE notifications_enabled = false;
