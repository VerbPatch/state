import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' with { type: 'json' };

const mybanner = `/**
 * State v${pkg.version}
 * Copyright (c) 2026 VerbPatch
 * @license GPL-3.0-or-later
 */`;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      banner: mybanner,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      exports: 'named',
      banner: mybanner,
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'State',
      sourcemap: true,
      banner: mybanner,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      rootDir: './src',
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { targets: { browsers: '> 0.25%, not dead' } }],
        '@babel/preset-typescript',
      ],
    }),
    terser(),
  ],
};
