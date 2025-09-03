// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from 'rollup-plugin-visualizer'; // opcional

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: { plugins: [] },
      }),
      // visualizer({
      //   filename: 'stats.html',
      //   template: 'treemap',
      //   gzipSize: true,
      //   brotliSize: true,
      // }) as any,
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
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "react";
              if (id.includes("@mui") || id.includes("@emotion")) return "mui";
              if (id.includes("framer-motion")) return "motion";
              if (id.includes("three") || id.includes("@react-three"))
                return "three";
              return "vendor";
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "@mui/material"],
    },
  };
});
