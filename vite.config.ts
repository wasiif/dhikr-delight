import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Ensure assets are referenced from the root
  base: "/",
  // Let the TanStack plugin emit its `client` and `server` folders under `dist`.
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
  ],
});
