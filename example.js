const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://princemerluza.github.io/purecloud-altocloud-tester-site');

    await page.click('input[id="btn-goto-faqs"]');

    await browser.close();
})();