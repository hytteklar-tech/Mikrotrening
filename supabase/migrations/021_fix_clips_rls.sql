-- =============================================
-- Fiks: gruppe-klipp vises ikke i feed
-- Årsak: clips_select bruker nested EXISTS-subquery mot clip_groups (som har RLS),
--        som igjen spør mot group_members (som også har RLS via members_read).
--        Tre lag med nested RLS blokkerer visning av gruppe-klipp.
-- Løsning: SECURITY DEFINER-funksjon, samme mønster som 002_fix_rls_recursion.sql
-- =============================================

CREATE OR REPLACE FUNCTION public.get_my_group_clip_ids()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT cg.clip_id
  FROM public.clip_groups cg
  JOIN public.group_members gm ON gm.group_id = cg.group_id
  WHERE gm.user_id = auth.uid()
$$;

-- Erstatt clips_select med versjon som bruker funksjonen
DROP POLICY IF EXISTS "clips_select" ON public.clips;

CREATE POLICY "clips_select" ON public.clips
  FOR SELECT USING (
    auth.uid() IS NOT NULL
    AND expires_at > now()
    AND (
      scope = 'global'
      OR user_id = auth.uid()
      OR id IN (SELECT public.get_my_group_clip_ids())
    )
  );
