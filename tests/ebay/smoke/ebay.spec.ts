import { test, expect, type Page } from '@playwright/test';
import { searchForItem, setPriceRange, showSonyProducts, waitForSearchResults, selectThirdItem, addToCart, seeInCart, goToCheckout, fillShippingForm, returnToCart, removeFromCart } from '../pages/ebay.page';

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

  test('set price range and search', async () => {
    await setPriceRange(page);
  });

  test('select third item from the results list', async () => {
    page = await selectThirdItem(page);
  });

  test('add product to cart', async () => {
    await addToCart(page);
  });

  test('see product in cart', async () => {
    page = await seeInCart(page);
  });

  test('go to checkout', async () => {
    await goToCheckout(page);
  });

  test('fill shipping form', async () => {
    await fillShippingForm(page);
  });

  test('return to cart', async () => {
    await returnToCart(page);
  });

  test('remove item from cart', async () => {
    await removeFromCart(page);
  });

});
