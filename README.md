# eBay E2E Test Suite

Playwright-based end-to-end test automation for an eBay shopping flow.

## Setup

**Prerequisites:** Node.js 18+

```bash
npm install
npx playwright install
```

## Running Tests

Run all tests (Chromium + Firefox):
```bash
npx playwright test
```

Run on a single browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

View the HTML report after a run:
```bash
npx playwright show-report
```

## Project Structure

```
tests/ebay/
├── helpers/        # Shared action wrappers (click, fill, etc.)
├── locators/       # All element selectors
├── pages/          # Page functions (one per user action)
├── smoke/          # Test specs
└── test-data/      # shipping.csv — input data for the shipping form
```

## Test Suites

- **ebay.spec.ts** — Full happy-path flow: search → filter → select item → add to cart → checkout → fill shipping form → return to cart → remove item
- **ebay.negative.spec.ts** — Negative scenarios: gibberish search, price range with no results

## Notes & Assumptions

- Tests run in **serial mode** — each test depends on the state of the previous one
- The third search result is selected by position (`data-view="mi:1686|iid:3"`); if eBay changes its markup this locator may need updating
- If the product requires selecting an option (e.g. color/size), the test handles it automatically
- The shipping form is filled with dummy data from `test-data/shipping.csv`
- eBay's checkout sign-in modal loads inside an iframe — the guest checkout button is located within `iframe#auth-iframe`
- Tests run with `headless: false` locally; on CI (`npx playwright test`) they run headless by default via the GitHub Actions workflow
- The CI pipeline is defined in `.github/workflows/playwright.yml` and uploads the HTML report as an artifact on every run
