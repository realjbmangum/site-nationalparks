import type { APIRoute } from 'astro';
import { getAllParks, getStatesWithCounts, REGIONS, stateNameToSlug } from '../lib/db';

const site = 'https://bestusnationalparks.com';

export const GET: APIRoute = async ({ locals }) => {
  const db = locals.runtime.env.DB;

  const [parks, states] = await Promise.all([
    getAllParks(db),
    getStatesWithCounts(db),
  ]);

  const pages = [
    '/',
    '/parks',
    '/map',
    '/states',
    '/regions',
    '/guides',
    '/gear',
    '/itineraries',
    '/about',
    '/contact',
    '/affiliate-disclosure',
    '/privacy',
    '/terms',
    ...parks.map(p => `/parks/${p.slug}`),
    ...states.map(s => `/states/${stateNameToSlug(s.state)}`),
    ...Object.keys(REGIONS).map(r => `/regions/${r}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${site}${p}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
