/**
 * Printful Product Sync Script
 *
 * Fetches products from Printful API and upserts into D1.
 * Expects product names to follow convention: "Park Name - Product Type"
 * e.g. "Yellowstone - Badge Mug", "Zion - Badge T-Shirt"
 *
 * Usage:
 *   PRINTFUL_API_KEY=xxx npx tsx scripts/printful-sync.ts
 *
 * Or generate SQL file:
 *   PRINTFUL_API_KEY=xxx npx tsx scripts/printful-sync.ts --sql > printful-sync.sql
 *   npx wrangler d1 execute national-parks --file=printful-sync.sql --remote
 */

const API_BASE = 'https://api.printful.com';
const API_KEY = process.env.PRINTFUL_API_KEY;

if (!API_KEY) {
  console.error('Error: PRINTFUL_API_KEY environment variable required');
  process.exit(1);
}

const sqlMode = process.argv.includes('--sql');

interface SyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
}

interface SyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    type: string;
    url: string;
    preview_url: string;
  }>;
}

async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  if (!res.ok) {
    throw new Error(`Printful API ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.result;
}

// Map product name keywords to product_type
function detectProductType(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('mug')) return 'mug';
  if (lower.includes('shirt') || lower.includes('tee')) return 'shirt';
  if (lower.includes('sticker')) return 'sticker';
  if (lower.includes('poster') || lower.includes('print')) return 'poster';
  if (lower.includes('tote') || lower.includes('bag')) return 'tote';
  return 'other';
}

// Extract park slug from product name: "Yellowstone - Badge Mug" -> "yellowstone"
function extractParkSlug(name: string): string {
  const parkName = name.split(' - ')[0]?.trim() || name;
  return parkName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
}

function escapeSql(str: string): string {
  return str.replace(/'/g, "''");
}

async function main() {
  console.error('Fetching Printful sync products...');

  const products = await apiFetch<SyncProduct[]>('/store/products');
  console.error(`Found ${products.length} sync products`);

  const rows: string[] = [];

  if (sqlMode) {
    console.log('-- Printful product sync');
    console.log('-- Generated: ' + new Date().toISOString());
    console.log('DELETE FROM printful_products;');
    console.log('');
  }

  for (const product of products) {
    console.error(`  Processing: ${product.name}`);

    const detail = await apiFetch<{
      sync_product: SyncProduct;
      sync_variants: SyncVariant[];
    }>(`/store/products/${product.id}`);

    const parkSlug = extractParkSlug(product.name);
    const productType = detectProductType(product.name);

    for (const variant of detail.sync_variants) {
      const priceCents = Math.round(parseFloat(variant.retail_price) * 100);
      const mockup = variant.files.find((f) => f.type === 'preview')?.preview_url || product.thumbnail_url || null;

      if (sqlMode) {
        console.log(
          `INSERT INTO printful_products (park_slug, printful_sync_id, printful_variant_id, product_type, name, price_cents, mockup_url, checkout_url) VALUES ('${escapeSql(parkSlug)}', '${product.id}', '${variant.id}', '${escapeSql(productType)}', '${escapeSql(variant.name)}', ${priceCents}, ${mockup ? `'${escapeSql(mockup)}'` : 'NULL'}, NULL);`
        );
      } else {
        rows.push(
          JSON.stringify({
            park_slug: parkSlug,
            printful_sync_id: String(product.id),
            printful_variant_id: String(variant.id),
            product_type: productType,
            name: variant.name,
            price_cents: priceCents,
            mockup_url: mockup,
          })
        );
      }
    }

    // Rate limit: Printful allows ~120 req/min
    await new Promise((r) => setTimeout(r, 500));
  }

  if (!sqlMode) {
    console.log(JSON.stringify(rows.map((r) => JSON.parse(r)), null, 2));
  }

  console.error(`Done. Processed ${products.length} products.`);
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
