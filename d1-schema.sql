-- BestUSNationalParks.com D1 Schema
-- Database: parks_db

-- ============================================
-- PARKS LOCATIONS (Main data table)
-- ============================================
CREATE TABLE IF NOT EXISTS parks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,

  -- Location
  state TEXT NOT NULL,           -- Primary state
  states TEXT,                   -- JSON array for multi-state parks
  region TEXT NOT NULL,          -- west, alaska, southeast, northeast, midwest, islands
  latitude REAL,
  longitude REAL,

  -- Park info
  established TEXT,              -- Date string YYYY-MM-DD
  size_acres INTEGER,
  annual_visitors INTEGER DEFAULT 0,
  entrance_fee REAL DEFAULT 0,
  reservation_required INTEGER DEFAULT 0,

  -- Content
  description TEXT,
  ai_description TEXT,
  weather_notes TEXT,

  -- Categorization (stored as JSON arrays)
  best_seasons TEXT,             -- JSON array: ["spring", "summer"]
  things_to_do TEXT,             -- JSON array: ["Hiking", "Wildlife viewing"]
  top_hikes TEXT,                -- JSON array of objects
  wildlife TEXT,                 -- JSON array: ["Bear", "Elk"]
  insider_tips TEXT,             -- JSON array

  -- Difficulty
  difficulty TEXT DEFAULT 'moderate', -- family, moderate, challenging, expert

  -- Transportation
  nearest_airports TEXT,         -- JSON array
  gateway_cities TEXT,           -- JSON array

  -- Media
  photo_url TEXT,

  -- Features (stored as JSON object)
  features TEXT,                 -- JSON: {"camping": true, "lodging": true, ...}

  -- External links
  nps_url TEXT,
  nps_code TEXT,           -- NPS API park code (e.g., 'yell' for Yellowstone)

  -- Status
  verified INTEGER DEFAULT 0,
  featured INTEGER DEFAULT 0,

  -- Metadata
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_parks_slug ON parks(slug);
CREATE INDEX IF NOT EXISTS idx_parks_state ON parks(state);
CREATE INDEX IF NOT EXISTS idx_parks_region ON parks(region);
CREATE INDEX IF NOT EXISTS idx_parks_visitors ON parks(annual_visitors DESC);
CREATE INDEX IF NOT EXISTS idx_parks_difficulty ON parks(difficulty);
CREATE INDEX IF NOT EXISTS idx_parks_nps_code ON parks(nps_code);

-- ============================================
-- SUBMISSIONS (User tips & corrections)
-- ============================================
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  park_id INTEGER,
  park_name TEXT,

  -- Contact info
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,

  -- Content
  suggestion_type TEXT DEFAULT 'tip', -- correction, tip, photo, other
  message TEXT NOT NULL,

  -- Status
  status TEXT DEFAULT 'pending', -- pending, approved, rejected

  -- Metadata
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (park_id) REFERENCES parks(id)
);

CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_park ON submissions(park_id);

-- ============================================
-- CONTACT MESSAGES
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active', -- active, unsubscribed, bounced
  source TEXT,
  subscribed_at TEXT DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
