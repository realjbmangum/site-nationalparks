/**
 * Render the branded 404 page on the original URL with a real 404 status.
 * A redirect to /404 is what Search Console calls a soft 404.
 */
export async function notFound(
  rewrite: (pathname: string) => Promise<Response>
): Promise<Response> {
  try {
    const rendered = await rewrite('/404');
    if (rendered.status === 404) return rendered;

    const headers = new Headers(rendered.headers);
    headers.set('X-Robots-Tag', 'noindex, follow');
    return new Response(rendered.body, {
      status: 404,
      statusText: 'Not Found',
      headers,
    });
  } catch {
    return new Response('Not Found', {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, follow',
      },
    });
  }
}
