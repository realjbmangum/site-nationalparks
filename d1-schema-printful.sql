-- Printful Products Table
-- Run: npx wrangler d1 execute national-parks --file=d1-schema-printful.sql --remote

CREATE TABLE IF NOT EXISTS printful_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  park_slug TEXT NOT NULL,
  printful_sync_id TEXT NOT NULL,
  printful_variant_id TEXT NOT NULL,
  product_type TEXT NOT NULL, -- 'mug', 'shirt', 'sticker', 'poster', 'tote'
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  mockup_url TEXT,
  checkout_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_printful_park ON printful_products(park_slug);
CREATE INDEX IF NOT EXISTS idx_printful_type ON printful_products(product_type);
