import type { APIRoute } from 'astro';
import { addNewsletterSubscriber } from '../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const email = body.email?.trim()?.toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers }
      );
    }

    const db = locals.runtime.env.DB;
    const result = await addNewsletterSubscriber(db, email, 'homepage-checklist');

    if (!result.success) {
      return new Response(
        JSON.stringify({ success: false, error: result.error || 'Failed to subscribe.' }),
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        alreadySubscribed: result.alreadySubscribed || false,
      }),
      { status: 200, headers }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Something went wrong. Please try again.' }),
      { status: 500, headers }
    );
  }
};
