#!/usr/bin/env node
/**
 * Seed all 30 drip emails into D1 drip_emails table.
 *
 * Usage:
 *   cd workers/drip-sender
 *   node seed-emails.js
 *
 * Reads HTML files from emails/drip/, extracts subject from the HTML comment
 * header (line 3, "Subject: ..."), and generates SQL INSERT statements
 * executed against D1 via wrangler.
 *
 * Prerequisites:
 *   - Run migrate-drip-emails.sql first to create the table
 *   - npx wrangler login (if not authenticated)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dripDir = path.join(__dirname, '..', '..', 'emails', 'drip');

// Get all numbered email files (skip 00-template.html)
const files = fs.readdirSync(dripDir)
  .filter(f => /^\d{2}-/.test(f) && f !== '00-template.html')
  .sort();

console.log(`Found ${files.length} drip emails to seed into D1.\n`);

let seeded = 0;
let errors = 0;

for (const file of files) {
  const num = parseInt(file.split('-')[0], 10); // 1, 2, ... 30
  const filePath = path.join(dripDir, file);
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract subject from HTML comment: "  Subject: Your 63 Parks Checklist Is Here"
  const subjectMatch = html.match(/Subject:\s*(.+)/);
  const subject = subjectMatch
    ? subjectMatch[1].trim()
    : `National Parks Email ${num}`;

  // Escape single quotes for SQL
  const escapedSubject = subject.replace(/'/g, "''");
  const escapedHtml = html.replace(/'/g, "''");

  const sql = `INSERT OR REPLACE INTO drip_emails (position, subject, html) VALUES (${num}, '${escapedSubject}', '${escapedHtml}');`;

  // Write SQL to temp file to avoid shell escaping issues
  const tmpFile = path.join('/tmp', `drip-seed-${String(num).padStart(2, '0')}.sql`);
  fs.writeFileSync(tmpFile, sql);

  try {
    execSync(
      `npx wrangler d1 execute national-parks --file="${tmpFile}" --remote`,
      { stdio: 'pipe', cwd: __dirname }
    );
    console.log(`  ✓ ${String(num).padStart(2, '0')} → "${subject}"`);
    seeded++;
  } catch (err) {
    console.error(`  ✗ ${String(num).padStart(2, '0')} FAILED: ${err.message}`);
    errors++;
  }

  // Clean up temp file
  fs.unlinkSync(tmpFile);
}

console.log(`\nDone. ${seeded} seeded, ${errors} errors.`);

if (errors > 0) {
  console.log('\nMake sure you ran the migration first:');
  console.log('  npx wrangler d1 execute national-parks --file=../../data/migrate-drip-emails.sql --remote');
  process.exit(1);
}
