-- Run only on an environment where
-- 20260529115048_update_file_upload_metadata has not been applied.
--
-- After this script succeeds:
--   npx prisma migrate resolve --applied 20260529115048_update_file_upload_metadata
--   npx prisma migrate deploy

BEGIN;

ALTER TABLE "FileUpload"
ADD COLUMN IF NOT EXISTS "filePath" TEXT;

ALTER TABLE "FileUpload"
ADD COLUMN IF NOT EXISTS "uploadedById" TEXT;

ALTER TABLE "FileUpload"
ALTER COLUMN "fileUrl" DROP NOT NULL;

UPDATE "FileUpload"
SET "filePath" = CASE
  WHEN "fileUrl" LIKE '%/storage/v1/object/public/%'
    THEN regexp_replace(
      "fileUrl",
      '^.*/storage/v1/object/public/[^/]+/',
      ''
    )
  WHEN "fileUrl" LIKE '%/storage/v1/object/sign/%'
    THEN regexp_replace(
      regexp_replace(
        "fileUrl",
        '^.*/storage/v1/object/sign/[^/]+/',
        ''
      ),
      '\?.*$',
      ''
    )
  ELSE NULL
END
WHERE ("filePath" IS NULL OR btrim("filePath") = '')
  AND "fileUrl" IS NOT NULL;

DO $$
DECLARE
  unresolved_count BIGINT;
BEGIN
  SELECT count(*)
  INTO unresolved_count
  FROM "FileUpload"
  WHERE "filePath" IS NULL OR btrim("filePath") = '';

  IF unresolved_count > 0 THEN
    RAISE EXCEPTION
      'Cannot enforce FileUpload.filePath: % legacy rows need manual backfill',
      unresolved_count;
  END IF;
END $$;

ALTER TABLE "FileUpload"
ALTER COLUMN "filePath" SET NOT NULL;

COMMIT;
