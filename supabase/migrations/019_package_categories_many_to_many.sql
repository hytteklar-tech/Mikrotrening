-- Migrer eksisterende category_id til junction-tabell
CREATE TABLE public.workout_package_categories (
  package_id uuid NOT NULL REFERENCES public.workout_packages(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.package_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (package_id, category_id)
);

ALTER TABLE public.workout_package_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "workout_package_categories_own" ON public.workout_package_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.workout_packages
      WHERE id = package_id AND user_id = auth.uid()
    )
  );

-- Migrer eksisterende data
INSERT INTO public.workout_package_categories (package_id, category_id)
SELECT id, category_id FROM public.workout_packages
WHERE category_id IS NOT NULL;

-- Fjern gammel kolonne
ALTER TABLE public.workout_packages DROP COLUMN category_id;
