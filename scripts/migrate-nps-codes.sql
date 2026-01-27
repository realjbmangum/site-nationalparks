-- Migration: Extract NPS codes from existing nps_url values
-- Run with: npx wrangler d1 execute national-parks --file=scripts/migrate-nps-codes.sql --remote

-- Add nps_code column if it doesn't exist (run d1-schema.sql first if needed)
-- ALTER TABLE parks ADD COLUMN nps_code TEXT;
-- CREATE INDEX IF NOT EXISTS idx_parks_nps_code ON parks(nps_code);

-- Extract NPS codes from nps_url
-- Pattern: https://www.nps.gov/CODE/ -> CODE
-- The NPS code is always a 4-character lowercase string

UPDATE parks
SET nps_code = LOWER(
  SUBSTR(
    nps_url,
    INSTR(nps_url, 'nps.gov/') + 8,
    4
  )
)
WHERE nps_url IS NOT NULL
  AND nps_url LIKE '%nps.gov/%'
  AND LENGTH(SUBSTR(nps_url, INSTR(nps_url, 'nps.gov/') + 8)) >= 4;

-- Verify the migration
SELECT name, nps_url, nps_code
FROM parks
WHERE nps_code IS NOT NULL
ORDER BY name
LIMIT 10;

-- Count how many parks have NPS codes
SELECT
  COUNT(*) as total_parks,
  SUM(CASE WHEN nps_code IS NOT NULL THEN 1 ELSE 0 END) as with_nps_code,
  SUM(CASE WHEN nps_code IS NULL THEN 1 ELSE 0 END) as without_nps_code
FROM parks;
