import { Page } from '@playwright/test';

export async function click(page: Page, selector: string) {
  await page.locator(selector).click();
}

export async function fill(page: Page, selector: string, text: string) {
  await page.locator(selector).fill(text);
}

export async function check(page: Page, selector: string) {
  await page.locator(selector).check();
}

export async function isVisible(page: Page, selector: string) {
  return await page.locator(selector).isVisible();
}

export async function scrollIntoView(page: Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

export async function waitForURL(page: Page, urlPattern: string, timeout: number = 45000) {
  await page.waitForURL(urlPattern, { timeout });
}

export async function waitForSelector(page: Page, selector: string, timeout: number = 45000) {
  await page.waitForSelector(selector, { timeout });
}

export async function press(page: Page, selector: string, key: string) {
  await page.locator(selector).press(key);
}
