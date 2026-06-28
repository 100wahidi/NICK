import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remplacez <nom-de-votre-depot> par le nom exact de votre dépôt GitHub (ex: 'nick')
  base: '/NICK/', 
})