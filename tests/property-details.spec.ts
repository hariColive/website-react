
import { test, expect } from '@playwright/test';

const propertyLink = process.env.COLIVE_TEST_PROPERTY_LINK;

test('property details page should load', async ({ page }) => {

  test.skip(!propertyLink, 'Property URL is missing');

  console.log('Testing property URL:', propertyLink);

  const response = await page.goto(propertyLink!, {
    waitUntil: 'domcontentloaded',
  });

  console.log('Response status:', response?.status());

  expect(response?.status()).toBe(200);

  await expect(page.locator('body')).toBeVisible();

});
