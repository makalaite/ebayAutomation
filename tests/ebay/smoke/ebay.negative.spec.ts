import { test, expect } from '@playwright/test';

test.describe('Ebay negative scenarios', () => {
  test('search returns no results for gibberish query', async ({ page }) => {
    await page.goto('https://ebay.com/');
    await page.locator('//input[@id="gh-ac"]').fill('xzqjwvmblrtyp12345');
    await page.locator('//button[@id="gh-search-btn"]').click();
    await page.waitForSelector('.srp-results');
    const noResults = page.locator('//h3[contains(text(),"No exact matches found")]');
    await expect(noResults).toBeVisible();
  });

  test('search with price range that excludes all results shows no matches', async ({ page }) => {
    await page.goto('https://www.ebay.com/sch/i.html?_nkw=headphones&_udlo=9999&_udhi=9999');
    await expect(page.locator('.s-item__link')).toHaveCount(0, { timeout: 30000 });
  });
});
