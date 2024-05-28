/// <reference types="vitest" />

import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3001
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8'
    }
  },
})