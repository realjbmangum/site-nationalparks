# Claude Instructions - Best US National Parks

## Site Overview

- **Domain:** bestusnationalparks.com
- **Type:** place directory
- **Prefix:** parks (used for Supabase tables)
- **Site ID:** parks (in `sites` table)

---

## Before Making Changes

1. **Read the playbook:** `~/new-project/site-directory-factory/DIRECTORY-SITE-PLAYBOOK.md`
2. **Verify architecture decisions** - especially per-site tables pattern
3. **Never assume** - verify before recommending

---

## Tech Stack (DO NOT CHANGE)

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Astro | Static-first |
| Styling | Tailwind CSS | |
| Database | Supabase | Per-site tables |
| Hosting | Cloudflare Pages | Auto-deploy on push |
| Forms | Web3Forms | Dual-write to Supabase |
| DNS | Cloudflare | Proxied |

---

## Supabase Tables

This site uses:
- `parks_locations` - All 63 national parks data
- `parks_submissions` - User tips and corrections
- `parks_contact_messages` - Contact form

**DO NOT** create shared tables or use `site_id` columns.

---

## Environment Variables

All env vars are in **Cloudflare Pages**, not local `.env` files:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_WEB3FORMS_KEY`
- `PUBLIC_MAPBOX_TOKEN` (for interactive map)

---

## Form Handling

All forms use Web3Forms + Supabase dual-write pattern:
1. POST to Web3Forms (email notification)
2. INSERT to Supabase `parks_submissions` or `parks_contact_messages`

See playbook for implementation pattern.

---

## Deployment

- Push to `main` → Cloudflare Pages auto-deploys
- Deploy hook available in Directory Factory
- Verify www → root redirect is configured

---

## Common Tasks

### Add a new page
1. Create in `src/pages/`
2. Use `BaseLayout.astro`
3. Include SEOHead component with unique title/description

### Modify park listings display
1. Check `src/lib/supabase.ts` for queries
2. Update `ParkCard.astro` for card styling
3. Modify `src/pages/parks/[slug].astro` for detail page

### Update site config
1. Edit `src/data/site-config.json`
2. Colors, contact info, SEO settings

---

## Site-Specific Context

### Design System
- **Primary color:** #1E4D2B (NPS Green)
- **Secondary color:** #F4A300 (Golden Hour)
- **Accent:** #5B3A29 (Earth Brown)
- **Fonts:** Playfair Display (headings), Inter (body)

### Content Priorities
1. Top 10 most visited parks (content-complete)
2. All 63 parks (basic info)
3. State landing pages
4. Guide/blog articles

### Monetization (Future)
- REI affiliate for America the Beautiful Pass
- Booking.com for gateway town lodging
- Viator for park tours
- Amazon for guidebooks/gear

### Data Fields (parks_locations)
Key fields beyond standard location fields:
- `annual_visitors` - for sorting by popularity
- `entrance_fee` - $0 for free parks
- `reservation_required` - boolean
- `best_seasons` - array of seasons
- `difficulty` - family/moderate/challenging/expert
- `features` - JSONB for camping/lodging/rv/accessible/dogs
- `things_to_do` - array of activities
- `wildlife` - array of animals
- `nps_url` - link to official NPS page

---

## DO NOT

- Change the tech stack
- Use shared tables with site_id
- Hardcode API keys in source (use CF env vars)
- Skip the playbook when making architecture decisions
- Create .env files (all env vars in Cloudflare)

---

## Reference

- Playbook: `~/new-project/site-directory-factory/DIRECTORY-SITE-PLAYBOOK.md`
- Directory Factory: https://directory-factory.pages.dev
- Site repo: `~/new-project/site-nationalparks-directory/`
- Research docs: `national-parks-strategy.md`, `national-parks-checklist.md`
