const puppeteer = require('puppeteer-core');
const resolve = require('path').resolve;
const slide = process.env.SLIDE || 'test';
const pageURL = 'file://' + resolve(__dirname, `../${slide}.html?print-pdf`);
const pdf = resolve(__dirname, `../pdf/${slide}.pdf`);

(async () => {
  const browser = await puppeteer.launch({
    executablePath:"google-chrome-stable",
    headless: true
  });
  const page = await browser.newPage();

  // await page.setViewport({ width: 1920, height: 1080 });

  await page.goto(pageURL, {
    waitUntil: 'networkidle0'
  });

  await WaitMs(5000);

  await page.pdf({
    margin: 0,
    displayHeaderFooter:false,
    landscape: true,
    printBackground: true,
    omitBackground: false,
    path: pdf
  });

  // close the browser
  await browser.close();
})();

function WaitMs(ms){
  return new Promise(resolve=>setTimeout(e=>resolve(), ms));
}