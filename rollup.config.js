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
    nodePolyfills({
      // include: [
      //   "lit/polyfill-support",
      //   "@webcomponents/webcomponentsjs/webcomponents-loader",
      //   "marked",
      //   "gray-matter",
      //   "strip-bom-string"
      // ],
    }),
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
  ],
};