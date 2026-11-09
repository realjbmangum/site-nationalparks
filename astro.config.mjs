// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://bestusnationalparks.com',
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      // D1 and KV are declared under [env.production] in wrangler.toml.
      environment: 'production',
    },
  }),
  // Slash policy lives in src/middleware.ts (301 to the slashless URL).
  // "ignore" lets both forms reach that middleware. "never" 301s inside the
  // production renderer, but the dev server turns the slash form into a 404
  // before middleware runs, so the redirect cannot be checked locally.
  trailingSlash: 'ignore',
});
