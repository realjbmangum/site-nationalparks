-- Drip Emails table — stores all 30 email templates in D1
-- Run: npx wrangler d1 execute national-parks --file=data/migrate-drip-emails.sql --remote

CREATE TABLE IF NOT EXISTS drip_emails (
  position INTEGER PRIMARY KEY,
  subject TEXT NOT NULL,
  html TEXT NOT NULL
);
