import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as packageJson from './package.json'
// import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libCss()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Test Library',
      formats: ['es', 'umd'],
      fileName: (format) => `asayyex-ui.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: true,
  },
})
