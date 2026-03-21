-- Table for storing tool assessment results
CREATE TABLE public.tool_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_name TEXT NOT NULL,
  email TEXT,
  answers JSONB NOT NULL DEFAULT '{}',
  result JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tool_results ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (no login required)
CREATE POLICY "Anyone can insert tool results"
  ON public.tool_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service role can read all results
CREATE POLICY "Service role can read all results"
  ON public.tool_results
  FOR SELECT
  TO service_role
  USING (true);