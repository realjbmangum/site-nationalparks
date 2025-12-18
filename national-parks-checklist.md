# BestUSNationalParks.com Design & Implementation Checklist
## Launch-Ready Specifications

---

## 1. Homepage Design

### Hero Section
- [ ] Full-width hero image (1920x1080px minimum, national park landscape)
- [ ] Dark gradient overlay for text contrast (linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)))
- [ ] Headline: "Explore America's 63 National Parks"
- [ ] Subheadline: "Your guide to planning the perfect park adventure"
- [ ] Search bar in hero (search parks by name)
- [ ] Quick filter buttons below search: "Near Me" | "Best for Families" | "Least Crowded"
- [ ] Optional: Rotating hero images (seasonal)

### Stats Bar
- [ ] Full-width section below hero
- [ ] Format: "63 National Parks | 94+ Million Annual Visitors | 30 States + Territories"
- [ ] Icons for each stat
- [ ] Link stats to relevant content

### Featured Parks Section
- [ ] Section header: "Popular Parks" or "Start Your Adventure"
- [ ] 4-6 park cards in horizontal scroll or grid
- [ ] Seasonal rotation (winter parks in Dec, desert in summer)
- [ ] Each card: hero image, park name, state, difficulty badge

### Interactive Map Preview
- [ ] Section with map showing all 63 parks
- [ ] "Explore the Map" CTA button
- [ ] Zoom/pan disabled (teaser only)
- [ ] Click through to full map page

### Browse by Region
- [ ] 6 region cards (West, Alaska, Southeast, Northeast, Midwest, Islands)
- [ ] Each with representative image
- [ ] Park count badge overlay
- [ ] Link to region page

### Latest Guides
- [ ] 3-4 blog post cards
- [ ] Featured image, title, excerpt
- [ ] "View All Guides" link

### Email Signup
- [ ] Pre-footer section
- [ ] Lead magnet: "Free National Parks Checklist"
- [ ] Simple form: email + button
- [ ] Privacy reassurance text

### Footer
- [ ] Logo
- [ ] Navigation links (Parks, Map, Guides, About)
- [ ] Affiliate disclosure link
- [ ] Privacy policy link
- [ ] Social icons
- [ ] Copyright

---

## 2. Park Card Design

### Card Layout
- [ ] Aspect ratio: 4:3 or 16:9 for images
- [ ] Border radius: 12px
- [ ] Subtle shadow: 0 4px 6px rgba(0,0,0,0.1)
- [ ] Hover state: lift effect (transform: translateY(-4px), shadow increase)

### Card Content
- [ ] Hero image (fills top 60% of card)
- [ ] Difficulty badge overlay (top-left): Easy (green), Moderate (amber), Challenging (orange), Expert (red)
- [ ] Park name (18px, bold)
- [ ] Location: "State" format
- [ ] Secondary info line: Visitation or best season
- [ ] Feature tags (max 3): "Camping" | "RV Friendly" | "Lodges" | "Reservation Required"

### Badge Color System
```css
.badge-easy { background: #059669; }      /* Green */
.badge-moderate { background: #D97706; }  /* Amber */
.badge-challenging { background: #EA580C; } /* Orange */
.badge-expert { background: #DC2626; }    /* Red */
.badge-family { background: #2563EB; }    /* Blue */
```

---

## 3. Park Page Design

### Hero Section
- [ ] Full-width hero image (70vh height)
- [ ] Dark gradient overlay at bottom
- [ ] Park name overlay (48px, white, bold)
- [ ] Breadcrumb navigation above title: Home > State > Park Name
- [ ] Image gallery dots (if multiple images)

### Quick Facts Sidebar (Desktop)
- [ ] Sticky positioning
- [ ] Width: 300px
- [ ] Sections:
  - State/Region
  - Established (year)
  - Size (acres)
  - Annual Visitors
  - Entrance Fee
  - Best Seasons
  - Difficulty Rating
  - Reservation Required (Yes/No with link)
- [ ] "Get Directions" button (Google Maps link)
- [ ] "Save Park" button (local storage)

### Main Content Area
- [ ] Max width: 720px
- [ ] Sections with clear headers:

**Overview**
- 300-500 word description
- What makes this park special

**Things to Do**
- Numbered or bulleted list
- 5-10 key activities
- Link to detail sections

**Best Hikes**
- Mini cards for top 5 hikes
- Name, distance, difficulty, elevation gain

**Wildlife**
- What animals you might see
- Best viewing tips

**Where to Stay**
- In-park lodging options
- Gateway town recommendations
- Affiliate links to Booking.com/VRBO

**Tours & Experiences**
- Viator/GetYourGuide widgets or links
- Ranger-led programs

**Pro Tips**
- Insider knowledge
- Best times to visit
- Crowd avoidance

**Getting There**
- Nearest airports
- Drive times from major cities
- Public transit options

### Embedded Map
- [ ] Full-width map showing park location
- [ ] Marker for park entrance(s)
- [ ] Zoom level appropriate for context

### Nearby Parks Module
- [ ] "Parks Within 100 Miles" or "In This Region"
- [ ] 3-4 horizontal cards
- [ ] Distance shown

### Mobile Adaptations
- [ ] Quick facts move above content (collapsible accordion)
- [ ] Sticky bottom bar: "Directions" | "Save" | "Share"
- [ ] Swipeable image gallery

---

## 4. Map Page Design

### Layout
- [ ] Map fills viewport (100vh - header height)
- [ ] Filter panel: collapsible sidebar (desktop), bottom sheet (mobile)
- [ ] List view toggle in corner

### Map Features
- [ ] Mapbox GL JS implementation
- [ ] Custom markers with park-type icons
- [ ] Color coding by difficulty or region (toggle option)
- [ ] Clustering when zoomed out
- [ ] Popup cards on marker click:
  - Park name
  - Thumbnail image
  - State
  - Difficulty badge
  - "View Park" button

### Filter Panel
- [ ] State/Region dropdown
- [ ] Difficulty checkboxes (Easy, Moderate, Challenging, Expert)
- [ ] Features checkboxes:
  - Camping available
  - In-park lodging
  - RV facilities
  - Reservation required
  - Wheelchair accessible
  - Dog-friendly trails
- [ ] Best Season dropdown
- [ ] Clear All Filters button
- [ ] Results count: "Showing X of 63 parks"

### Map Controls
- [ ] Zoom in/out buttons
- [ ] "Near Me" geolocation button
- [ ] Fullscreen toggle
- [ ] Map style toggle (road/satellite/terrain)
- [ ] Legend

### URL State
- [ ] Filters saved in URL params
- [ ] Shareable filtered views

---

## 5. State Page Design

### Header
- [ ] State name (H1)
- [ ] State outline silhouette graphic
- [ ] Stats: "X National Parks in [State]"

### Content
- [ ] Brief intro paragraph about state's parks
- [ ] Park cards grid (3 columns desktop, 1 mobile)
- [ ] Sort dropdown: A-Z, Popularity, Newest

### Sidebar (Desktop)
- [ ] State facts
- [ ] Gateway cities
- [ ] Best time to visit
- [ ] "Nearby States" links

---

## 6. Guides/Blog Design

### Blog Index Page
- [ ] Hero with tagline: "Plan Your Perfect Park Trip"
- [ ] Category filter tabs: All | Trip Planning | Gear | Photography | Seasonal
- [ ] Article cards (image, title, excerpt, read time)
- [ ] Featured post highlighted at top

### Individual Article Page
- [ ] Featured image (16:9, full width)
- [ ] Title (H1, 36px)
- [ ] Meta: Published date, Read time, Category
- [ ] Table of contents (sticky sidebar desktop)
- [ ] Body: 18px, 1.7 line height, max-width 720px
- [ ] Images: full content width
- [ ] Subheadings: H2 (28px), H3 (22px)
- [ ] Affiliate boxes styled distinctly (background color, border)
- [ ] Author bio box at end
- [ ] Related articles (3 cards)
- [ ] Email signup CTA

---

## 7. Global Design System

### Typography
```css
/* Fonts */
--font-heading: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;

/* Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
--text-5xl: 48px;

/* Body text */
body { font-size: 18px; line-height: 1.7; }
```

### Color Palette
```css
/* Primary - NPS Green */
--color-primary: #1E4D2B;
--color-primary-light: #2D6A3E;
--color-primary-dark: #15361D;

/* Secondary - Golden Hour */
--color-secondary: #F4A300;
--color-secondary-light: #FFB627;

/* Accent - Earth */
--color-accent: #5B3A29;

/* Neutrals */
--color-background: #FAFAF8;
--color-surface: #FFFFFF;
--color-border: #E5E7EB;
--color-text: #1F2937;
--color-text-light: #6B7280;

/* Difficulty */
--color-easy: #059669;
--color-moderate: #D97706;
--color-challenging: #EA580C;
--color-expert: #DC2626;
```

### Spacing
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;

/* Component padding */
--padding-card: 16px;
--padding-section: 64px 0;
--gap-cards: 24px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-card: 0 4px 6px rgba(0,0,0,0.07);
--shadow-card-hover: 0 10px 20px rgba(0,0,0,0.12);
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

---

## 8. Navigation & Header

### Desktop Header
- [ ] Logo (left)
- [ ] Navigation (center or right): Parks | Map | States | Guides | About
- [ ] Search icon (expands to search bar on click)
- [ ] Optional: "Get the Pass" CTA button

### Mobile Header
- [ ] Logo (left)
- [ ] Hamburger menu (right)
- [ ] Search in slide-out menu

### Mobile Bottom Navigation (Optional but Recommended)
- [ ] 5 icons: Home | Map | Search | States | More
- [ ] Active state highlighting
- [ ] 48px minimum touch targets
- [ ] Sticky at bottom

---

## 9. Performance & Technical

### Image Optimization
- [ ] WebP format with JPEG fallback
- [ ] Responsive srcset (640w, 960w, 1280w, 1920w)
- [ ] Lazy loading for below-fold images
- [ ] Blur placeholder during load
- [ ] Max sizes: 200KB card images, 400KB heroes

### Page Speed Targets
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] First Input Delay (FID): < 100ms
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Total page weight: < 2MB
- [ ] Time to Interactive: < 3s

### SEO Essentials
- [ ] Unique title tags (Park Name | BestUSNationalParks.com)
- [ ] Meta descriptions (150-160 characters, include park name + state)
- [ ] Open Graph tags for social sharing
- [ ] Schema markup: TouristAttraction, Place, Article
- [ ] XML sitemap
- [ ] Canonical URLs
- [ ] Internal linking strategy

### Accessibility
- [ ] Alt text for all images
- [ ] Keyboard navigation
- [ ] Focus states visible
- [ ] Color contrast (4.5:1 minimum)
- [ ] Skip navigation link
- [ ] ARIA labels where needed

---

## 10. Launch Checklist

### Before Going Live
- [ ] All 63 parks have basic entries
- [ ] Top 20 parks have full content
- [ ] Hero images for all parks (no placeholders)
- [ ] Map page functional
- [ ] Search works
- [ ] Mobile tested (iOS Safari, Android Chrome)
- [ ] Page speed tested (Lighthouse > 80)
- [ ] All internal links work
- [ ] About page written
- [ ] Privacy policy published
- [ ] Affiliate disclosure visible
- [ ] Google Analytics 4 installed
- [ ] Google Search Console connected
- [ ] Favicon set (multiple sizes)
- [ ] Social meta tags working (test with Twitter/FB debuggers)

### Post-Launch Week 1
- [ ] Submit sitemap to Google
- [ ] Submit sitemap to Bing
- [ ] Create Pinterest business account
- [ ] Create first 10 Pinterest pins
- [ ] Create Instagram account
- [ ] Post launch announcement
- [ ] Set up email capture with lead magnet
- [ ] Monitor analytics for errors
- [ ] Check for 404s in Search Console
- [ ] Test affiliate links

### Week 2-4
- [ ] Complete remaining 43 park pages
- [ ] Publish 2 guide articles
- [ ] Build 3-5 "Near [City]" pages
- [ ] Create shareable infographic
- [ ] Begin Pinterest posting schedule
- [ ] Monitor top landing pages
- [ ] Identify quick SEO wins

---

## Content Priority Matrix

### Tier 1: Launch Essential (Week 1-2)
| Park | Why Priority |
|------|--------------|
| Grand Canyon | Highest search volume |
| Yellowstone | Iconic, high intent |
| Yosemite | High traffic + iconic |
| Zion | Trending popularity |
| Great Smoky Mountains | Most visited park |

### Tier 2: High Value (Week 3-4)
| Park | Why Priority |
|------|--------------|
| Rocky Mountain | Popular, reservations |
| Glacier | Trending, time-sensitive |
| Grand Teton | Package with Yellowstone |
| Arches | Utah 5 starter |
| Acadia | East Coast flagship |

### Tier 3: Complete Coverage (Month 2)
All remaining parks with at least:
- 200-word description
- Hero image
- 5 things to do
- Where to stay link
- Difficulty rating

### Tier 4: Deep Content (Month 3+)
- Expand all parks to full content
- Add seasonal variations
- Add photo galleries
- Add user tips

---

## Tech Stack Recommendation

```
Framework: Next.js 14 (App Router)
Styling: Tailwind CSS
CMS: Sanity.io
Map: Mapbox GL JS
Hosting: Vercel or Cloudflare Pages
Analytics: GA4 + Plausible (backup)
Email: ConvertKit or Buttondown
Search: Built-in + Algolia (later)
```

### Why This Stack
- **Next.js**: Best SEO with static generation, incremental static regeneration for updates
- **Tailwind**: Rapid prototyping, consistent design
- **Sanity**: Flexible content modeling, generous free tier, great editing experience
- **Mapbox**: Beautiful maps, 50K free loads, superior UX
- **Vercel**: Zero-config deployment, edge caching, great free tier

---

## Affiliate Integration Points

### Park Page Placements
1. **Where to Stay** section → Booking.com, VRBO
2. **Tours** section → Viator, GetYourGuide
3. **Gear Needed** callout → Amazon, REI
4. **Sidebar "Plan Your Trip"** box → Multiple affiliates
5. **Getting There** section → RentalCars.com, Outdoorsy

### Sitewide Placements
1. **Footer** → America the Beautiful Pass (REI affiliate)
2. **Sticky banner** (optional) → Seasonal promotions
3. **Exit intent popup** → Travel insurance

### Guide Article Placements
1. **Contextual links** within content
2. **Product comparison tables**
3. **"Our Pick" callout boxes
4. **End-of-article "What You'll Need" section

---

## Success Metrics Dashboard

Track weekly:
- [ ] Total sessions
- [ ] Organic search sessions
- [ ] Top 10 landing pages
- [ ] Average session duration
- [ ] Bounce rate
- [ ] Pages per session
- [ ] New vs returning visitors
- [ ] Email signups
- [ ] Affiliate clicks
- [ ] Revenue (when applicable)

Tools:
- Google Analytics 4
- Google Search Console
- Affiliate dashboards
- Plausible (simple backup)
