import react from "@vitejs/plugin-react";
import {defineConfig} from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // LOCAL_PORT
  },
  build: {
    outDir: "build", // OUT_DIR
  },
  test: {
    environment: "jsdom", //
    setupFiles: ["./server/tests/mockServerSetup.ts"],
    globals: true,
  },
});
