const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'flow');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log(`Connecting to server at ${BASE_URL}...`);
  const res = await fetch(BASE_URL).catch(() => null);
  if (!res || !res.ok) {
    throw new Error(`Server at ${BASE_URL} is not responding.`);
  }

  console.log('Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Screenshot of /create (Role & Layout Selection Wizard)
  console.log('Capturing 01-role-setup.png (/create)...');
  await page.goto(`${BASE_URL}/create`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01-role-setup.png') });
  console.log('✓ Saved 01-role-setup.png');

  // Go to step 4 with prefilled role
  console.log('Navigating to Step 4 with Senior Software Engineer...');
  await page.goto(`${BASE_URL}/create?step=4&role=Senior+Software+Engineer&template=prawira`, {
    waitUntil: 'networkidle0',
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Find Finish button
  const buttons = await page.$$('button');
  let finishButton = null;
  for (const b of buttons) {
    const text = await b.evaluate((el) => el.innerText);
    if (text.includes('Finish & Build Resume')) {
      finishButton = b;
      break;
    }
  }

  if (finishButton) {
    console.log('Clicking "Finish & Build Resume"...');
    await finishButton.click();
  } else {
    throw new Error('Finish & Build Resume button not found!');
  }

  // Wait for builder page
  console.log('Waiting for Builder page...');
  await page.waitForFunction(() => window.location.pathname.startsWith('/builder/'), { timeout: 15000 });
  console.log('Arrived at Builder:', page.url());

  // Wait for A4 preview canvas or form to render
  await page.waitForSelector('.a4-page-sheet, [data-preview-canvas], .ProseMirror, input', { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 3000));

  // 2. Screenshot of Studio Editor
  console.log('Capturing 02-studio-editor.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02-studio-editor.png') });
  console.log('✓ Saved 02-studio-editor.png');

  // 3. Screenshot of Design Studio Panel
  console.log('Opening Design Studio...');
  const designClicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const designBtn = btns.find((b) => b.textContent && b.textContent.includes('Design'));
    if (designBtn) {
      designBtn.click();
      return true;
    }
    return false;
  });
  console.log('Design button clicked:', designClicked);
  await new Promise((r) => setTimeout(r, 2000));
  console.log('Capturing 03-design-studio.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03-design-studio.png') });
  console.log('✓ Saved 03-design-studio.png');

  // 4. Screenshot of ATS Check / Score Audit Panel
  console.log('Opening ATS Score / Audit panel...');
  const checkClicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const checkBtn = btns.find((b) => b.textContent && (b.textContent.includes('Score') || b.textContent.includes('Check') || b.textContent.includes('Audit')));
    if (checkBtn) {
      checkBtn.click();
      return true;
    }
    return false;
  });
  console.log('Check button clicked:', checkClicked);
  await new Promise((r) => setTimeout(r, 2000));
  console.log('Capturing 04-ats-score-audit.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04-ats-score-audit.png') });
  console.log('✓ Saved 04-ats-score-audit.png');

  // 5. Screenshot of /ats-checker with Sample Report Loaded
  console.log('Capturing 05-ats-checker.png (/ats-checker)...');
  await page.goto(`${BASE_URL}/ats-checker`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const sampleBtn = btns.find((b) => b.textContent && b.textContent.includes('Load Sample Report'));
    if (sampleBtn) sampleBtn.click();
  });
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05-ats-checker.png') });
  console.log('✓ Saved 05-ats-checker.png');

  // 6. Screenshot of /templates (Catalog)
  console.log('Capturing 06-templates-catalog.png (/templates)...');
  await page.goto(`${BASE_URL}/templates`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06-templates-catalog.png') });
  console.log('✓ Saved 06-templates-catalog.png');

  await browser.close();
  console.log('==========================================');
  console.log('ALL FLOW SCREENSHOTS CAPTURED PERFECTLY!');
  console.log('==========================================');
}

run().catch((err) => {
  console.error('Screenshot script failed:', err);
  process.exit(1);
});
