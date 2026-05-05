-- Kategorier for treningspakker
CREATE TABLE public.package_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.package_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "package_categories_own" ON public.package_categories
  FOR ALL USING (user_id = auth.uid());

-- Kobling fra pakke til kategori (løs, valgfri)
ALTER TABLE public.workout_packages ADD COLUMN category_id uuid REFERENCES public.package_categories(id) ON DELETE SET NULL;
