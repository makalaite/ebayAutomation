import { test, expect, type Page } from '@playwright/test';

test.describe('Ebay Search Tests', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('has title', async () => {
    await page.goto('https://ebay.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/eBay/);
  });

  test('search for headphones', async () => {
    const searchInput = page.locator('//input[@id="gh-ac"]');
    await searchInput.fill('headphones');
    const searchButton = page.locator('//button[@id="gh-search-btn"]');
    await searchButton.click();

    await Promise.race([
      page.waitForURL('**/sch/**', { timeout: 25000 }),
      page.waitForSelector('.srp-results', { timeout: 25000 }),
      page.waitForSelector('.s-item', { timeout: 25000 })
    ]);

    // Verify we have search results
    const hasResults = await page.locator('.srp-results, .s-item').first().isVisible();
    expect(hasResults).toBe(true);

    
        // Look for Sony checkbox
        const sonyCheckbox = page.locator('//input[@aria-label="Sony"]').first();

  await sonyCheckbox.scrollIntoViewIfNeeded();
          await sonyCheckbox.check();
          await page.waitForTimeout(2000);
expect(sonyCheckbox).toBeChecked();
       
      const priceFilter = page.locator('//div[text()="Price"]').first();
await priceFilter.scrollIntoViewIfNeeded();

        // Set price range with fallback selectors
        const minPrice = page.locator('//input[@aria-label="Minimum Value in $"]');
        const maxPrice = page.locator('//input[@aria-label="Maximum Value in $"]');

        await minPrice.fill('50');
          await maxPrice.fill('200');
          await maxPrice.press('Enter');
          await page.waitForTimeout(2000);

const items = page.locator('//li[@data-view="mi:1686|iid:3"]//div[@class="su-image"]');
await items.click();
// Wait for the new tab that opens when clicking a product
const [productPage] = await Promise.all([
  page.context().waitForEvent('page')
]);
await productPage.waitForLoadState('domcontentloaded');

const addToCartBtn = productPage.locator('//span[text()="Add to cart"]');
await addToCartBtn.click();
await productPage.waitForTimeout(200000);
          
  });

});
