-- Add unit to exercises in packages
ALTER TABLE public.exercises ADD COLUMN unit text NOT NULL DEFAULT 'reps' CHECK (unit IN ('reps', 'sek'));

-- Personal exercise library per user
CREATE TABLE public.user_exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  unit text NOT NULL DEFAULT 'reps' CHECK (unit IN ('reps', 'sek')),
  suggested_value integer NOT NULL DEFAULT 10,
  muscle_group text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.user_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_exercises_own" ON public.user_exercises
  FOR ALL USING (user_id = auth.uid());
