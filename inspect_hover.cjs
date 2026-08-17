const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/projects', {waitUntil: 'networkidle0'});
  
  // normal color
  const normalColor = await page.evaluate(() => {
    const el = document.querySelector('.glass-card-top .typography');
    return window.getComputedStyle(el).color;
  });
  
  // hover
  await page.hover('.page-glass-card');
  await new Promise(r => setTimeout(r, 500));
  
  // hover color
  const hoverColor = await page.evaluate(() => {
    const el = document.querySelector('.glass-card-top .typography');
    return window.getComputedStyle(el).color;
  });
  
  console.log('Normal:', normalColor);
  console.log('Hover:', hoverColor);
  await browser.close();
})();
