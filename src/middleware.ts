import { defineMiddleware } from 'astro:middleware';
import { redirectTarget } from './lib/redirects';

function redirect(location: string): Response {
  return new Response(null, {
    status: 301,
    headers: { Location: location },
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const method = context.request.method;
  if (method !== 'GET' && method !== 'HEAD') return next();

  const target = redirectTarget(new URL(context.request.url));
  if (target) return redirect(target);
  return next();
});