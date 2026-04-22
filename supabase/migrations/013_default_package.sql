-- Opprett default treningspakke "Mikro 30" med knebøy for nye brukere
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  package_id uuid;
BEGIN
  -- Opprett brukerprofil
  INSERT INTO public.users (id)
  VALUES (new.id);

  -- Opprett default pakke
  INSERT INTO public.workout_packages (user_id, name, is_active)
  VALUES (new.id, 'Mikro 30', true)
  RETURNING id INTO package_id;

  -- Legg til knebøy
  INSERT INTO public.exercises (package_id, name, reps, "order")
  VALUES (package_id, 'Knebøy', 15, 1);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
