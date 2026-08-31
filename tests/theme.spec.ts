import { test, expect } from '@playwright/test';
import { gotoStory } from './helpers';

/** Token/theme regression: the data-theme attribute re-points the semantic
 * tokens — the Bayad brand primary lifts from orange #f26122 to #ff7a3d,
 * surfaces flip white → near-black, on-primary text stays white in BOTH
 * themes (the primary stays orange, unlike a light dark-primary brand),
 * and the focus ring lifts with the primary. */

test('light theme: primary button uses Bayad orange #f26122 on white text', async ({ page }) => {
  await gotoStory(page, 'atoms-button--primary', { theme: 'light' });
  const btn = page.locator('.mav-btn-primary');
  await expect(btn).toHaveCSS('background-color', 'rgb(242, 97, 34)');
  await expect(btn).toHaveCSS('color', 'rgb(255, 255, 255)');
});

test('dark theme: primary lifts to #ff7a3d and text stays white', async ({ page }) => {
  await gotoStory(page, 'atoms-button--primary', { theme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const btn = page.locator('.mav-btn-primary');
  await expect(btn).toHaveCSS('background-color', 'rgb(255, 122, 61)');
  await expect(btn).toHaveCSS('color', 'rgb(255, 255, 255)');
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
  expect(light.focus).toBe('rgba(242, 97, 34, 0.4)');

  await gotoStory(page, 'atoms-button--primary', { theme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const dark = await read();
  expect(dark.bg).toBe('#171717');
  expect(dark.text).toBe('#ffffff');
  // status colors are deliberately theme-invariant …
  expect(dark.danger).toBe(light.danger);
  // … while the focus ring lifts with the dark primary
  expect(dark.focus).toBe('rgba(255, 122, 61, 0.4)');
});

test('full-width CTA (xl) carries the orange→blue brand gradient', async ({ page }) => {
  await gotoStory(page, 'atoms-button--primary', { theme: 'light' });
  const gradient = await page.evaluate(() => {
    const btn = document.querySelector('.mav-btn-primary') as HTMLElement;
    btn.classList.add('mav-btn-xl');
    return getComputedStyle(btn).backgroundImage;
  });
  expect(gradient).toContain('linear-gradient');
  expect(gradient).not.toContain('var(');
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
