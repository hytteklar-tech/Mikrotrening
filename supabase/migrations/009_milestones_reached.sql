ALTER TABLE users
  ADD COLUMN IF NOT EXISTS milestones_reached int[] DEFAULT '{}';
