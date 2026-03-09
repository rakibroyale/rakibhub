-- Create a table for quote requests
CREATE TABLE public.quotes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    website_type TEXT NOT NULL,
    platform TEXT NOT NULL,
    pages_or_products TEXT,
    design_references TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can submit a quote)
CREATE POLICY "Anyone can insert quotes" 
ON public.quotes 
FOR INSERT 
TO public
WITH CHECK (true);

-- Only authenticated users (admins) can view quotes
CREATE POLICY "Only authenticated users can view quotes" 
ON public.quotes 
FOR SELECT 
TO authenticated
USING (true);