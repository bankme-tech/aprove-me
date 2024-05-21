import { defineConfig } from 'vitest/config';

import tsconfigPaths from 'vite-tsconfig-paths';
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
  },
  plugins: [tsconfigPaths(), swc.vite({ module: { type: 'es6' } })],
});
