/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';
import dev from 'rollup-plugin-dev';
import scss from 'rollup-plugin-scss';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: {
    file: '_build/assets/js/index.js',
    format: 'esm',
    sourcemap: true,
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    typescript(),
    commonjs(),
    nodePolyfills(),
    scss({
      output: false,
    }),
    json(),
    copy({
      targets: [
        { src: 'static/*', dest: '_build/' },
      ]
    }),
    replace({
      values: {'Reflect.decorate': 'undefined'},
      preventAssignment: false,
    }),
    resolve(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
    dev({
      dirs: ["_build"],
      spa: true,
      port: 8000,
    }),
  ],
};