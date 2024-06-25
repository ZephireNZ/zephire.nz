import { resolve } from 'path'
import { Plugin, defineConfig } from 'vite'
import * as fs from 'fs/promises'
import matter from 'gray-matter'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

type DateMatch = {
  year: string,
  month: string,
  day: string,
  name: string
}

async function createPostMap() {
  const input = "static/posts/"
  const file_regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})-(?<name>.+)\.md/;

  const posts = await fs.readdir(input)
  posts.sort().reverse() // Sort reverse chronological

  let post_map = await Promise.all(posts.map(
    async (f) => {
      return fs.readFile(input + f, { encoding: "utf8" })
        .then(file => {
          return {file: f, ...matter(file, { excerpt_separator: "<!--more-->"}) }
        })
        .then(post => {
          const {year, month, day, name} = post.file.match(file_regex)!.groups as DateMatch

          return {
            year: year,
            month: month,
            day: day,
            name: name,
            excerpt: post.excerpt || post.content,
            ...post.data,
          }
        })
    }
  ))

  if (process.env.BUILD_UNPUBLISHED !== "true") {
    post_map = post_map.filter((post) => !("published" in post) || post.published)
  }

  return post_map
}

function createPostMapPlugin(): Plugin {
  return {
    name: 'create-post-map',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const { url } = req
        
        if (url !== "/posts/post-map.json") return next()

        res.statusCode = 200
        res.end(JSON.stringify(await createPostMap(), null, 2))
      })
    },
    async buildEnd() {
      this.emitFile({
        type: 'asset',
        name: 'post-map.json',
        fileName: 'posts/post-map.json',
        source: JSON.stringify(await createPostMap(), null, 2)
      })
    }
  }
}

export default defineConfig({
  publicDir: "static",
  plugins: [
    createPostMapPlugin(),
    nodePolyfills()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
    },
  }
})