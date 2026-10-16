import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { ResumeData } from '@/types/resume';
import { setRenderResume, deleteRenderResume } from '@/lib/render-store';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let browser = null;
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

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
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
    const safeTitle = (resumeData.personalInfo?.fullName || resumeData.title || 'Resume')
      .replace(/[^a-z0-9]/gi, '_');

    // 2. Offload to Dedicated PDF Worker (Railway / Render / Fly.io container) if configured
    let workerUrl = process.env.PDF_WORKER_URL?.trim().replace(/\/+$/, '');
    if (workerUrl && !/^https?:\/\//i.test(workerUrl)) {
      workerUrl = `https://${workerUrl}`;
    }
    if (workerUrl) {
      console.log(`[Next.js API] Offloading PDF generation to external worker: ${workerUrl}`);
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
        console.error('[Next.js API] Failed to delegate to PDF Worker:', workerErr);
        return NextResponse.json(
          { error: 'PDF Worker Service error', details: workerErr.message },
          { status: 502 }
        );
      }
    }

    // 3. Fallback: Local Puppeteer Execution (for local development or single-server hosting)
    // Register resume data in the render store
    renderId = `render_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setRenderResume(renderId, resumeData);

    const targetUrl = `${origin}/print/render?id=${renderId}`;

    // Launch Puppeteer with optimized cross-platform headless flags
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // High-resolution A4 viewport (794x1123 @ 2x deviceScaleFactor)
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    // Navigate to the print render page
    await page.goto(targetUrl, {
      waitUntil: 'networkidle0',
      timeout: 25000,
    });

    // Wait for Ghost DOM measurement to complete
    try {
      await page.waitForSelector('#a4-resume-document[data-measured-ready="true"]', {
        timeout: 10000,
      });
    } catch {
      // Fallback to initial pagination ready if measured takes too long
      await page.waitForSelector('#a4-resume-document[data-pagination-ready="true"]', {
        timeout: 4000,
      });
    }

    // Wait for document fonts to be fully loaded
    try {
      await Promise.race([
        page.evaluate(() => document.fonts.ready),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);
      // Small pause to allow layout settle after fonts/DOM measurement
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch {
      // Font wait fallback
    }

    // Emulate print media so print stylesheets and page breaks evaluate cleanly
    await page.emulateMediaType('print');

    // Generate exact A4 PDF
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

    const pdfBuffer = Buffer.from(pdfUint8Array);

    await browser.close();
    browser = null;

    // Clean up temporary render data
    if (renderId) {
      deleteRenderResume(renderId);
    }

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeTitle}_Resume.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('Puppeteer PDF Generation Error:', error);
    if (browser) {
      try {
        await browser.close();
      } catch {
        // ignore
      }
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
