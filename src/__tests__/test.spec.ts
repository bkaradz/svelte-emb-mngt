import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
	// Go to http://localhost:3000/auth/unauthorized
	await page.goto('http://localhost:3000/auth/unauthorized');
	// Click text=Sign In
	await page.locator('text=Sign In').click();
	await expect(page).toHaveURL('http://localhost:3000/auth/signIn');
	// Click input[name="email"]
	await page.locator('input[name="email"]').click();
	// Fill input[name="email"]
	await page.locator('input[name="email"]').fill('karadz@gmail.com');
	// Press Tab
	await page.locator('input[name="email"]').press('Tab');
	// Fill input[name="password"]
	await page.locator('input[name="password"]').fill('karadz123');
	// Press Enter
	await page.locator('input[name="password"]').press('Enter');
	await expect(page).toHaveURL('http://localhost:3000/');
});
