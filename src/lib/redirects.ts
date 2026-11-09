import { canonicalStateSlug } from './db';

const APEX_ORIGIN = 'https://bestusnationalparks.com';
const APEX_HOST = 'bestusnationalparks.com';

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function isFilePath(pathname: string): boolean {
  const last = pathname.split('/').pop() || '';
  return last.includes('.');
}

/** Collapse aliases and the trailing-slash form onto one path. Query strings stay. */
export function normalizePath(pathname: string): string {
  if (pathname === '/tips' || pathname === '/tips/') return '/guides';
  if (/^\/shop\/[^/]+\/?$/.test(pathname)) return '/shop';

  const stateMatch = pathname.match(/^\/states\/([^/]+)\/?$/);
  if (stateMatch) {
    return `/states/${canonicalStateSlug(safeDecode(stateMatch[1]))}`;
  }

  if (pathname.length > 1 && pathname.endsWith('/') && !isFilePath(pathname)) {
    return pathname.replace(/\/+$/, '');
  }

  return pathname;
}

/**
 * Absolute URL this request should 301 to, or null when it is already canonical.
 * Preview and local hosts keep their own origin. The production host, including www, uses the apex.
 */
export function redirectTarget(requestUrl: URL): string | null {
  const targetPath = normalizePath(requestUrl.pathname);
  const hostname = requestUrl.hostname.toLowerCase();
  const onProductionHost = hostname === APEX_HOST || hostname === `www.${APEX_HOST}`;
  const origin = onProductionHost ? APEX_ORIGIN : requestUrl.origin;
  const location = `${origin}${targetPath}${requestUrl.search}`;
  const current = `${requestUrl.origin}${requestUrl.pathname}${requestUrl.search}`;
  return location === current ? null : location;
}
