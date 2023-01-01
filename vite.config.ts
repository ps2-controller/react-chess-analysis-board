import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
// import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname,   'src/lib/index.tsx'),
      name: 'ChessAnalysisBoard',
      fileName: `react-chess-analysis-board`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
        },
        sourcemapExcludeSources: true,
      }
    },
    sourcemap: true,
    target: 'esnext',
    minify: false
  },
  plugins: [ 
    react(),
    dts({ insertTypesEntry: true, }),
    // only for type checking
    // typescript()
  ]
})