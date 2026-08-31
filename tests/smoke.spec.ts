import { test, expect } from '@playwright/test';
import { fetchStories, gotoStory } from './helpers';

/**
 * Renders EVERY story in the light theme and fails on:
 * - Storybook's error screen (story failed to render)
 * - an empty root (nothing rendered)
 * - uncaught page errors / console.error output
 */
const stories = fetchStories();

test.describe('story smoke', () => {
  for (const story of stories) {
    test(`${story.title} › ${story.name}`, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') pageErrors.push(msg.text());
      });

      await gotoStory(page, story.id);

      // Storybook keeps a hidden .sb-errordisplay in the DOM at all times;
      // it only becomes visible when a story actually fails to render.
      await expect(page.locator('.sb-errordisplay'), 'story rendered an error screen').toBeHidden();
      const childCount = await page.locator('#storybook-root > *').count();
      expect(childCount, 'story rendered nothing').toBeGreaterThan(0);
      expect(pageErrors, `page errors: ${pageErrors.join(' | ')}`).toEqual([]);
    });
  }
});
