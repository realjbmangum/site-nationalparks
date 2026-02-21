/**
 * D1 Database Helper
 *
 * This module provides typed access to the Cloudflare D1 database.
 * Use getRuntime() from Astro locals to access the DB binding.
 */

// Types
export interface Park {
  id: number;
  slug: string;
  name: string;
  state: string;
  states: string | null; // JSON array
  region: string;
  latitude: number | null;
  longitude: number | null;
  established: string | null;
  size_acres: number | null;
  annual_visitors: number;
  entrance_fee: number;
  reservation_required: number;
  description: string | null;
  ai_description: string | null;
  weather_notes: string | null;
  best_seasons: string | null; // JSON array
  things_to_do: string | null; // JSON array
  top_hikes: string | null; // JSON array
  wildlife: string | null; // JSON array
  insider_tips: string | null; // JSON array
  difficulty: 'family' | 'moderate' | 'challenging' | 'expert';
  nearest_airports: string | null; // JSON array
  gateway_cities: string | null; // JSON array
  photo_url: string | null;
  features: string | null; // JSON object
  nps_url: string | null;
  nps_code: string | null;  // NPS API park code (e.g., 'yell' for Yellowstone)
  verified: number;
  featured: number;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: number;
  park_id: number | null;
  park_name: string | null;
  contact_name: string;
  contact_email: string;
  suggestion_type: string;
  message: string;
  status: string;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  status: string;
  source: string | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
  drip_position: number;
}

export interface PrintfulProduct {
  id: number;
  park_slug: string;
  printful_sync_id: string;
  printful_variant_id: string;
  product_type: string;
  name: string;
  price_cents: number;
  mockup_url: string | null;
  checkout_url: string | null;
  created_at: string;
}

// Helper to parse JSON arrays from D1
export function parseJsonArray<T = string>(json: string | null): T[] {
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

// Helper to parse JSON object
export function parseJsonObject<T = Record<string, unknown>>(
  json: string | null
): T | null {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// Park features type
export interface ParkFeatures {
  camping?: boolean;
  lodging?: boolean;
  rv_facilities?: boolean;
  wheelchair_accessible?: boolean;
  dog_friendly?: boolean;
}

// =============================================================================
// Park Queries
// =============================================================================

export async function getAllParks(db: D1Database): Promise<Park[]> {
  const result = await db
    .prepare('SELECT * FROM parks ORDER BY name ASC')
    .all<Park>();
  return result.results;
}

export async function getParkBySlug(
  db: D1Database,
  slug: string
): Promise<Park | null> {
  const result = await db
    .prepare('SELECT * FROM parks WHERE slug = ?')
    .bind(slug)
    .first<Park>();
  return result;
}

export async function getParksByState(
  db: D1Database,
  state: string
): Promise<Park[]> {
  const result = await db
    .prepare('SELECT * FROM parks WHERE state = ? ORDER BY name ASC')
    .bind(state)
    .all<Park>();
  return result.results;
}

export async function getParksByRegion(
  db: D1Database,
  region: string
): Promise<Park[]> {
  const result = await db
    .prepare('SELECT * FROM parks WHERE region = ? ORDER BY name ASC')
    .bind(region)
    .all<Park>();
  return result.results;
}

export async function getFeaturedParks(
  db: D1Database,
  limit = 6
): Promise<Park[]> {
  const result = await db
    .prepare(
      'SELECT * FROM parks ORDER BY annual_visitors DESC LIMIT ?'
    )
    .bind(limit)
    .all<Park>();
  return result.results;
}

export async function searchParks(
  db: D1Database,
  query: string,
  limit = 10
): Promise<Park[]> {
  const searchTerm = `%${query}%`;
  const result = await db
    .prepare(
      'SELECT * FROM parks WHERE name LIKE ? OR state LIKE ? ORDER BY name ASC LIMIT ?'
    )
    .bind(searchTerm, searchTerm, limit)
    .all<Park>();
  return result.results;
}

export async function getTotalParkCount(db: D1Database): Promise<number> {
  const result = await db
    .prepare('SELECT COUNT(*) as count FROM parks')
    .first<{ count: number }>();
  return result?.count ?? 0;
}

export async function getStatesWithCounts(
  db: D1Database
): Promise<{ state: string; count: number }[]> {
  const result = await db
    .prepare(
      'SELECT state, COUNT(*) as count FROM parks GROUP BY state ORDER BY state ASC'
    )
    .all<{ state: string; count: number }>();
  return result.results;
}

export async function getRegionsWithCounts(
  db: D1Database
): Promise<{ region: string; count: number }[]> {
  const result = await db
    .prepare(
      'SELECT region, COUNT(*) as count FROM parks GROUP BY region ORDER BY count DESC'
    )
    .all<{ region: string; count: number }>();
  return result.results;
}

export async function getParksByDifficulty(
  db: D1Database,
  difficulty: string
): Promise<Park[]> {
  const result = await db
    .prepare('SELECT * FROM parks WHERE difficulty = ? ORDER BY name ASC')
    .bind(difficulty)
    .all<Park>();
  return result.results;
}

// =============================================================================
// Submission Queries
// =============================================================================

export async function createSubmission(
  db: D1Database,
  submission: Omit<Submission, 'id' | 'created_at'>
): Promise<number> {
  const result = await db
    .prepare(
      `INSERT INTO submissions (park_id, park_name, contact_name, contact_email, suggestion_type, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      submission.park_id,
      submission.park_name,
      submission.contact_name,
      submission.contact_email,
      submission.suggestion_type,
      submission.message,
      submission.status || 'pending'
    )
    .run();
  return result.meta.last_row_id;
}

// =============================================================================
// Contact Message Queries
// =============================================================================

export async function createContactMessage(
  db: D1Database,
  message: Omit<ContactMessage, 'id' | 'created_at'>
): Promise<number> {
  const result = await db
    .prepare(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES (?, ?, ?, ?)`
    )
    .bind(message.name, message.email, message.subject, message.message)
    .run();
  return result.meta.last_row_id;
}

// =============================================================================
// Newsletter Queries
// =============================================================================

export async function addNewsletterSubscriber(
  db: D1Database,
  email: string,
  source?: string
): Promise<{ success: boolean; error?: string; alreadySubscribed?: boolean }> {
  // Check if already subscribed
  const existing = await db
    .prepare('SELECT id, status FROM newsletter_subscribers WHERE email = ?')
    .bind(email.toLowerCase())
    .first<{ id: number; status: string }>();

  if (existing) {
    if (existing.status === 'active') {
      return { success: true, alreadySubscribed: true };
    }
    // Reactivate if previously unsubscribed
    await db
      .prepare(
        'UPDATE newsletter_subscribers SET status = ?, subscribed_at = CURRENT_TIMESTAMP, unsubscribed_at = NULL WHERE id = ?'
      )
      .bind('active', existing.id)
      .run();
    return { success: true };
  }

  // Insert new subscriber
  try {
    await db
      .prepare(
        'INSERT INTO newsletter_subscribers (email, source) VALUES (?, ?)'
      )
      .bind(email.toLowerCase(), source || null)
      .run();
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to subscribe' };
  }
}

export async function unsubscribeEmail(
  db: D1Database,
  email: string
): Promise<{ success: boolean }> {
  try {
    await db
      .prepare(
        'UPDATE newsletter_subscribers SET status = ?, unsubscribed_at = CURRENT_TIMESTAMP WHERE email = ? AND status = ?'
      )
      .bind('unsubscribed', email.toLowerCase(), 'active')
      .run();
    return { success: true };
  } catch {
    return { success: false };
  }
}

// =============================================================================
// Region Data (Static)
// =============================================================================

export const REGIONS = {
  west: {
    slug: 'west',
    name: 'Western US',
    description:
      'Discover dramatic landscapes from desert canyons to towering peaks across the American West.',
    heroImage:
      'https://pub-cfaf7e3298404fd39f70c949617f3932.r2.dev/regions/region-west.png',
  },
  alaska: {
    slug: 'alaska',
    name: 'Alaska',
    description:
      "Experience America's last frontier with vast wilderness, glaciers, and untamed wildlife.",
    heroImage:
      'https://pub-cfaf7e3298404fd39f70c949617f3932.r2.dev/regions/region-alaska.png',
  },
  southeast: {
    slug: 'southeast',
    name: 'Southeast',
    description:
      'Explore ancient forests, coastal wetlands, and rich cultural history.',
    heroImage:
      'https://pub-cfaf7e3298404fd39f70c949617f3932.r2.dev/regions/region-southeast.png',
  },
  northeast: {
    slug: 'northeast',
    name: 'Northeast',
    description:
      'Discover rugged coastlines, scenic valleys, and accessible wilderness.',
    heroImage:
      'https://pub-cfaf7e3298404fd39f70c949617f3932.r2.dev/regions/region-northeast.png',
  },
  midwest: {
    slug: 'midwest',
    name: 'Midwest',
    description:
      'Find hidden gems from underground caves to remote island wilderness.',
    heroImage:
      'https://pub-cfaf7e3298404fd39f70c949617f3932.r2.dev/regions/region-midwest.png',
  },
  islands: {
    slug: 'islands',
    name: 'Islands & Pacific',
    description:
      'Visit tropical paradises from Hawaii to American Samoa and the Virgin Islands.',
    heroImage:
      'https://pub-cfaf7e3298404fd39f70c949617f3932.r2.dev/regions/region-islands.png',
  },
} as const;

export type RegionSlug = keyof typeof REGIONS;

// =============================================================================
// State Helpers
// =============================================================================

// Convert state slug to state name (e.g., "north-carolina" -> "North Carolina")
export function stateSlugToName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Convert state name to slug (e.g., "North Carolina" -> "north-carolina")
export function stateNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// Get all unique states from the database
export async function getAllStates(db: D1Database): Promise<string[]> {
  const result = await db
    .prepare('SELECT DISTINCT state FROM parks ORDER BY state ASC')
    .all<{ state: string }>();
  return result.results.map((r) => r.state);
}

// Get parks by state name (exact match)
export async function getParksByStateName(
  db: D1Database,
  stateName: string
): Promise<Park[]> {
  const result = await db
    .prepare('SELECT * FROM parks WHERE state = ? ORDER BY name ASC')
    .bind(stateName)
    .all<Park>();
  return result.results;
}

// =============================================================================
// Printful Product Queries
// =============================================================================

export async function getProductsByPark(
  db: D1Database,
  parkSlug: string
): Promise<PrintfulProduct[]> {
  const result = await db
    .prepare('SELECT * FROM printful_products WHERE park_slug = ? ORDER BY product_type ASC')
    .bind(parkSlug)
    .all<PrintfulProduct>();
  return result.results;
}

export async function getParksWithProducts(
  db: D1Database
): Promise<{ park_slug: string; product_count: number }[]> {
  const result = await db
    .prepare(
      'SELECT park_slug, COUNT(*) as product_count FROM printful_products GROUP BY park_slug ORDER BY park_slug ASC'
    )
    .all<{ park_slug: string; product_count: number }>();
  return result.results;
}

export async function getProductTypes(
  db: D1Database
): Promise<string[]> {
  const result = await db
    .prepare('SELECT DISTINCT product_type FROM printful_products ORDER BY product_type ASC')
    .all<{ product_type: string }>();
  return result.results.map((r) => r.product_type);
}

export async function getProductsByType(
  db: D1Database,
  productType: string
): Promise<PrintfulProduct[]> {
  const result = await db
    .prepare('SELECT * FROM printful_products WHERE product_type = ? ORDER BY park_slug ASC')
    .bind(productType)
    .all<PrintfulProduct>();
  return result.results;
}

// US States metadata for SEO and display
export const US_STATES: Record<string, { name: string; abbreviation: string }> = {
  'alabama': { name: 'Alabama', abbreviation: 'AL' },
  'alaska': { name: 'Alaska', abbreviation: 'AK' },
  'arizona': { name: 'Arizona', abbreviation: 'AZ' },
  'arkansas': { name: 'Arkansas', abbreviation: 'AR' },
  'california': { name: 'California', abbreviation: 'CA' },
  'colorado': { name: 'Colorado', abbreviation: 'CO' },
  'connecticut': { name: 'Connecticut', abbreviation: 'CT' },
  'delaware': { name: 'Delaware', abbreviation: 'DE' },
  'florida': { name: 'Florida', abbreviation: 'FL' },
  'georgia': { name: 'Georgia', abbreviation: 'GA' },
  'hawaii': { name: 'Hawaii', abbreviation: 'HI' },
  'idaho': { name: 'Idaho', abbreviation: 'ID' },
  'illinois': { name: 'Illinois', abbreviation: 'IL' },
  'indiana': { name: 'Indiana', abbreviation: 'IN' },
  'iowa': { name: 'Iowa', abbreviation: 'IA' },
  'kansas': { name: 'Kansas', abbreviation: 'KS' },
  'kentucky': { name: 'Kentucky', abbreviation: 'KY' },
  'louisiana': { name: 'Louisiana', abbreviation: 'LA' },
  'maine': { name: 'Maine', abbreviation: 'ME' },
  'maryland': { name: 'Maryland', abbreviation: 'MD' },
  'massachusetts': { name: 'Massachusetts', abbreviation: 'MA' },
  'michigan': { name: 'Michigan', abbreviation: 'MI' },
  'minnesota': { name: 'Minnesota', abbreviation: 'MN' },
  'mississippi': { name: 'Mississippi', abbreviation: 'MS' },
  'missouri': { name: 'Missouri', abbreviation: 'MO' },
  'montana': { name: 'Montana', abbreviation: 'MT' },
  'nebraska': { name: 'Nebraska', abbreviation: 'NE' },
  'nevada': { name: 'Nevada', abbreviation: 'NV' },
  'new-hampshire': { name: 'New Hampshire', abbreviation: 'NH' },
  'new-jersey': { name: 'New Jersey', abbreviation: 'NJ' },
  'new-mexico': { name: 'New Mexico', abbreviation: 'NM' },
  'new-york': { name: 'New York', abbreviation: 'NY' },
  'north-carolina': { name: 'North Carolina', abbreviation: 'NC' },
  'north-dakota': { name: 'North Dakota', abbreviation: 'ND' },
  'ohio': { name: 'Ohio', abbreviation: 'OH' },
  'oklahoma': { name: 'Oklahoma', abbreviation: 'OK' },
  'oregon': { name: 'Oregon', abbreviation: 'OR' },
  'pennsylvania': { name: 'Pennsylvania', abbreviation: 'PA' },
  'rhode-island': { name: 'Rhode Island', abbreviation: 'RI' },
  'south-carolina': { name: 'South Carolina', abbreviation: 'SC' },
  'south-dakota': { name: 'South Dakota', abbreviation: 'SD' },
  'tennessee': { name: 'Tennessee', abbreviation: 'TN' },
  'texas': { name: 'Texas', abbreviation: 'TX' },
  'utah': { name: 'Utah', abbreviation: 'UT' },
  'vermont': { name: 'Vermont', abbreviation: 'VT' },
  'virginia': { name: 'Virginia', abbreviation: 'VA' },
  'washington': { name: 'Washington', abbreviation: 'WA' },
  'west-virginia': { name: 'West Virginia', abbreviation: 'WV' },
  'wisconsin': { name: 'Wisconsin', abbreviation: 'WI' },
  'wyoming': { name: 'Wyoming', abbreviation: 'WY' },
  // Territories
  'american-samoa': { name: 'American Samoa', abbreviation: 'AS' },
  'guam': { name: 'Guam', abbreviation: 'GU' },
  'puerto-rico': { name: 'Puerto Rico', abbreviation: 'PR' },
  'virgin-islands': { name: 'Virgin Islands', abbreviation: 'VI' },
};
