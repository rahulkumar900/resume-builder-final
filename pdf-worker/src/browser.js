import puppeteer from 'puppeteer';

let browserInstance = null;
let jobCount = 0;
const MAX_JOBS_BEFORE_RECYCLE = 250;

/**
 * Initializes or returns the warm persistent browser instance.
 */
export async function getBrowser() {
  if (browserInstance && browserInstance.isConnected()) {
    jobCount++;
    if (jobCount >= MAX_JOBS_BEFORE_RECYCLE) {
      console.log(`[Browser] Reached ${jobCount} jobs. Recycling browser instance to release memory...`);
      await closeBrowser();
    } else {
      return browserInstance;
    }
  }

  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || undefined;

  console.log('[Browser] Launching warm Chromium instance with executable:', executablePath || 'bundled default');

  browserInstance = await puppeteer.launch({
    headless: true,
    executablePath,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--hide-scrollbars',
      '--mute-audio',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-breakpad',
      '--disable-component-update',
      '--disable-domain-reliability',
      '--disable-extensions',
      '--disable-features=AudioServiceOutOfProcess',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-popup-blocking',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-sync',
      '--force-color-profile=srgb',
      '--metrics-recording-only',
      '--safebrowsing-disable-auto-update',
      '--password-store=basic',
      '--use-mock-keychain',
    ],
  });

  jobCount = 0;

  browserInstance.on('disconnected', () => {
    console.warn('[Browser] Chromium instance disconnected or crashed. Resetting pool reference...');
    browserInstance = null;
  });

  return browserInstance;
}

export async function closeBrowser() {
  if (browserInstance) {
    try {
      await browserInstance.close();
    } catch (err) {
      console.error('[Browser] Error closing browser instance:', err);
    }
    browserInstance = null;
  }
}
