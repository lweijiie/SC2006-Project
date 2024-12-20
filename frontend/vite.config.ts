import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  root,
  base: "/career-path-now/",
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
  },
});
