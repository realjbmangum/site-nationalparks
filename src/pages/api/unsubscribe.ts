import type { APIRoute } from 'astro';
import { unsubscribeEmail } from '../../lib/db';

export const GET: APIRoute = async ({ url, locals }) => {
  const encoded = url.searchParams.get('e');

  if (!encoded) {
    return new Response(unsubscribePage('Invalid unsubscribe link.', false), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  let email: string;
  try {
    email = atob(encoded);
  } catch {
    return new Response(unsubscribePage('Invalid unsubscribe link.', false), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const db = locals.runtime.env.DB;
  await unsubscribeEmail(db, email);

  return new Response(unsubscribePage(email, true), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
};

function unsubscribePage(emailOrError: string, success: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${success ? 'Unsubscribed' : 'Error'} | Best US National Parks</title>
  <style>
    body { margin: 0; padding: 0; background: #f7f5f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .wrap { max-width: 480px; margin: 80px auto; text-align: center; padding: 0 20px; }
    .card { background: #fff; border-radius: 12px; padding: 40px 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    h1 { color: #1E4D2B; font-size: 24px; margin: 0 0 12px; }
    p { color: #555; font-size: 16px; line-height: 1.5; margin: 0 0 24px; }
    a { display: inline-block; background: #1E4D2B; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    a:hover { background: #163d22; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      ${success
        ? `<h1>You've been unsubscribed</h1>
           <p>${emailOrError} has been removed from our mailing list. We're sorry to see you go.</p>`
        : `<h1>Something went wrong</h1>
           <p>${emailOrError}</p>`
      }
      <a href="https://bestusnationalparks.com">Back to Best US National Parks</a>
    </div>
  </div>
</body>
</html>`;
}
