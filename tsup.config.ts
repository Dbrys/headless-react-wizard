import { defineConfig } from 'tsup';
import pkg from './package.json';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  external: [...Object.keys(pkg.peerDependencies || {}), 'react', 'react-dom'],
  sourcemap: true,
  target: 'es2022',
  minify: false,
  splitting: false,
});
