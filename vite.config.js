import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — changes rarely, long cache TTL
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // i18n — large, separate chunk
          'vendor-i18n': ['i18next', 'react-i18next'],
          // Ant Design icons — very large, isolate (antd itself left for tree-shaking)
          'vendor-antd-icons': ['@ant-design/icons'],
        },
      },
    },
    // Raise warning threshold since antd is inherently large
    chunkSizeWarningLimit: 600,
  },
});
