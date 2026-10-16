import { getBrowser } from './browser.js';

/**
 * Generates an A4 PDF from resume data using a warm browser tab.
 *
 * @param {Object} options
 * @param {Object} options.resumeData - Full ResumeData object
 * @param {string} [options.targetUrl] - URL of the print render page (e.g. https://domain.vercel.app/print/render)
 * @param {string} [options.htmlContent] - Optional direct HTML content
 * @returns {Promise<Buffer>} - Generated PDF buffer
 */
export async function generatePdf({ resumeData, targetUrl, htmlContent }) {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    // 1. Configure High-DPI A4 Viewport (794x1123 @ 2x device scale)
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    // 2. Inject resume data into the window and sessionStorage before any page scripts execute
    if (resumeData) {
      await page.evaluateOnNewDocument((data) => {
        window.__WORKER_RESUME_DATA__ = data;
        try {
          sessionStorage.setItem('worker_resume_data', JSON.stringify(data));
        } catch (e) {
          // ignore
        }
      }, resumeData);
    }

    // 3. Load target URL or direct HTML content
    if (targetUrl) {
      console.log(`[Generator] Navigating to: ${targetUrl}`);
      await page.goto(targetUrl, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });
    } else if (htmlContent) {
      console.log('[Generator] Rendering direct HTML content...');
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });
    } else {
      throw new Error('Neither targetUrl nor htmlContent was provided for PDF generation');
    }

    // 4. Wait for ghost DOM measurement or pagination ready signal
    try {
      await page.waitForSelector('#a4-resume-document[data-measured-ready="true"]', {
        timeout: 10000,
      });
    } catch (err) {
      console.warn('[Generator] data-measured-ready timed out, checking data-pagination-ready...');
      await page.waitForSelector('#a4-resume-document[data-pagination-ready="true"]', {
        timeout: 5000,
      }).catch(() => {
        console.warn('[Generator] Document ready signal fallback used.');
      });
    }

    // 5. Ensure web fonts are completely resolved
    try {
      await Promise.race([
        page.evaluate(() => document.fonts.ready),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);
      // Short 250ms settle buffer to ensure paint is done
      await new Promise((resolve) => setTimeout(resolve, 250));
    } catch (fontErr) {
      console.warn('[Generator] Font readiness wait skipped:', fontErr.message);
    }

    // 6. Emulate print media so print-specific CSS and @page rules apply
    await page.emulateMediaType('print');

    // 7. Render exact vector A4 PDF
    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
    });

    return Buffer.from(pdfUint8Array);
  } finally {
    // Crucial: Only close the tab, keeping the parent browser hot!
    try {
      await page.close();
    } catch (closeErr) {
      console.error('[Generator] Error closing page tab:', closeErr);
    }
  }
}
