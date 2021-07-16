const puppeteer = require('puppeteer-core');
const resolve = require('path').resolve;
const slide = process.env.SLIDE || 'test';
const pageURL = 'file://' + resolve(__dirname, `../${slide}.html?print-pdf`);
const pdf = resolve(__dirname, `../pdf/${slide}.pdf`);

const product = 'chrome' || 'firefox';

(async () => {
  console.log('Creating an browser instance');
  const browser = await puppeteer.launch({
    executablePath: product,
    product,
    headless: true,
  });

  console.log('Creating a new tab');
  const page = await browser.newPage();

  console.log('Navigating to the presentation');
  await page.goto(pageURL, {
    waitUntil: 'networkidle0',
  });
  await WaitMs(5000);

  console.log('Printing the pdf');
  await page.pdf({
    width: 999,
    height: 728,
    landscape: true,
    printBackground: true,
    omitBackground: false,
    path: pdf,
    displayHeaderFooter: false,
    margin: 0,
  });

  console.log('Closing browser');
  await browser.close();
  console.log('All done!');
})();

function WaitMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
