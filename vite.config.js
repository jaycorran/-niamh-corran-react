import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignore non-source files (e.g. Office docs) that can lock the file
      // watcher and crash the dev server on Windows (EBUSY).
      ignored: ['**/*.docx', '**/*.doc', '**/*.xlsx', '**/*.xls', '**/*.pptx', '**/*.ppt', '**/*.pdf'],
    },
  },
})
