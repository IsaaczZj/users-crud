import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    // Esta é a parte importante!
    watch: {
      // Diga ao Vite para ignorar as alterações no arquivo db.json
      ignored: ['**/db.json'],
    },
  },
})
