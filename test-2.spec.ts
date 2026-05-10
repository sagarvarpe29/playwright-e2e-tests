import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
  await page.getByRole('textbox', { name: 'Email:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
  await page.getByRole('checkbox', { name: 'Remember me?' }).check();
  await page.getByRole('button', { name: 'Log in' }).click();
});