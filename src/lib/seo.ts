const SITE_ORIGIN = 'https://bestusnationalparks.com';

/**
 * One canonical URL per page: https apex, no query string, no hash.
 * The homepage keeps its trailing slash. Every other path drops it.
 */
export function toCanonicalUrl(input: string): string {
  let parsed: URL;
  try {
    parsed = new URL(input, SITE_ORIGIN);
  } catch {
    return `${SITE_ORIGIN}/`;
  }

  let path = parsed.pathname || '/';
  path = path.replace(/\/{2,}/g, '/');
  if (path.length > 1) path = path.replace(/\/+$/, '');
  if (!path.startsWith('/')) path = `/${path}`;

  return `${SITE_ORIGIN}${path}`;
}
