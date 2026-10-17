import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function run() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Launching Puppeteer to generate icons and verify OG image...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const tempHtmlPath = path.resolve('scripts', 'temp-icon.html');

  try {
    const page = await browser.newPage();

    // Helper for rendering high-res brand icons
    const renderIconHtml = (size) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body {
              width: ${size}px;
              height: ${size}px;
              overflow: hidden;
              background: transparent;
            }
            .badge {
              width: ${size}px;
              height: ${size}px;
              border-radius: ${Math.round(size * 0.22)}px;
              background: linear-gradient(135deg, #065F46 0%, #047857 50%, #059669 100%);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .symbol {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
              font-weight: 800;
              color: #ffffff;
              font-size: ${Math.round(size * 0.52)}px;
              line-height: 1;
              letter-spacing: -${Math.round(size * 0.02)}px;
            }
          </style>
        </head>
        <body>
          <div class="badge">
            <span class="symbol">RB</span>
          </div>
        </body>
      </html>
    `;

    const iconSizes = [
      { name: 'apple-touch-icon.png', size: 180 },
      { name: 'icon-192.png', size: 192 },
      { name: 'icon-512.png', size: 512 },
      { name: 'favicon-32x32.png', size: 32 },
      { name: 'favicon-16x16.png', size: 16 },
    ];

    for (const icon of iconSizes) {
      console.log(`Generating public/${icon.name} (${icon.size}x${icon.size})...`);
      fs.writeFileSync(tempHtmlPath, renderIconHtml(icon.size), 'utf-8');
      await page.setViewport({ width: icon.size, height: icon.size, deviceScaleFactor: 1 });
      await page.goto(`file:///${tempHtmlPath.replace(/\\/g, '/')}`, { waitUntil: 'load' });
      const buffer = await page.screenshot({ type: 'png', omitBackground: true });
      fs.writeFileSync(path.join(publicDir, icon.name), buffer);
      console.log(`✓ Saved public/${icon.name}`);
    }

    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }

    console.log('All static icon assets generated successfully!');
  } finally {
    if (fs.existsSync(tempHtmlPath)) {
      try { fs.unlinkSync(tempHtmlPath); } catch {}
    }
    await browser.close();
  }
}

run().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
