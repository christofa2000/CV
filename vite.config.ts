// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
    resolve: { dedupe: ["react", "react-dom"] },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: { plugins: [] },
      }),
    ],
    esbuild: {
      target: "es2019",
      legalComments: "none",
      drop: isProd ? ["console", "debugger"] : [],
    },
    build: {
      target: "es2019",
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 600,
      // 👇 sin manualChunks
    },
    optimizeDeps: {
      include: ["react", "react-dom", "@mui/material"],
    },
  };
});
