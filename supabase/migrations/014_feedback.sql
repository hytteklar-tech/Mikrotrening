-- Feedback fra brukere
CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Svar fra admin (Arild)
CREATE TABLE public.feedback_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id uuid NOT NULL REFERENCES public.feedback(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_replies ENABLE ROW LEVEL SECURITY;

-- Bruker kan se og sende sin egen feedback
CREATE POLICY "feedback_select_own" ON public.feedback
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "feedback_insert_own" ON public.feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Bruker kan se svar på sin egen feedback
CREATE POLICY "feedback_replies_select_own" ON public.feedback_replies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.feedback
      WHERE feedback.id = feedback_replies.feedback_id
        AND feedback.user_id = auth.uid()
    )
  );

-- Service role (admin API-rute) håndterer admin-tilgang
-- Ingen direkte admin-policy — admin bruker service_role key server-side
