/**
 * Drip Email Sender Worker
 *
 * Runs hourly via cron. For each active subscriber who hasn't finished the
 * 30-email drip, checks if it's time for their next email based on days
 * since signup. Sends via SendGrid Mail Send API and updates drip_position.
 *
 * Manual trigger: GET https://parks-drip-sender.<account>.workers.dev
 * Pass ?test=true to do a dry run (logs but doesn't send).
 */

interface Env {
  DB: D1Database;
  DRIP_EMAILS: KVNamespace;
  SENDGRID_API_KEY: string;
}

interface Subscriber {
  id: number;
  email: string;
  drip_position: number;
  subscribed_at: string;
}

interface DripEmail {
  subject: string;
  html: string;
}

// Day offset from subscription date for each email
const DRIP_SCHEDULE: Record<number, number> = {
  1: 0, 2: 2, 3: 5, 4: 8, 5: 11, 6: 14, 7: 17, 8: 20, 9: 23, 10: 26,
  11: 29, 12: 32, 13: 35, 14: 38, 15: 41, 16: 44, 17: 47, 18: 50, 19: 53, 20: 56,
  21: 59, 22: 62, 23: 65, 24: 68, 25: 71, 26: 74, 27: 77, 28: 80, 29: 83, 30: 86,
};

const FROM_EMAIL = 'hello@bestusnationalparks.com';
const FROM_NAME = 'Best US National Parks';
const SITE_URL = 'https://bestusnationalparks.com';

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(processDrip(env, false));
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const testMode = url.searchParams.get('test') === 'true';

    const results = await processDrip(env, testMode);

    return new Response(JSON.stringify(results, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

async function processDrip(
  env: Env,
  testMode: boolean
): Promise<{ processed: number; sent: number; errors: string[] }> {
  const now = new Date();
  const errors: string[] = [];
  let sent = 0;

  // Get all active subscribers who haven't completed the drip
  const { results: subscribers } = await env.DB.prepare(
    `SELECT id, email, drip_position, subscribed_at
     FROM newsletter_subscribers
     WHERE status = 'active' AND (drip_position IS NULL OR drip_position < 30)
     ORDER BY subscribed_at ASC
     LIMIT 100`
  ).all<Subscriber>();

  if (!subscribers || subscribers.length === 0) {
    return { processed: 0, sent: 0, errors: [] };
  }

  for (const sub of subscribers) {
    const currentPosition = sub.drip_position ?? 0;
    const nextEmail = currentPosition + 1;
    const daysRequired = DRIP_SCHEDULE[nextEmail];

    if (daysRequired === undefined) continue;

    const subscribedAt = new Date(sub.subscribed_at);
    const daysSinceSignup = Math.floor(
      (now.getTime() - subscribedAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceSignup < daysRequired) continue;

    // Time to send this email
    const emailNum = String(nextEmail).padStart(2, '0');
    const emailData = await env.DRIP_EMAILS.get<DripEmail>(`drip:${emailNum}`, 'json');

    if (!emailData) {
      errors.push(`Missing KV entry: drip:${emailNum}`);
      continue;
    }

    // Personalize the email
    const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?e=${btoa(sub.email)}`;
    const personalizedHtml = emailData.html
      .replace(/\{\{UNSUBSCRIBE_URL\}\}/g, unsubscribeUrl)
      .replace(/\{\{EMAIL_NUMBER\}\}/g, String(nextEmail));

    if (testMode) {
      console.log(`[TEST] Would send email ${nextEmail} to ${sub.email} (day ${daysSinceSignup}/${daysRequired})`);
      sent++;
    } else {
      try {
        await sendEmail(env.SENDGRID_API_KEY, sub.email, emailData.subject, personalizedHtml);

        // Update drip position
        await env.DB.prepare(
          'UPDATE newsletter_subscribers SET drip_position = ? WHERE id = ?'
        ).bind(nextEmail, sub.id).run();

        sent++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        errors.push(`Failed to send email ${nextEmail} to ${sub.email}: ${msg}`);
      }
    }

    // Small delay between sends to respect SendGrid rate limits
    if (!testMode && sent > 0) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  return { processed: subscribers.length, sent, errors };
}

async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`SendGrid ${response.status}: ${body}`);
  }
}
