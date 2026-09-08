CREATE TABLE public.event_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_slug text NOT NULL DEFAULT 'kunnat-2026-11-06',
  email text NOT NULL,
  organization text NOT NULL,
  group_size text NOT NULL,
  first_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.event_leads TO anon;
GRANT SELECT, INSERT ON public.event_leads TO authenticated;
GRANT ALL ON public.event_leads TO service_role;
ALTER TABLE public.event_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an event lead" ON public.event_leads FOR INSERT TO anon, authenticated WITH CHECK (true);