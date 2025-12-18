# Best US National Parks

> Your guide to planning the perfect park adventure

**Live:** https://bestusnationalparks.com
**Type:** place directory
**Launched:** December 2024

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro |
| Styling | Tailwind CSS |
| Database | Supabase |
| Hosting | Cloudflare Pages |
| Forms | Web3Forms + Supabase |
| Email | Resend (outreach) |
| Analytics | Google Analytics |
| DNS/CDN | Cloudflare |

## Quick Reference

| Resource | Link |
|----------|------|
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Supabase Dashboard | https://supabase.com/dashboard |
| Google Search Console | https://search.google.com/search-console |
| Google Analytics | https://analytics.google.com |
| Directory Factory | https://directory-factory.pages.dev |

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Stored in **Cloudflare Pages** (not local .env files):

| Variable | Description |
|----------|-------------|
| `PUBLIC_SUPABASE_URL` | Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `PUBLIC_WEB3FORMS_KEY` | Web3Forms access key |
| `PUBLIC_MAPBOX_TOKEN` | Mapbox token (for maps) |

---

## Supabase Tables

This site uses the following tables (prefix: `parks`):

| Table | Purpose |
|-------|---------|
| `parks_locations` | National parks data (all 63 parks) |
| `parks_submissions` | User-submitted tips and corrections (pending review) |
| `parks_contact_messages` | Contact form messages |

Registered in the central `sites` table with ID: `parks`

---

## Deployment

### Automatic
Push to `main` branch → Cloudflare Pages auto-deploys

### Manual
Cloudflare Dashboard → Pages → site-nationalparks → Deployments → "Retry deployment"

### Deploy Hook
Can be triggered from Directory Factory or via:
```bash
curl -X POST "[DEPLOY_HOOK_URL]"
```

---

## DNS Configuration (Cloudflare)

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | @ | site-nationalparks.pages.dev | Proxied |
| CNAME | www | bestusnationalparks.com | Proxied |

**Redirect Rule:** www → root (301)

---

## Forms

### Submit a Tip (`/submit`)
- Web3Forms → Email notification
- Supabase → `parks_submissions` table
- Review in Directory Factory → Approve → Update content

### Contact (`/contact`)
- Web3Forms → Email notification
- Supabase → `parks_contact_messages` table

---

## SEO Checklist

See full checklist in [DIRECTORY-SITE-PLAYBOOK.md](../site-directory-factory/DIRECTORY-SITE-PLAYBOOK.md#seo-checklist)

### Completed
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Bing Webmaster Tools
- [ ] robots.txt configured
- [ ] www → root redirect
- [ ] Schema markup (TouristAttraction)

### Monitoring
- [ ] Weekly Search Console check
- [ ] Monthly Core Web Vitals review

---

## Content Structure

```
src/
├── components/          # Reusable UI components
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── ParkCard.astro
│   └── SEOHead.astro
├── data/
│   └── site-config.json # Site settings, colors, contact
├── layouts/
│   └── BaseLayout.astro # Main HTML wrapper
├── lib/
│   └── supabase.ts      # Database client & queries
├── pages/
│   ├── index.astro      # Homepage
│   ├── parks/
│   │   ├── index.astro  # All parks listing
│   │   └── [slug].astro # Park detail page
│   ├── about.astro
│   ├── contact.astro
│   ├── submit.astro
│   └── 404.astro
└── styles/
    └── global.css
```

---

## Playbook Reference

This site follows the standards in:
**[DIRECTORY-SITE-PLAYBOOK.md](../site-directory-factory/DIRECTORY-SITE-PLAYBOOK.md)**

Key sections:
- Architecture Decisions (per-site tables)
- Naming Conventions
- Form Handling Standards (Web3Forms)
- SEO Checklist
- Supabase Schema Standards

---

## Site-Specific Notes

- **Domain:** bestusnationalparks.com has existing organic traffic (~500/month)
- **Content:** Focus on the "Big 5" parks first (Grand Canyon, Yellowstone, Yosemite, Zion, Great Smoky Mountains)
- **Monetization:** Affiliate links (REI for park passes, Booking.com for lodging, Viator for tours)
- **Design:** NPS-inspired green color palette (#1E4D2B), Playfair Display headings

---

## Changelog

| Date | Change |
|------|--------|
| Dec 2024 | Initial setup and structure |

---

*Built with the Directory Site Playbook • Managed via Directory Factory*
