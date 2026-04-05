-- Tillat lesing av display_name for andre brukere i samme gruppe
CREATE POLICY "users_group_members_read" ON public.users
  FOR SELECT USING (
    id IN (
      SELECT user_id FROM public.group_members
      WHERE group_id IN (SELECT public.get_my_group_ids())
    )
  );
