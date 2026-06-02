import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [storybookTest()],
});
