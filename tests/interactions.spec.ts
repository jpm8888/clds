import { test, expect } from '@playwright/test';
import { gotoStory } from './helpers';

test('Toggle flips aria-checked on click', async ({ page }) => {
  await gotoStory(page, 'molecules-toggle--default');
  const toggle = page.getByRole('switch').first();
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
});

test('Tabs move selection on click', async ({ page }) => {
  await gotoStory(page, 'molecules-tabs--default');
  const tabs = page.getByRole('tab');
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'false');
});

test('OtpInput auto-advances and distributes typed digits', async ({ page }) => {
  await gotoStory(page, 'atoms-otpinput--default');
  const first = page.getByLabel('Digit 1 of 6');
  await first.click();
  await page.keyboard.type('123456');
  for (let i = 1; i <= 6; i++) {
    await expect(page.getByLabel(`Digit ${i} of 6`)).toHaveValue(String(i));
  }
  // backspace clears the last digit and moves focus back
  await page.keyboard.press('Backspace');
  await expect(page.getByLabel('Digit 6 of 6')).toHaveValue('');
});

test('OtpInput distributes a pasted code', async ({ page }) => {
  await gotoStory(page, 'atoms-otpinput--default');
  const first = page.getByLabel('Digit 1 of 6');
  await first.click();
  await first.evaluate((el: HTMLInputElement) => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '987654');
    el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true }));
  });
  await expect(page.getByLabel('Digit 1 of 6')).toHaveValue('9');
  await expect(page.getByLabel('Digit 6 of 6')).toHaveValue('4');
});

test('BottomSheet closes on Escape and on the close button', async ({ page }) => {
  await gotoStory(page, 'organisms-bottomsheet--default');
  const sheet = page.getByRole('dialog');
  await expect(sheet).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();

  // reopen via the story's trigger, close via the header button
  await page.getByRole('button', { name: 'Open sheet' }).click();
  await expect(sheet).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(sheet).toBeHidden();
});

test('SwipeButton confirms via keyboard (Enter on the thumb)', async ({ page }) => {
  await gotoStory(page, 'molecules-swipebutton--gradient');
  const thumb = page.getByRole('button', { name: /swipe to pay/i });
  await thumb.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.swipe')).toHaveClass(/swipe-done/);
});

test('SwipeButton confirms via a real pointer drag to the end', async ({ page }) => {
  await gotoStory(page, 'molecules-swipebutton--pill');
  const track = page.locator('.swipe');
  const thumb = track.locator('.swipe-thumb');
  const trackBox = (await track.boundingBox())!;
  const thumbBox = (await thumb.boundingBox())!;

  await page.mouse.move(thumbBox.x + thumbBox.width / 2, thumbBox.y + thumbBox.height / 2);
  await page.mouse.down();
  // drag in steps past the end of the track
  for (let i = 1; i <= 8; i++) {
    await page.mouse.move(
      thumbBox.x + ((trackBox.width - thumbBox.width / 2) * i) / 8,
      thumbBox.y + thumbBox.height / 2,
      { steps: 3 },
    );
  }
  await page.mouse.up();
  await expect(track).toHaveClass(/swipe-done/);
});

test('disabled SwipeButton does not confirm', async ({ page }) => {
  await gotoStory(page, 'molecules-swipebutton--disabled');
  const thumb = page.locator('.swipe-thumb');
  await thumb.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.swipe')).not.toHaveClass(/swipe-done/);
});

test('TextField shows error state with message', async ({ page }) => {
  await gotoStory(page, 'atoms-textfield--error-state').catch(() => undefined);
  // fall back to any error story id variant
  if ((await page.locator('.field').count()) === 0) {
    await gotoStory(page, 'atoms-textfield--error');
  }
  await expect(page.locator('.is-error').first()).toBeVisible();
});

test('SelectAccount picks an account and confirms it', async ({ page }) => {
  await gotoStory(page, 'organisms-selectaccount--default');
  const radios = page.getByRole('radio');
  await expect(radios.first()).toHaveAttribute('aria-checked', 'true');
  await radios.nth(1).click();
  await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'true');
  // locked rows cannot be selected
  const locked = page.getByRole('radio', { name: /Locked Pot/ });
  await expect(locked).toBeDisabled();
});
