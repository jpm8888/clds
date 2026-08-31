import { defineConfig, devices } from '@playwright/test';

/**
 * E2E/regression tests run against Storybook — every component is exercised
 * through its stories. `bun run test` starts Storybook automatically (or
 * reuses one already running on :6006).
 */
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: [['list']],
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:6006',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'bun run storybook -- --ci',
    url: 'http://localhost:6006/index.json',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
