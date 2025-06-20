import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // 这个设置对于Netlify部署很关键，防止白屏问题
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
}) 