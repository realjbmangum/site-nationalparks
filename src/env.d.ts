/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

interface Env {
  DB: D1Database;
  NPS_CACHE: KVNamespace;
  NPS_API_KEY: string;
}

declare namespace App {
  interface Locals extends Runtime {}
}
