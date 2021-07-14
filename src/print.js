const puppeteer = require('puppeteer');
const resolve = require('path').resolve;
const slide = process.env.SLIDE || 'test';
const page = resolve(__dirname, `../${slide}.html`);
const pdf = resolve(__dirname, `../pdf/${slide}.pdf`);

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto(page, {
    waitUntil: 'networkidle2'
  })

  await page.pdf({
    format: 'A5',
    path: pdf
  })

  // close the browser
  await browser.close();
})()