-- Users (extends Supabase Auth)
CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  notifications_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Workout packages
CREATE TABLE public.workout_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Exercises within packages
CREATE TABLE public.exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES public.workout_packages(id) ON DELETE CASCADE,
  name text NOT NULL,
  reps integer NOT NULL CHECK (reps > 0),
  "order" integer NOT NULL DEFAULT 0
);

-- Daily training logs
CREATE TABLE public.daily_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  package_id uuid NOT NULL REFERENCES public.workout_packages(id) ON DELETE CASCADE,
  logged_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, logged_date)
);

-- Groups
CREATE TABLE public.groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  invite_code text UNIQUE NOT NULL DEFAULT upper(substring(md5(random()::text), 1, 6)),
  created_by uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Group members
CREATE TABLE public.group_members (
  group_id uuid NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

-- Users: kun seg selv
CREATE POLICY "users_own" ON public.users
  FOR ALL USING (id = auth.uid());

-- Workout packages: kun egne
CREATE POLICY "packages_own" ON public.workout_packages
  FOR ALL USING (user_id = auth.uid());

-- Exercises: via package-eierskap
CREATE POLICY "exercises_own" ON public.exercises
  FOR ALL USING (
    package_id IN (SELECT id FROM public.workout_packages WHERE user_id = auth.uid())
  );

-- Daily logs: egne + gruppemedlemmers (kun SELECT for andre)
CREATE POLICY "logs_own" ON public.daily_logs
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "logs_group_read" ON public.daily_logs
  FOR SELECT USING (
    user_id IN (
      SELECT gm.user_id FROM public.group_members gm
      WHERE gm.group_id IN (
        SELECT group_id FROM public.group_members WHERE user_id = auth.uid()
      )
    )
  );

-- Groups: alle innloggede kan lese, kun eier kan endre
CREATE POLICY "groups_read" ON public.groups
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "groups_own" ON public.groups
  FOR ALL USING (created_by = auth.uid());

-- Group members: se alle i egne grupper
CREATE POLICY "members_read" ON public.group_members
  FOR SELECT USING (
    group_id IN (SELECT group_id FROM public.group_members WHERE user_id = auth.uid())
  );

CREATE POLICY "members_join" ON public.group_members
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "members_leave" ON public.group_members
  FOR DELETE USING (user_id = auth.uid());
