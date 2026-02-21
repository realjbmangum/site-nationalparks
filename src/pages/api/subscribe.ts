import type { APIRoute } from 'astro';
import { addNewsletterSubscriber } from '../../lib/db';

const FROM_EMAIL = 'hello@bestusnationalparks.com';
const FROM_NAME = 'Best US National Parks';
const SITE_URL = 'https://bestusnationalparks.com';

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

    // Send welcome email immediately for new subscribers
    if (!result.alreadySubscribed) {
      const apiKey = locals.runtime.env.SENDGRID_API_KEY;
      if (apiKey) {
        try {
          const emailData = await db
            .prepare('SELECT subject, html FROM drip_emails WHERE position = 1')
            .first<{ subject: string; html: string }>();

          if (emailData) {
            const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?e=${btoa(email)}`;
            const personalizedHtml = emailData.html
              .replace(/\{\{UNSUBSCRIBE_URL\}\}/g, unsubscribeUrl)
              .replace(/\{\{EMAIL_NUMBER\}\}/g, '1');

            await fetch('https://api.sendgrid.com/v3/mail/send', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                personalizations: [{ to: [{ email }] }],
                from: { email: FROM_EMAIL, name: FROM_NAME },
                subject: emailData.subject,
                content: [{ type: 'text/html', value: personalizedHtml }],
              }),
            });

            // Mark drip_position = 1 since we just sent the welcome email
            await db
              .prepare('UPDATE newsletter_subscribers SET drip_position = 1 WHERE email = ?')
              .bind(email)
              .run();
          }
        } catch {
          // Don't fail the signup if email send fails
          console.error('Failed to send welcome email');
        }
      }
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
