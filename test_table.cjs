
const puppeteer = require('puppeteer');
const fs = require('fs');

async function test() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Test CSS: table header or @page margin or page break padding
  const html =     <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            -webkit-print-color-adjust: exact;
          }
          /* Method: The Header Table Trick */
          table.page-layout {
            width: 100%;
            border-collapse: collapse;
          }
          thead.page-header-repeat tr td {
            height: 20mm;
          }
          tfoot.page-footer-repeat tr td {
            height: 20mm;
          }
        </style>
      </head>
      <body>
        <div>Hello</div>
      </body>
    </html>
  \;
  
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  console.log('PDF generated successfully, length:', pdf.length);
  await browser.close();
}
test();
