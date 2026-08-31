import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// Library build for @mav/bayad.
// - Single ES bundle per entry, react externalized (consumer provides it).
// - cssCodeSplit:false merges every component's CSS (imported from the TSX
//   files) plus the token layer into one dist/styles.css.
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      exclude: ['**/*.stories.tsx', 'src/stories/**'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        'tokens/tokens': 'src/tokens/tokens.ts',
      },
      formats: ['es'],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: (info) =>
          info.names?.some((n) => n.endsWith('.css')) ? 'styles.css' : 'assets/[name][extname]',
      },
    },
  },
});
