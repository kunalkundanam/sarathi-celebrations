CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caption text NOT NULL CHECK (char_length(caption) BETWEEN 1 AND 180),
  image_path text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gallery_items TO anon, authenticated;
GRANT ALL ON public.gallery_items TO service_role;

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items are publicly readable"
ON public.gallery_items
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Service role manages gallery items"
ON public.gallery_items
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Gallery images are readable through signed URLs"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'gallery-images');