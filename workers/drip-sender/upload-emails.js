#!/usr/bin/env node
/**
 * Upload all 30 drip emails to KV namespace.
 *
 * Usage:
 *   cd workers/drip-sender
 *   node upload-emails.js
 *
 * Reads HTML files from emails/drip/, extracts subject from <title>,
 * and uploads as JSON to KV with key format: drip:01, drip:02, etc.
 *
 * Prerequisites:
 *   - wrangler.toml must have DRIP_EMAILS KV namespace configured
 *   - Run `npx wrangler login` first if not authenticated
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dripDir = path.join(__dirname, '..', '..', 'emails', 'drip');

// Get all numbered email files (skip 00-template.html)
const files = fs.readdirSync(dripDir)
  .filter(f => /^\d{2}-/.test(f) && f !== '00-template.html')
  .sort();

console.log(`Found ${files.length} drip emails to upload.\n`);

let uploaded = 0;
let errors = 0;

for (const file of files) {
  const num = file.split('-')[0]; // "01", "02", etc.
  const filePath = path.join(dripDir, file);
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract subject from <title> tag
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const subject = titleMatch ? titleMatch[1] : `National Parks Email ${parseInt(num)}`;

  const key = `drip:${num}`;
  const data = JSON.stringify({ subject, html });

  // Write to temp file to avoid shell escaping issues with HTML content
  const tmpFile = path.join('/tmp', `drip-${num}.json`);
  fs.writeFileSync(tmpFile, data);

  try {
    execSync(
      `npx wrangler kv:key put "${key}" --path="${tmpFile}" --binding=DRIP_EMAILS`,
      { stdio: 'pipe', cwd: __dirname }
    );
    console.log(`  ✓ ${key} → "${subject}"`);
    uploaded++;
  } catch (err) {
    console.error(`  ✗ ${key} FAILED: ${err.message}`);
    errors++;
  }

  // Clean up temp file
  fs.unlinkSync(tmpFile);
}

console.log(`\nDone. ${uploaded} uploaded, ${errors} errors.`);

if (errors > 0) {
  console.log('\nMake sure wrangler.toml has the correct KV namespace ID.');
  console.log('Create the namespace with: npx wrangler kv:namespace create DRIP_EMAILS');
  process.exit(1);
}
