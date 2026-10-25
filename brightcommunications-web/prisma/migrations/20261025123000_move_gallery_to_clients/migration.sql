UPDATE "ServiceProject"
SET clients = jsonb_set(
  clients,
  '{0,galleryImages}',
  to_jsonb("galleryImages"),
  true
)
WHERE jsonb_array_length(COALESCE(clients, '[]'::jsonb)) > 0
  AND array_length("galleryImages", 1) IS NOT NULL
  AND NOT (clients->0 ? 'galleryImages');
