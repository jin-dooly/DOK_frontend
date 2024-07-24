import React from 'react';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // server: {
  //   proxy: {
  //     // 프락시 인스턴스 사용
  //     '/api': {
  //       target: 'http://kdt-sw-6-team01.elicecoding.com',
  //       changeOrigin: true,
  //       configure: (proxy, options) => {
  //         // proxy 변수에는 'http-proxy'의 인스턴스가 전달됩니다
  //       }
  //     },
  //   }
  // }
});
