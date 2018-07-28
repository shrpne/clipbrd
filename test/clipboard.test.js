import puppeteer from 'puppeteer';
import path from 'path';

let page;
let browser;
const width = 1440;
const height = 900;

beforeAll(async () => {
    browser = await puppeteer.launch({
        // headless: false, // required!
        // slowMo: 250,
        args: [
            `--window-size=${width},${height}`,
            '--no-sandbox', /** required! @see https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-on-travis-ci */
        ],
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto(`file:${path.join(__dirname, '/../example/index.html')}`);
    // await page.bringToFront(); // required!
});
afterAll(() => {
    browser.close();
});


describe('clipbrd', () => {
    test('example page works: copied and pasted values are equal', async () => {
        // click "Copy" button
        await page.click('button');
        // paste
        await pasteTo('input');

        const value = await page.evaluate(() => document.querySelector('input').value);
        expect(value).toHaveLength(10);
        const textStatus = await page.evaluate(() => document.querySelector('strong').textContent);
        expect(textStatus).toEqual('passed');
    }, 16000);

    test('isSupported', async () => {
        const supported = await page.evaluate(() => window.clipbrd.isSupported());
        expect(supported).toEqual(true);
    }, 16000);

    test('copy custom text', async () => {
        await page.evaluate(() => {
            window.clipbrd.copy('AbcdeF 123');
            const input = document.createElement('input');
            input.setAttribute('data-custom-input', '');
            document.body.appendChild(input);
        });
        // paste
        await pasteTo('[data-custom-input]');

        const value = await page.evaluate(() => document.querySelector('[data-custom-input]').value);
        expect(value).toEqual('AbcdeF 123');
    }, 16000);
});

async function pasteTo(inputSelector) {
    // focus input
    await page.click(inputSelector);
    // Windows paste
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyV');
    await page.keyboard.up('Control');
    // macOS paste
    await page.keyboard.down('Meta');
    await page.keyboard.press('KeyV');
    await page.keyboard.up('Meta');
}
