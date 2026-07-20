import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [storybookTest()],
  test: {
    browser: {
      enabled: true,
      headless: true,
      // ponytail: pins the system-installed Chrome channel because Playwright's
      // own Chromium download refuses unrecognized/bleeding-edge host OSes
      // (e.g. this box's Ubuntu 26.04); switch back to the default bundled
      // Chromium once Playwright lists the host OS as supported.
      provider: playwright({ launchOptions: { channel: 'chrome' } }),
      instances: [{ browser: 'chromium' }],
    },
  },
});
