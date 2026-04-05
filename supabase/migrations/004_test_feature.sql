-- Test-typer (system: user_id=null, bruker-egne: user_id=uuid)
CREATE TABLE public.test_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  unit text NOT NULL DEFAULT 'reps',
  higher_is_better boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Ferdiglagde tester (deles av alle)
INSERT INTO public.test_types (name, unit, higher_is_better) VALUES
  ('Push-ups',  'reps',     true),
  ('Sit-ups',   'reps',     true),
  ('Knebøy',    'reps',     true),
  ('Planken',   'sekunder', true),
  ('Burpees',   'reps',     true),
  ('Pull-ups',  'reps',     true);

-- Testresultater
CREATE TABLE public.test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  test_type_id uuid NOT NULL REFERENCES public.test_types(id) ON DELETE CASCADE,
  result numeric NOT NULL CHECK (result > 0),
  tested_date date NOT NULL DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.test_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

-- Alle kan lese systemtester, egne private tester kun for eier
CREATE POLICY "test_types_read" ON public.test_types
  FOR SELECT USING (user_id IS NULL OR user_id = auth.uid());

CREATE POLICY "test_types_insert" ON public.test_types
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "test_types_delete" ON public.test_types
  FOR DELETE USING (user_id = auth.uid());

-- Testresultater: kun egne
CREATE POLICY "test_results_own" ON public.test_results
  FOR ALL USING (user_id = auth.uid());
