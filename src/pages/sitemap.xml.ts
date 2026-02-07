import type { APIRoute } from 'astro';
import { getAllParks, getStatesWithCounts, REGIONS, stateNameToSlug } from '../lib/db';

const site = 'https://bestusnationalparks.com';

export const GET: APIRoute = async ({ locals }) => {
  const db = locals.runtime.env.DB;

  const [parks, states] = await Promise.all([
    getAllParks(db),
    getStatesWithCounts(db),
  ]);

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/parks', priority: '0.9', changefreq: 'weekly' },
    { url: '/map', priority: '0.8', changefreq: 'monthly' },
    { url: '/states', priority: '0.8', changefreq: 'monthly' },
    { url: '/regions', priority: '0.8', changefreq: 'monthly' },
    { url: '/guides', priority: '0.8', changefreq: 'monthly' },
    { url: '/gear', priority: '0.7', changefreq: 'monthly' },
    { url: '/itineraries', priority: '0.7', changefreq: 'monthly' },
    { url: '/about', priority: '0.4', changefreq: 'yearly' },
    { url: '/contact', priority: '0.3', changefreq: 'yearly' },
    { url: '/affiliate-disclosure', priority: '0.2', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.2', changefreq: 'yearly' },
    { url: '/terms', priority: '0.2', changefreq: 'yearly' },
  ];

  const urls = [
    ...staticPages.map(p => `
    <url>
      <loc>${site}${p.url}</loc>
      <changefreq>${p.changefreq}</changefreq>
      <priority>${p.priority}</priority>
    </url>`),

    ...parks.map(park => `
    <url>
      <loc>${site}/parks/${park.slug}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`),

    ...states.map(s => `
    <url>
      <loc>${site}/states/${stateNameToSlug(s.state)}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`),

    ...Object.keys(REGIONS).map(region => `
    <url>
      <loc>${site}/regions/${region}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
