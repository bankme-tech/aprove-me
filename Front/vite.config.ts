import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  server: {
    host: "0.0.0.0",
    strictPort: true,
    port: 90
  },
  preview: {
    host: "0.0.0.0",
    strictPort: true,
    port: 8080
  }
});
