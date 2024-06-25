import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: "static",
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
    },
  },
})