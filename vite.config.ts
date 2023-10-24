import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // LOCAL_PORT
  },
  build: {
    outDir: "build", // Set the output directory to 'build'
  },
});
