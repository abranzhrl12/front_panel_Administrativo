import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@shared': resolve(__dirname,'src/shared'),
      '@styles': resolve(__dirname,'src/shared/styles'),
      '@providers': resolve(__dirname,'src/app/providers'),
      '@icons': resolve(__dirname,'src/shared/assets/icons'),
    },
  },
})
