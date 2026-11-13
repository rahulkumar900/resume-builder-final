import { NextRequest, NextResponse } from 'next/server';
import puppeteer, { Browser } from 'puppeteer';
import { ResumeData } from '@/types/resume';
import { getPageFormatConfig, PageFormat } from '@/lib/page-format';
import { setRenderResume, deleteRenderResume } from '@/lib/render-store';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Reusable Warm Chromium Browser Singleton (persists across requests in Node.js process)
let cachedBrowser: Browser | null = null;
let browserLaunchPromise: Promise<Browser> | null = null;

async function getWarmBrowser(): Promise<Browser> {
  if (cachedBrowser && cachedBrowser.connected) {
    return cachedBrowser;
  }

  if (!browserLaunchPromise) {
    browserLaunchPromise = puppeteer
      .launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-extensions',
          '--disable-background-networking',
          '--disable-default-apps',
          '--disable-sync',
          '--mute-audio',
          '--hide-scrollbars',
          '--metrics-recording-only',
        ],
      })
      .then((browser) => {
        cachedBrowser = browser;
        browser.on('disconnected', () => {
          cachedBrowser = null;
          browserLaunchPromise = null;
        });
        return browser;
      })
      .catch((err) => {
        cachedBrowser = null;
        browserLaunchPromise = null;
        throw err;
      });
  }

  return browserLaunchPromise;
}

export async function POST(req: NextRequest) {
  let renderId = '';
  try {
    // 1. Enforce Authentication Guard: User must be signed in to export/download PDF
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace(/^Bearer\s+/i, '');

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to download your resume.' },
        { status: 401 }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired session. Please sign in to download your resume.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const resumeData: ResumeData = body.resumeData;

    if (!resumeData) {
      return NextResponse.json({ error: 'Missing resumeData in request body' }, { status: 400 });
    }

    const origin = req.nextUrl.origin || 'http://localhost:3000';
    const safeTitle = (resumeData.personalInfo?.fullName || resumeData.title || 'Resume').replace(
      /[^a-z0-9]/gi,
      '_'
    );

    const format: PageFormat = resumeData.layout?.format === 'Letter' ? 'Letter' : 'A4';
    const formatConfig = getPageFormatConfig(format);

    // 2. Offload to Dedicated PDF Worker (Railway / Render / Fly.io container) if configured
    let workerUrl = process.env.PDF_WORKER_URL?.trim().replace(/\/+$/, '');
    if (workerUrl && !/^https?:\/\//i.test(workerUrl)) {
      workerUrl = `https://${workerUrl}`;
    }
    if (workerUrl) {
      try {
        const workerRes = await fetch(`${workerUrl}/generate-pdf`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(process.env.PDF_WORKER_SECRET
              ? { 'x-worker-secret': process.env.PDF_WORKER_SECRET }
              : {}),
          },
          body: JSON.stringify({
            resumeData,
            targetUrl: `${origin}/print/render`,
            safeTitle,
            userId: user.id,
            format,
          }),
        });

        if (!workerRes.ok) {
          const errText = await workerRes.text();
          console.error('[Next.js API] PDF Worker returned error:', workerRes.status, errText);
          throw new Error(`Worker service returned error HTTP ${workerRes.status}: ${errText}`);
        }

        const pdfArrayBuffer = await workerRes.arrayBuffer();
        const pdfBuffer = Buffer.from(pdfArrayBuffer);

        return new NextResponse(pdfBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${safeTitle}_Resume.pdf"`,
            'Content-Length': pdfBuffer.length.toString(),
            'X-Generated-By': 'pdf-worker',
          },
        });
      } catch (workerErr: any) {
        console.error('[Next.js API] Failed to delegate to PDF Worker, falling back to local:', workerErr.message);
        // Fall back to local warm puppeteer below
      }
    }

    // 3. Optimized Local Warm Puppeteer Execution
    renderId = `render_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setRenderResume(renderId, resumeData);

    const targetUrl = `${origin}/print/render?id=${renderId}`;
    const browser = await getWarmBrowser();
    const page = await browser.newPage();

    try {
      // High-resolution viewport matching target format
      await page.setViewport({
        width: Math.round(formatConfig.widthPx),
        height: Math.round(formatConfig.heightPx),
        deviceScaleFactor: 2,
      });

      // Block third-party tracking / telemetry scripts from slowing down the render tab
      await page.setRequestInterception(true);
      page.on('request', (interceptedReq) => {
        const url = interceptedReq.url();
        if (
          url.includes('google-analytics') ||
          url.includes('googletagmanager') ||
          url.includes('clarity.ms') ||
          url.includes('facebook.net') ||
          url.includes('doubleclick')
        ) {
          interceptedReq.abort();
        } else {
          interceptedReq.continue();
        }
      });

      // Fast navigation: domcontentloaded avoids arbitrary networkidle waiting
      await page.goto(targetUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });

      // Wait directly for React Ghost DOM pagination measurement
      try {
        await page.waitForSelector('#a4-resume-document[data-measured-ready="true"]', {
          timeout: 6000,
        });
      } catch {
        await page.waitForSelector('#a4-resume-document[data-pagination-ready="true"]', {
          timeout: 2500,
        });
      }

      // Ensure fonts are ready without long artificial delays
      try {
        await page.evaluate(async () => {
          if (document.fonts && document.fonts.ready) {
            await Promise.race([
              document.fonts.ready,
              new Promise((resolve) => setTimeout(resolve, 1500)),
            ]);
          }
        });
      } catch {
        // Fallback if fonts.ready unsupported
      }

      // Emulate print media so page breaks and print styles apply cleanly
      await page.emulateMediaType('print');

      // Generate exact PDF
      const pdfUint8Array = await page.pdf({
        format,
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
          top: '0mm',
          right: '0mm',
          bottom: '0mm',
          left: '0mm',
        },
      });

      const pdfBuffer = Buffer.from(pdfUint8Array);

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${safeTitle}_Resume.pdf"`,
          'Content-Length': pdfBuffer.length.toString(),
          'X-Generated-By': 'warm-puppeteer',
        },
      });
    } finally {
      // Close only the tab — browser stays alive and warm for subsequent exports!
      await page.close().catch(() => {});
      if (renderId) {
        deleteRenderResume(renderId);
      }
    }
  } catch (error: any) {
    console.error('Puppeteer PDF Generation Error:', error);

    // If browser crashed or connection dropped, force restart on next request
    if (cachedBrowser && !cachedBrowser.connected) {
      cachedBrowser = null;
      browserLaunchPromise = null;
    }

    if (renderId) {
      deleteRenderResume(renderId);
    }

    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  }
}
