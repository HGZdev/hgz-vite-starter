import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";
import {getViteConfig} from "./src/_server/helpers.ts";

export default ({mode}) => {
  const {VITE_LOCAL_PORT, VITE_LOCAL_SERVER_PORT} = getViteConfig(mode);

  return defineConfig({
    plugins: [react()],
    server: {
      port: parseInt(VITE_LOCAL_PORT, 10),
    },
    preview: {
      port: parseInt(VITE_LOCAL_SERVER_PORT, 10),
    },
    build: {
      outDir: "build",
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/tests/vitestSetup.ts"],
      globals: true,
    },
  });
};
