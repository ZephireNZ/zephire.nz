import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';
import dev from 'rollup-plugin-dev';
import { litScss } from 'rollup-plugin-scss-lit';
import json from '@rollup/plugin-json';

import * as fs from 'fs/promises';
import * as path from 'path';
import matter from 'gray-matter';
import fg from 'fast-glob';

function createPostMap(options = {}) {
  return {
    name: 'createPostMap',
    buildEnd: async () => {
      const {
        input = "static/posts/",
        output = "post-map.json"
      } = options

      const file_regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})-(?<name>.+)\.md/;

      const posts = await fs.readdir(input)
      posts.sort().reverse() // Sort reverse chronological

      var post_map = await Promise.all(posts.map(
        async (f) => {
          return fs.readFile(input + f, { encoding: "utf8" })
            .then(file => {
              return {file: f, ...matter(file) }
            })
            .then(post => {
              const {year, month, day, name} = post.file.match(file_regex).groups

              return {
                year: year,
                month: month,
                day: day,
                name: name,
                excerpt: post.content.substr(0, post.content.indexOf("<!--more-->")) || post.content,
                ...post.data,
              }
            })
        }
      ))

      if (process.env.BUILD_UNPUBLISHED !== "true") {
        post_map = post_map.filter((post) => !("published" in post) || post.published)
      }
        
      await fs.mkdir(path.dirname(output), {recursive: true})
      await fs.writeFile(output, JSON.stringify(post_map))
    }
  }
}

function watchStatic() {
  return {
    'name': 'watch-static',
    async buildStart() {
      const files = await fg('static/**/*');
      files.forEach(this.addWatchFile);
    }
  }
}

export default {
  input: 'src/index.ts',
  output: {
    file: '_build/assets/js/index.js',
    format: 'esm',
    sourcemap: true,
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning?.loc?.file} ${warning.message}`);
    }
  },
  plugins: [
    typescript(),
    commonjs(),
    nodePolyfills(),
    litScss({
      options: { loadPaths: ['node_modules'] }
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
    createPostMap({
      input: "static/posts/",
      output: "_build/posts/post-map.json",
    }),
    watchStatic(),
    summary(),
    dev({
      dirs: ["_build"],
      spa: true,
      port: 8000,
    }),
  ],
};