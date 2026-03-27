import { expect, Page } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';
import * as locators from '../locators/ebay.locators';
import { click, fill, waitForSelector, scrollIntoView, check, press, isVisible } from '../helpers/actions';

interface ShippingData {
  email: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

function loadShippingData(): ShippingData {
  const csvPath = path.join(__dirname, '../test-data/shipping.csv');
  const records = parse(fs.readFileSync(csvPath), { columns: true, skip_empty_lines: true }) as ShippingData[];
  return records[0];
}

async function searchForItem(page: Page) {
  await click(page, locators.searchInput);
  await fill(page, locators.searchInput, 'headphones');
  await click(page, locators.searchButton);
}

async function waitForSearchResults(page: Page) {
  await waitForSelector(page, locators.searchResultsContainer);
}

async function showSonyProducts(page: Page) {
  await scrollIntoView(page, locators.sonyCheckbox);
  await check(page, locators.sonyCheckbox);
  await expect(page.locator(locators.sonyCheckbox)).toBeChecked();
}

async function setPriceRange(page: Page) {
  await scrollIntoView(page, locators.priceFilter);
  await fill(page, locators.minPrice, '50');
  await fill(page, locators.maxPrice, '200');
  await press(page, locators.maxPrice, 'Enter');
}

async function selectThirdItem(page: Page) {
  await scrollIntoView(page, locators.thirdItem);

  const [productPage] = await Promise.all([
    page.context().waitForEvent('page'),
    click(page, locators.thirdItem),
  ]);

  await productPage.waitForLoadState('domcontentloaded');
  return productPage;
}

async function addToCart(page: Page) {
  const isSelectOptionVisible = await isVisible(page, locators.selectOptionBtn);

  if (isSelectOptionVisible) {
    await click(page, locators.selectOptionBtn);
    await waitForSelector(page, locators.optionItem);
    await page.locator(locators.optionItem).first().click();
  }

  await click(page, locators.addToCartBtn);
}

async function seeInCart(page: Page) {
  await waitForSelector(page, locators.seeInCartBtn);

  const newPagePromise = page.context().waitForEvent('page', { timeout: 15000 }).catch(() => null);
  await click(page, locators.seeInCartBtn);
  const newPage = await newPagePromise;

  const cartPage = newPage ?? page;
  await cartPage.waitForLoadState('domcontentloaded');
  await waitForSelector(cartPage, locators.goToCheckoutBtn);
  return cartPage;
}

async function goToCheckout(page: Page) {
  await click(page, locators.goToCheckoutBtn);
  const authFrame = page.frameLocator('iframe#auth-iframe');
  await authFrame.locator(locators.checkOutAsGuestBtn).click();
  await waitForSelector(page, locators.shippingAddressForm);
}

async function fillShippingForm(page: Page) {
  const data = loadShippingData();
  await fill(page, locators.emailInput, data.email);
  await fill(page, locators.firstNameInput, data.firstName);
  await fill(page, locators.lastNameInput, data.lastName);
  await fill(page, locators.streetAddressInput, data.streetAddress);
  await fill(page, locators.cityInput, data.city);
  await fill(page, locators.stateInput, data.state);
  await fill(page, locators.zipCodeInput, data.zipCode);
  await fill(page, locators.phoneInput, data.phone);
}

async function returnToCart(page: Page) {
  await page.goBack();
  await waitForSelector(page, locators.goToCheckoutBtn);
}

async function removeFromCart(page: Page) {
  await click(page, locators.removeFromCartBtn);
  await expect(page.locator(locators.emptyCartMessage)).toBeVisible();
}

export {
  searchForItem,
  waitForSearchResults,
  showSonyProducts,
  setPriceRange,
  selectThirdItem,
  addToCart,
  seeInCart,
  goToCheckout,
  fillShippingForm,
  returnToCart,
  removeFromCart,
}