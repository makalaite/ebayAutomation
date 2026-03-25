import { expect, Page } from '@playwright/test';
import * as locators from '../locators/ebay.locators';
import { click, fill, waitForURL, waitForSelector, scrollIntoView, check, press } from '../helpers/actions';

async function searchForItem(page: Page) {
  await click(page, locators.searchInput);
  await fill(page, locators.searchInput, 'headphones');
  await click(page, locators.searchButton);
}

async function waitForSearchResults(page: Page) {
  await Promise.race([
    waitForURL(page, locators.searchResultsUrl),
    waitForSelector(page, locators.searchResultsContainer)
  ]);
}

async function showSonyProducts(page: Page) {
  await scrollIntoView(page, locators.sonyCheckbox);
  await check(page, locators.sonyCheckbox);
  expect(await page.locator(locators.sonyCheckbox).isChecked()).toBe(true);
}

async function setPriceRange(page: Page) {
  await scrollIntoView(page, locators.priceFilter);
  await fill(page, locators.minPrice, '50');
  await fill(page, locators.maxPrice, '200');
  await press(page, locators.maxPrice, 'Enter');
}

export {
    searchForItem,
    waitForSearchResults,
    showSonyProducts,
    setPriceRange
}