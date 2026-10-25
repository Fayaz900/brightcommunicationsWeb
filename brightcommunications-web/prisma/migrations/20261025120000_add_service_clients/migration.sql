ALTER TABLE "ServiceProject"
ADD COLUMN "clients" JSONB;

UPDATE "ServiceProject"
SET "clients" = jsonb_build_array(
  jsonb_build_object(
    'name', "client",
    'year', "year",
    'industry', "industry",
    'summary', ''
  )
);
