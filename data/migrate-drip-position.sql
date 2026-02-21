-- Add drip tracking to newsletter_subscribers
-- Run: npx wrangler d1 execute national-parks --file=data/migrate-drip-position.sql --remote

ALTER TABLE newsletter_subscribers ADD COLUMN drip_position INTEGER DEFAULT 0;
