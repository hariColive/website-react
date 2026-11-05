
import { test, expect } from '@playwright/test';

test.describe('Colive Homepage', () => {

  test('homepage should load successfully', async ({ page }) => {
    const response = await page.goto('/');

    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });

  test('homepage should have a page title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/.+/);
  });

  test('homepage should not display a Next.js error page', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByText('Internal Server Error', { exact: false })
    ).toHaveCount(0);
  });

});
