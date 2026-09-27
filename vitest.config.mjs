import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'node', // server actions run on the server, no DOM needed
  },
  resolve: {
    alias: {
      // Mirrors the "@/*": ["./*"] mapping in jsconfig.json so tests can
      // import '@/actions/budgets' the same way your app code does.
      '@': path.resolve(__dirname, '.'),
    },
  },
});
