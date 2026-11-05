
import { test, expect } from '@playwright/test';

test.describe('Colive Search Page', () => {

  test('search page should load successfully', async ({ page }) => {
    const response = await page.goto('/search');

    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/\/search/);
  });

});