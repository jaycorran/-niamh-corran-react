import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev-only: allow the internal poster tool to read the figure/BG assets that
    // live outside the repo (see README "Internal poster tool"). These are served
    // via /@fs/ by the dev server only and are never bundled into dist/.
    fs: {
      allow: ['.', '/Users/ijakubo/Desktop/Danio'],
    },
    watch: {
      // Ignore non-source files (e.g. Office docs) that can lock the file
      // watcher and crash the dev server on Windows (EBUSY).
      ignored: ['**/*.docx', '**/*.doc', '**/*.xlsx', '**/*.xls', '**/*.pptx', '**/*.ppt', '**/*.pdf'],
    },
  },
})
