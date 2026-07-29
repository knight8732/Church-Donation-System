import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Replaces standard compiler with SWC

export default defineConfig({
  plugins: [react()],
});