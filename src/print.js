const puppeteer = require('puppeteer-core');
const resolve = require('path').resolve;
const slide = process.env.SLIDE || 'test';
const pageURL = 'file://' + resolve(__dirname, `../${slide}.html?print-pdf`);
const pdf = resolve(__dirname, `../pdf/${slide}.pdf`);

const product = "chrome" || "firefox";

(async () => {
  const browser = await puppeteer.launch({
    executablePath:product,
    product,
    headless: true
  });
  const page = await browser.newPage();

  await page.goto(pageURL, {
    waitUntil: 'networkidle0'
  });

  await WaitMs(2000);

  await page.pdf({
    width:999,
    height:728,
    landscape: true,
    printBackground: true,
    omitBackground:false,
    path: pdf,
    displayHeaderFooter:false,
    margin:0
  });
  await browser.close();
})();

function WaitMs(ms){
  return new Promise(resolve=>setTimeout(resolve, ms));
}