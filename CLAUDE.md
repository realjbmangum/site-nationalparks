# Claude Instructions - Best US National Parks

## Site Overview

- **Domain:** bestusnationalparks.com
- **Type:** place directory
- **Database:** Cloudflare D1 (`parks_db`)

---

## Tech Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Astro | SSR mode with Cloudflare adapter |
| Styling | Tailwind CSS | |
| Database | Cloudflare D1 | SQLite-based, edge-native |
| Hosting | Cloudflare Pages | Auto-deploy on push |
| Maps | Mapbox | Interactive park map |
| Forms | Web3Forms | Email notifications |

---

## D1 Database

### Tables
- `parks` - All 63 national parks
- `submissions` - User tips and corrections
- `contact_messages` - Contact form messages
- `newsletter_subscribers` - Newsletter signups

### Local Development
```bash
# Create D1 database
npm run db:create

# Initialize schema
npm run db:init

# Seed data
npm run db:seed
```

### Production Commands
```bash
npm run db:init:prod
npm run db:seed:prod
```

### Accessing D1 in Astro
```typescript
// In any .astro page
const db = Astro.locals.runtime.env.DB;
const parks = await getAllParks(db);
```

---

## Environment Variables

Set in **Cloudflare Pages dashboard**:
- `PUBLIC_MAPBOX_TOKEN` - Map display
- `PUBLIC_WEB3FORMS_KEY` - Form submissions

---

## Project Structure

```
site-nationalparks-directory/
├── d1-schema.sql          # Database schema
├── data/
│   └── seed-parks.sql     # All 63 parks data
├── src/
│   ├── components/        # Reusable UI components
│   ├── data/
│   │   └── site-config.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── db.ts          # D1 queries and types
│   ├── pages/
│   │   ├── index.astro    # Homepage
│   │   ├── parks/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── regions/
│   │   │   └── [slug].astro
│   │   ├── states/
│   │   │   └── [slug].astro
│   │   ├── map.astro
│   │   └── search.astro
│   └── styles/
│       └── global.css
├── wrangler.toml          # D1 binding config
└── astro.config.mjs       # Cloudflare adapter
```

---

## Design System

- **Primary:** #1E4D2B (NPS Green)
- **Secondary:** #F4A300 (Golden Hour)
- **Accent:** #5B3A29 (Earth Brown)
- **Fonts:** Playfair Display (headings), Inter (body)

---

## Key Data Fields

| Field | Type | Description |
|-------|------|-------------|
| `slug` | TEXT | URL-friendly name |
| `name` | TEXT | Park name |
| `state` | TEXT | Primary state |
| `states` | JSON | All states (multi-state parks) |
| `region` | TEXT | west/alaska/southeast/northeast/midwest/islands |
| `annual_visitors` | INT | For popularity sorting |
| `entrance_fee` | REAL | $0 for free parks |
| `reservation_required` | INT | 0/1 boolean |
| `difficulty` | TEXT | family/moderate/challenging/expert |
| `features` | JSON | camping/lodging/rv/accessible/dogs |

---

## Regions

| Slug | Name | Parks |
|------|------|-------|
| west | Western US | ~31 |
| alaska | Alaska | 8 |
| southeast | Southeast | 9 |
| northeast | Northeast | 3 |
| midwest | Midwest | 4 |
| islands | Islands & Pacific | 4 |

---

## Deployment

1. Push to `main` → Cloudflare Pages auto-deploys
2. D1 database ID must be configured in wrangler.toml
3. Update database ID after running `npm run db:create`

---

## Session History

See `progress.txt` for detailed session history.
