# Resume PDF Generation Worker (Railway)

A dedicated, high-throughput containerized Node.js Puppeteer service designed to offload PDF generation from Vercel to a persistent, warm-Chromium microservice.

## Features
- **Fast Execution**: Persistent Chromium instance remains warm between requests; tabs open and close in ~600ms–1.5s instead of 3–5s cold starts.
- **Auto-Recycling**: Recycles Chromium process every 250 jobs to guarantee zero memory leaks.
- **High Concurrency**: Supports parallel PDF renders using controlled concurrency tabs.
- **Dual Mode**:
  1. **Direct HTTP (`POST /generate-pdf`)**: Direct synchronous PDF binary streaming (no Redis required).
  2. **BullMQ Queue (`POST /queue-job`)**: Asynchronous background queue with Redis + optional Supabase Storage upload.
- **Docker-ready for Railway**: Pre-configured with Google Chrome Stable and Debian font packages.

---

## 🚀 How to Deploy on Railway

### Method A: Deploy from Existing GitHub Repository
1. Go to [Railway.app](https://railway.app) and sign in.
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select this repository (`resume-builder-final`).
4. In the service settings:
   - **Root Directory**: Set to `pdf-worker`
   - **Build Command / Builder**: Ensure it selects **Dockerfile**
5. Add the following **Variables** in Railway:
   - `PORT`: `3001` (or leave default, Railway binds automatically)
   - `WORKER_SECRET`: Generate any random secret string (e.g., `sk_worker_9a8b7c6d5e4f`)
   - *(Optional)* `REDIS_URL`: If you add a Redis database on Railway.
6. Click **Generate Domain** under **Settings** → **Networking** to get your public URL (e.g. `https://pdf-worker-production.up.railway.app`).

---

## 🔗 Connect to your Next.js App on Vercel

In your **Vercel Project Dashboard** (or `.env.local` locally):
```env
PDF_WORKER_URL=https://pdf-worker-production.up.railway.app
PDF_WORKER_SECRET=sk_worker_9a8b7c6d5e4f
```

Your Next.js `POST /api/generate-pdf` route will now automatically forward all PDF generation requests to this dedicated worker service!
