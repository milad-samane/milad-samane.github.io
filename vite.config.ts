import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const buildPlugin = () => {
  const createRequiredFiles = () => {
    const outDir = path.resolve(import.meta.dirname, "dist/public");
    const indexPath = path.join(outDir, "index.html");
    const nojekyllPath = path.join(outDir, ".nojekyll");
    const fourOhFourPath = path.join(outDir, "404.html");
    const indexExists = fs.existsSync(indexPath);
    
    // Create .nojekyll file to prevent Jekyll processing
    try {
      fs.writeFileSync(nojekyllPath, '');
    } catch (e) {
      console.error('Failed to create .nojekyll:', e);
    }
    
    // Create 404.html from index.html for SPA routing on GitHub Pages
    if (indexExists) {
      try {
        const indexContent = fs.readFileSync(indexPath, 'utf-8');
        fs.writeFileSync(fourOhFourPath, indexContent);
      } catch (e) {
        console.error('Failed to create 404.html:', e);
      }
    } else {
      console.warn('Warning: index.html not found at', indexPath);
    }
  };
  
  return {
    name: 'github-pages-plugin',
    writeBundle: createRequiredFiles,
    closeBundle: createRequiredFiles,
  };
};

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), buildPlugin()];

const outDir = path.resolve(import.meta.dirname, "dist/public");
const basePath = '/';

export default defineConfig({
  base: basePath,
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: outDir,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
