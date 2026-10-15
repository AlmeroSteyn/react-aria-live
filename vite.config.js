import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /(src|demo)\/.*\.[jt]sx?$/,
    exclude: [],
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.js'),
      name: 'ReactAriaLive',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'cjs' ? 'react-aria-live.cjs' : 'react-aria-live.js'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'prop-types'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'prop-types': 'PropTypes',
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
