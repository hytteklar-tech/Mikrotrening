-- Fjern ALLE eksisterende policies på begge tabeller
DROP POLICY IF EXISTS "members_read" ON public.group_members;
DROP POLICY IF EXISTS "members_join" ON public.group_members;
DROP POLICY IF EXISTS "members_leave" ON public.group_members;
DROP POLICY IF EXISTS "logs_own" ON public.daily_logs;
DROP POLICY IF EXISTS "logs_group_read" ON public.daily_logs;

-- SECURITY DEFINER-funksjon: henter brukerens gruppe-IDer uten å trigge RLS
CREATE OR REPLACE FUNCTION public.get_my_group_ids()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT group_id FROM public.group_members WHERE user_id = auth.uid()
$$;

-- Gjenopprett group_members-policies (uten rekursjon)
CREATE POLICY "members_read" ON public.group_members
  FOR SELECT USING (
    group_id IN (SELECT public.get_my_group_ids())
  );

CREATE POLICY "members_join" ON public.group_members
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "members_leave" ON public.group_members
  FOR DELETE USING (user_id = auth.uid());

-- Gjenopprett daily_logs-policies
CREATE POLICY "logs_own" ON public.daily_logs
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "logs_group_read" ON public.daily_logs
  FOR SELECT USING (
    user_id IN (
      SELECT user_id FROM public.group_members
      WHERE group_id IN (SELECT public.get_my_group_ids())
    )
  );
