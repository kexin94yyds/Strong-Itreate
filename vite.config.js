import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // 这个设置对于Netlify部署很关键，防止白屏问题
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    host: true,
    port: 3000,
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  },
  // 确保静态资源被正确处理
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp', '**/*.JPG', '**/*.PNG', '**/*.JPEG'],
}) 