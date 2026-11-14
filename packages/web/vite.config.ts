import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";
import runableAnalyticsPlugin from "./vite/__plugins/runable-analytics-plugin";
import assetOptimizerPlugin from "./vite/__plugins/asset-optimizer-plugin";
import ports from "../../__ports.cjs";

const root = path.resolve(__dirname, "../..");

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, root, "");
  Object.assign(process.env, env);
  return {
    base: command === "build" ? "/the-easy-ai-enthusiast/" : "/",
    envDir: root,
    plugins: [
      react(),
      runableAnalyticsPlugin(),
      tailwind(),
      assetOptimizerPlugin(),
      {
        name: "pages-analytics-base-path",
        transformIndexHtml: {
          order: "post" as const,
          handler: (html: string) => command === "build"
            ? html.replace('src="/runable.js"', 'src="/the-easy-ai-enthusiast/runable.js"')
            : html,
        },
      },
    ],
    resolve: { alias: { "@": path.resolve(__dirname, "./src/web") } },
    server: {
      port: ports.website,
      strictPort: true,
      allowedHosts: true,
      hmr: { overlay: false },
      cors: false,
    },
  };
});
