DROP POLICY IF EXISTS "Anyone can insert quotes" ON public.quotes;
DROP POLICY IF EXISTS "Only authenticated users can view quotes" ON public.quotes;

CREATE POLICY "Public can submit quotes with valid data"
ON public.quotes
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(phone) BETWEEN 1 AND 50
  AND length(website_type) BETWEEN 1 AND 100
  AND length(platform) BETWEEN 1 AND 100
  AND (pages_or_products IS NULL OR length(pages_or_products) <= 2000)
  AND (design_references IS NULL OR length(design_references) <= 2000)
);
