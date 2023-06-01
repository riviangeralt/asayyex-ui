import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import * as packageJson from './package.json';
// import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss';

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
        // chunkFileNames: (format) => `${format.type}.js`,
        // assetFileNames: (format) => `${format.type}.css`,
        // manualChunks(id) {
        //   // Specify manual chunks here
        //   if (id.includes('node_modules')) {
        //     return 'vendor';
        //   }
        //   // Additional manual chunk configuration as needed
        // },
        // inlineDynamicImports: false,
      },
      // plugins: [
      //   multiInput(),
      //   nodeResolve(),
      //   commonjs(),
      // ],
    },
    cssCodeSplit: true,
  },
})
