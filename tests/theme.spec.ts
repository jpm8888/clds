import { test, expect } from '@playwright/test';
import { gotoStory } from './helpers';

/** Token/theme regression: the data-theme attribute re-points the semantic
 * tokens — brand flips electric blue → lime, surfaces flip white → near-black,
 * and the focus ring stays identical in both themes. */

test('light theme: primary button uses brand blue #352eff on white text', async ({ page }) => {
  await gotoStory(page, 'atoms-button--primary', { theme: 'light' });
  const btn = page.locator('.mav-btn-primary');
  await expect(btn).toHaveCSS('background-color', 'rgb(53, 46, 255)');
  await expect(btn).toHaveCSS('color', 'rgb(255, 255, 255)');
});

test('dark theme: primary button flips to lime #a1ff5b with dark text', async ({ page }) => {
  await gotoStory(page, 'atoms-button--primary', { theme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const btn = page.locator('.mav-btn-primary');
  await expect(btn).toHaveCSS('background-color', 'rgb(161, 255, 91)');
  await expect(btn).toHaveCSS('color', 'rgb(23, 23, 23)');
});

test('semantic surface tokens flip between themes', async ({ page }) => {
  await gotoStory(page, 'atoms-button--primary', { theme: 'light' });
  const read = () =>
    page.evaluate(() => {
      const s = getComputedStyle(document.documentElement);
      return {
        bg: s.getPropertyValue('--mav-bg-default').trim(),
        text: s.getPropertyValue('--mav-text-default').trim(),
        danger: s.getPropertyValue('--mav-system-danger').trim(),
        focus: s.getPropertyValue('--mav-focus-ring').trim(),
      };
    });
  const light = await read();
  expect(light.bg).toBe('#ffffff');
  expect(light.text).toBe('#171717');

  await gotoStory(page, 'atoms-button--primary', { theme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const dark = await read();
  expect(dark.bg).toBe('#171717');
  expect(dark.text).toBe('#ffffff');
  // status + focus ring are deliberately theme-invariant
  expect(dark.danger).toBe(light.danger);
  expect(dark.focus).toBe(light.focus);
});

test('no dangling token: gradient-brand resolves both stops', async ({ page }) => {
  await gotoStory(page, 'atoms-button--primary');
  const gradient = await page.evaluate(() => {
    const el = document.createElement('div');
    el.style.backgroundImage = 'var(--mav-gradient-brand)';
    document.body.appendChild(el);
    return getComputedStyle(el).backgroundImage;
  });
  expect(gradient).toContain('linear-gradient');
  expect(gradient).not.toContain('var(');
});
