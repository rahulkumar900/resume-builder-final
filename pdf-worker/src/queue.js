import { Worker, Queue } from 'bullmq';
import { generatePdf } from './generator.js';
import { createClient } from '@supabase/supabase-js';

let pdfQueue = null;
let pdfWorker = null;

export function initQueue() {
  const redisUrl = process.env.REDIS_URL;
  const redisHost = process.env.REDIS_HOST;

  if (!redisUrl && !redisHost) {
    console.log('[Queue] No REDIS_URL or REDIS_HOST provided. Queue mode disabled (direct HTTP mode active).');
    return null;
  }

  const connection = redisUrl
    ? { url: redisUrl }
    : {
        host: redisHost,
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
      };

  console.log('[Queue] Initializing BullMQ PDF queue with Redis...');

  pdfQueue = new Queue('pdf-generation', { connection });

  // Optional Supabase Storage Client
  let supabase = null;
  if (process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)) {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );
  }

  const concurrency = parseInt(process.env.WORKER_CONCURRENCY || '5', 10);

  pdfWorker = new Worker(
    'pdf-generation',
    async (job) => {
      console.log(`[Queue] Processing job ${job.id} for user ${job.data.userId || 'guest'}`);
      const { resumeData, targetUrl, htmlContent, userId, bucketName = 'resume-pdfs' } = job.data;

      const pdfBuffer = await generatePdf({ resumeData, targetUrl, htmlContent });

      // If Supabase Storage is enabled, upload and return signed URL
      if (supabase && userId) {
        const filePath = `${userId}/${Date.now()}_resume.pdf`;
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true,
          });

        if (!uploadError) {
          const { data: signedData, error: signError } = await supabase.storage
            .from(bucketName)
            .createSignedUrl(filePath, 60 * 30); // 30 mins

          if (!signError && signedData?.signedUrl) {
            return {
              status: 'completed',
              downloadUrl: signedData.signedUrl,
              filePath,
            };
          }
        } else {
          console.warn('[Queue] Supabase storage upload warning:', uploadError.message);
        }
      }

      // Return base64 or length metadata
      return {
        status: 'completed',
        size: pdfBuffer.length,
      };
    },
    {
      connection,
      concurrency,
    }
  );

  pdfWorker.on('completed', (job) => {
    console.log(`[Queue] Job ${job.id} successfully completed`);
  });

  pdfWorker.on('failed', (job, err) => {
    console.error(`[Queue] Job ${job?.id} failed with error:`, err);
  });

  return { queue: pdfQueue, worker: pdfWorker };
}

export function getQueue() {
  return pdfQueue;
}
