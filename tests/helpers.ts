import { execSync } from 'node:child_process';
import type { Page } from '@playwright/test';

export interface StoryEntry {
  id: string;
  title: string;
  name: string;
  type: 'story' | 'docs';
}

/**
 * Fetches the Storybook story index synchronously at collection time so specs
 * can generate one test per story. Playwright starts the webServer before
 * collecting tests, but retry anyway to be safe on cold starts.
 */
export function fetchStories(): StoryEntry[] {
  const raw = execSync(
    'curl -sf --retry 30 --retry-connrefused --retry-delay 1 http://localhost:6006/index.json',
    { encoding: 'utf8', timeout: 60_000 },
  );
  const index = JSON.parse(raw) as { entries: Record<string, StoryEntry> };
  return Object.values(index.entries).filter((e) => e.type === 'story');
}

/** Navigates to a story's iframe, optionally with a theme, and waits for render. */
export async function gotoStory(
  page: Page,
  id: string,
  { theme }: { theme?: 'light' | 'dark' } = {},
): Promise<void> {
  const globals = theme ? `&globals=theme:${theme}` : '';
  await page.goto(`/iframe.html?id=${id}&viewMode=story${globals}`);
  await page.waitForSelector('#storybook-root', { state: 'attached' });
  // Storybook renders synchronously after the preview boots; wait for either
  // content or the error screen so assertions see the final state.
  await page
    .waitForFunction(() => {
      const root = document.querySelector('#storybook-root');
      const err = document.querySelector<HTMLElement>('.sb-errordisplay');
      // the error display exists permanently but is hidden unless a story fails
      return (root && root.childElementCount > 0) || (err && err.offsetParent !== null);
    })
    .catch(() => undefined);
}
