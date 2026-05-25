import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// GitHub Pages のプロジェクトサイト（https://<user>.github.io/yakiniku-kokuyou-react/）で
// 配信するため、base にリポジトリ名のパスを指定する。
// これによりビルド後の JS/CSS/画像が /yakiniku-kokuyou-react/assets/... を指し、白画面を防ぐ。
// ※リポジトリ名を変える場合は、この base も同じ名前に合わせること。
export default defineConfig({
  base: '/yakiniku-kokuyou-react/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern' },
    },
  },
});
