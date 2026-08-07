import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Ensure assets are referenced from the root and output is placed where Vercel expects
  base: "/",
  build: {
    outDir: "dist/client",
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
