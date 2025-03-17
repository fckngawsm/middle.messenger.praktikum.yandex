import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  base: "/",
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@domains": path.resolve(__dirname, "src/domains"),
      "@features": path.resolve(__dirname, "src/features"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@templates": path.resolve(__dirname, "src/templates"),
    },
  },
});
