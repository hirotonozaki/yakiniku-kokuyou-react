import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// base: './' で相対パス出力 → GitHub Pages のサブパスや file:// でも崩れにくい
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    // Dart Sass の新しい API を使用（legacy API 非推奨警告を回避）
    preprocessorOptions: {
      scss: { api: 'modern' },
    },
  },
});
