# Printful Integration Plan - National Parks Badges

**Goal:** Sell park badge merchandise (mugs, shirts, stickers) directly on bestusnationalparks.com with zero fulfillment effort.

**Status:** Planning

---

## Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  63 Badge PNGs  │────▶│  Printful API   │────▶│  Product Mockups│
│  /public/badges │     │  (batch upload) │     │  (auto-generated)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Customer     │◀────│   Astro /shop   │◀────│  Printful API   │
│    Checkout     │     │   pages (SSR)   │     │  (fetch products)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Phase 1: Printful Account Setup (You - 10 mins)

### 1.1 Create Account
1. Go to https://www.printful.com/
2. Sign up for free account
3. Complete business profile

### 1.2 Create Manual Store
1. Dashboard → Stores → Add Store
2. Choose "Manual order platform / API"
3. Name it "Best US National Parks"

### 1.3 Get API Key
1. Dashboard → Settings → API
2. Create new API key
3. Copy the key (starts with `Bearer ...`)

### 1.4 Share API Key
Add to Cloudflare Pages environment variables:
- `PRINTFUL_API_KEY` = your API key

---

## Phase 2: Product Template Selection (Me - Research)

### Recommended Products (Good margins, popular)

| Product | Printful ID | Base Cost | Suggested Retail | Margin |
|---------|-------------|-----------|------------------|--------|
| Classic Mug (11oz) | 19 | $7.95 | $18.99 | $11.04 |
| Unisex T-Shirt | 71 | $9.25 | $24.99 | $15.74 |
| Sticker (3x3) | 358 | $1.54 | $4.99 | $3.45 |
| Poster (12x18) | 1 | $8.00 | $19.99 | $11.99 |
| Tote Bag | 83 | $12.50 | $29.99 | $17.49 |

### Badge Placement
- **Mugs:** Centered on one side, ~3" wide
- **Shirts:** Center chest, ~8" wide
- **Stickers:** Full bleed, badge only
- **Posters:** Centered with park name below
- **Totes:** Centered, ~6" wide

---

## Phase 3: Batch Upload Script (Me - Build)

### 3.1 Script: `scripts/printful-sync.ts`

```typescript
// Pseudocode - actual implementation
import { readdir } from 'fs/promises';

const PRINTFUL_API = 'https://api.printful.com';
const PRODUCTS = [
  { id: 19, name: 'Mug', price: 1899 },
  { id: 71, name: 'T-Shirt', price: 2499 },
  { id: 358, name: 'Sticker', price: 499 },
];

async function syncBadgesToPrintful() {
  const badges = await readdir('./public/badges');

  for (const badge of badges) {
    const parkName = badgeToName(badge); // "yellowstone.png" → "Yellowstone"

    for (const product of PRODUCTS) {
      await createPrintfulProduct({
        name: `${parkName} National Park ${product.name}`,
        badgeFile: badge,
        productId: product.id,
        price: product.price,
      });
    }
  }
}
```

### 3.2 What the script does:
1. Reads all 63 badge files from `/public/badges/`
2. For each badge, creates products (mug, shirt, sticker, etc.)
3. Uploads badge image to Printful
4. Creates sync product with proper placement
5. Sets retail pricing
6. Stores product IDs in D1 for fast lookup

### 3.3 Run once:
```bash
npm run printful:sync
```

---

## Phase 4: Database Schema Update (Me - Build)

### Add to `d1-schema.sql`:

```sql
-- Printful products synced from API
CREATE TABLE IF NOT EXISTS printful_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  park_slug TEXT NOT NULL,
  printful_sync_id TEXT NOT NULL,
  printful_variant_id TEXT NOT NULL,
  product_type TEXT NOT NULL, -- 'mug', 'shirt', 'sticker', etc.
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  mockup_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (park_slug) REFERENCES parks(slug)
);

CREATE INDEX idx_printful_park ON printful_products(park_slug);
CREATE INDEX idx_printful_type ON printful_products(product_type);
```

---

## Phase 5: Astro Shop Pages (Me - Build)

### 5.1 File Structure

```
src/pages/shop/
├── index.astro          # Browse all products
├── [park].astro         # Products for one park
└── cart.astro           # Cart/checkout redirect
```

### 5.2 Shop Index Page (`/shop`)

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getAllParks } from '../../lib/db';

const db = Astro.locals.runtime.env.DB;
const parks = await getAllParks(db);
---

<BaseLayout title="Shop Park Badges">
  <section class="section-padding">
    <div class="container-site">
      <h1>National Park Badge Merchandise</h1>
      <p>Celebrate your park visits with badges on mugs, shirts, and more.</p>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {parks.map(park => (
          <a href={`/shop/${park.slug}`} class="card p-4 text-center">
            <img src={`/badges/badge-${park.slug}.png`} alt={park.name} />
            <p class="font-medium mt-2">{park.name}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

### 5.3 Park Shop Page (`/shop/[park]`)

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getParkBySlug, getProductsForPark } from '../../lib/db';

const { park: slug } = Astro.params;
const db = Astro.locals.runtime.env.DB;

const park = await getParkBySlug(db, slug);
const products = await getProductsForPark(db, slug);
---

<BaseLayout title={`${park.name} Merchandise`}>
  <section class="section-padding">
    <div class="container-site">
      <h1>{park.name} National Park</h1>

      <div class="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div class="card">
            <img src={product.mockup_url} alt={product.name} />
            <div class="p-4">
              <h3>{product.name}</h3>
              <p class="text-xl font-bold">${(product.price_cents / 100).toFixed(2)}</p>
              <a
                href={`https://www.printful.com/checkout?variant=${product.printful_variant_id}`}
                class="btn btn-primary w-full mt-4"
                target="_blank"
              >
                Buy Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

---

## Phase 6: Checkout Flow

### Option A: Direct to Printful (Simplest)
- "Buy Now" links directly to Printful checkout
- Printful handles payment, shipping address, fulfillment
- Zero cart management needed
- **Recommended for MVP**

### Option B: Embedded Checkout (Future)
- Build cart on our site
- Use Printful + Stripe for headless checkout
- More control, more complexity
- Consider after MVP proves demand

---

## Phase 7: Lib Functions (Me - Build)

### Add to `src/lib/db.ts`:

```typescript
export async function getProductsForPark(
  db: D1Database,
  parkSlug: string
): Promise<PrintfulProduct[]> {
  const result = await db
    .prepare('SELECT * FROM printful_products WHERE park_slug = ?')
    .bind(parkSlug)
    .all();
  return result.results as PrintfulProduct[];
}

export async function getAllProducts(
  db: D1Database,
  productType?: string
): Promise<PrintfulProduct[]> {
  let query = 'SELECT * FROM printful_products';
  if (productType) {
    query += ' WHERE product_type = ?';
    return (await db.prepare(query).bind(productType).all()).results;
  }
  return (await db.prepare(query).all()).results;
}
```

---

## Implementation Checklist

### You Do (Prerequisites):
- [ ] Create Printful account
- [ ] Create "Manual/API" store
- [ ] Get API key
- [ ] Add `PRINTFUL_API_KEY` to Cloudflare env vars

### I Build (After you complete above):
- [ ] Create `scripts/printful-sync.ts` batch upload script
- [ ] Update D1 schema with `printful_products` table
- [ ] Add Printful API wrapper to `src/lib/printful.ts`
- [ ] Create `/shop` index page
- [ ] Create `/shop/[park]` detail page
- [ ] Add db functions for products
- [ ] Run sync script to populate products
- [ ] Deploy and test

---

## Environment Variables

Add to Cloudflare Pages dashboard:

| Variable | Value | Notes |
|----------|-------|-------|
| `PRINTFUL_API_KEY` | Your API key | From Printful dashboard |

---

## Estimated Product Count

- 63 parks × 5 products = **315 products**
- All auto-generated from 63 badge images

---

## Revenue Projections (Conservative)

| Scenario | Monthly Sales | Avg Order | Revenue | Profit (~50%) |
|----------|---------------|-----------|---------|---------------|
| Slow | 10 orders | $25 | $250 | $125 |
| Moderate | 50 orders | $30 | $1,500 | $750 |
| Good | 150 orders | $35 | $5,250 | $2,625 |

---

## Timeline

| Phase | Duration | Dependency |
|-------|----------|------------|
| Phase 1: Account setup | 10 mins | You |
| Phase 2-7: Build | 2-3 hours | Phase 1 complete |
| Testing | 30 mins | Build complete |
| Launch | Immediate | Testing complete |

---

## Notes

- Printful API rate limit: 120 requests/minute (plenty for our needs)
- Mockup generation can take 5-10 seconds per product
- Initial sync of 315 products: ~30-45 minutes
- Products stay synced - only run once unless adding new badges

---

## Future Enhancements

1. **Bundle discounts** - "Buy 3 stickers, get 1 free"
2. **Regional collections** - "Western Parks Bundle"
3. **Completion rewards** - "Visited 10 parks? Special badge"
4. **Custom badges** - User uploads their park photo for personalized merch
5. **Subscription box** - Monthly park badge + info card
