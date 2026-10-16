import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generatePdf } from './generator.js';
import { closeBrowser } from './browser.js';
import { initQueue, getQueue } from './queue.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const workerSecret = process.env.WORKER_SECRET;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Request logging for observability in Railway
app.use((req, res, next) => {
  console.log(`[HTTP] ${req.method} ${req.path}`);
  next();
});

// 1. Health Check Endpoint (Required for Railway / container orchestrators)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'resume-pdf-worker',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Authentication middleware (if WORKER_SECRET is configured)
function authMiddleware(req, res, next) {
  if (!workerSecret) {
    return next(); // Unprotected if secret is omitted
  }

  const providedSecret =
    req.headers['x-worker-secret'] ||
    req.headers['authorization']?.replace(/^Bearer\s+/i, '');

  if (providedSecret !== workerSecret) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing worker secret' });
  }

  next();
}

// 2. Synchronous PDF Generation Endpoint: Returns exact PDF binary stream
app.post('/generate-pdf', authMiddleware, async (req, res) => {
  const startTime = Date.now();
  try {
    const { resumeData, targetUrl, htmlContent, safeTitle } = req.body;

    if (!resumeData && !htmlContent) {
      return res.status(400).json({ error: 'Missing resumeData or htmlContent in request body' });
    }

    console.log(`[Worker] Starting PDF generation for "${safeTitle || 'resume'}"...`);

    const pdfBuffer = await generatePdf({
      resumeData,
      targetUrl,
      htmlContent,
    });

    const elapsedMs = Date.now() - startTime;
    console.log(`[Worker] PDF successfully generated in ${elapsedMs}ms (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);

    const filename = `${(safeTitle || 'Resume').replace(/[^a-z0-9]/gi, '_')}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length.toString(),
      'X-Generation-Time-Ms': elapsedMs.toString(),
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error('[Worker] PDF generation failed:', error);
    return res.status(500).json({
      error: 'Failed to generate PDF',
      message: error.message,
    });
  }
});

// 3. Optional Asynchronous BullMQ Queue Endpoint
app.post('/queue-job', authMiddleware, async (req, res) => {
  const queue = getQueue();
  if (!queue) {
    return res.status(503).json({
      error: 'Queue service unavailable (REDIS_URL not configured). Use /generate-pdf for direct generation.',
    });
  }

  try {
    const { resumeData, targetUrl, userId } = req.body;
    const job = await queue.add('generate', {
      resumeData,
      targetUrl,
      userId,
    });

    res.json({
      status: 'queued',
      jobId: job.id,
    });
  } catch (err) {
    console.error('[Worker] Error enqueueing job:', err);
    res.status(500).json({ error: 'Failed to enqueue PDF job', message: err.message });
  }
});

// 4. Job Status Endpoint (when using Queue mode)
app.get('/job-status/:id', authMiddleware, async (req, res) => {
  const queue = getQueue();
  if (!queue) {
    return res.status(503).json({ error: 'Queue service unavailable' });
  }

  try {
    const job = await queue.getJob(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const state = await job.getState();
    const result = job.returnvalue;
    const failedReason = job.failedReason;

    res.json({
      id: job.id,
      state,
      result,
      failedReason,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve job status', message: err.message });
  }
});

// Initialize background queue if Redis is configured
initQueue();

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(`🚀 PDF Worker running on 0.0.0.0:${port}`);
  console.log(`👉 Health check: http://0.0.0.0:${port}/health`);
  console.log(`🔒 Secret Auth: ${workerSecret ? 'ENABLED' : 'DISABLED'}`);
  console.log(`=========================================`);
});

// Graceful termination handling
async function handleShutdown(signal) {
  console.log(`[Worker] Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await closeBrowser();
    console.log('[Worker] Server and browser closed cleanly.');
    process.exit(0);
  });
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));
