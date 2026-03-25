import { test, expect, type Page } from '@playwright/test';
import { searchForItem, setPriceRange, showSonyProducts, waitForSearchResults } from '../pages/ebay.page';

test.describe('Ebay user flow', () => {
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
    await expect(page).toHaveTitle(/eBay/);
  });

  test('search for headphones', async () => {
    await searchForItem(page);
    await waitForSearchResults(page);
  });

  test('filter Sony products', async () => {
    await showSonyProducts(page);
  });
  
  test('set price range', async () => {
    await setPriceRange(page);
  });
});
