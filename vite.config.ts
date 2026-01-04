import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// #region agent log
const logPath = '/home/milad/projects/personal/milad-samane.github.io/.cursor/debug.log';
const log = (data: any) => {
  try {
    fs.appendFileSync(logPath, JSON.stringify({...data, timestamp: Date.now(), sessionId: 'debug-session'}) + '\n');
  } catch {}
};

const buildLoggerPlugin = () => {
  const createRequiredFiles = () => {
    const outDir = path.resolve(import.meta.dirname, "dist/public");
    const indexPath = path.join(outDir, "index.html");
    const nojekyllPath = path.join(outDir, ".nojekyll");
    const fourOhFourPath = path.join(outDir, "404.html");
    const indexExists = fs.existsSync(indexPath);
    
    // #region agent log
    log({location: 'vite.config.ts:build-logger', message: 'Creating required files', data: {outDir, indexExists}, hypothesisId: 'E'});
    // #endregion
    
    // Create .nojekyll file
    try {
      fs.writeFileSync(nojekyllPath, '');
      // #region agent log
      log({location: 'vite.config.ts:build-logger', message: '.nojekyll created', data: {nojekyllPath, success: true}, hypothesisId: 'E'});
      // #endregion
    } catch (e) {
      // #region agent log
      log({location: 'vite.config.ts:build-logger', message: '.nojekyll creation failed', data: {error: String(e)}, hypothesisId: 'E'});
      // #endregion
      console.error('Failed to create .nojekyll:', e);
    }
    
    // Create 404.html from index.html for SPA routing
    if (indexExists) {
      try {
        const indexContent = fs.readFileSync(indexPath, 'utf-8');
        fs.writeFileSync(fourOhFourPath, indexContent);
        // #region agent log
        log({location: 'vite.config.ts:build-logger', message: '404.html created from index.html', data: {fourOhFourPath, success: true, size: indexContent.length}, hypothesisId: 'J'});
        // #endregion
      } catch (e) {
        // #region agent log
        log({location: 'vite.config.ts:build-logger', message: '404.html creation failed', data: {error: String(e)}, hypothesisId: 'J'});
        // #endregion
        console.error('Failed to create 404.html:', e);
      }
    } else {
      // #region agent log
      log({location: 'vite.config.ts:build-logger', message: 'Index.html not found, cannot create 404.html', data: {indexPath}, hypothesisId: 'D'});
      // #endregion
      console.warn('Warning: index.html not found at', indexPath);
    }
    
    const files = fs.existsSync(outDir) ? fs.readdirSync(outDir).slice(0, 10) : [];
    // #region agent log
    log({location: 'vite.config.ts:build-logger', message: 'Build output summary', data: {outDir, indexExists, fileCount: files.length, sampleFiles: files, nojekyllExists: fs.existsSync(nojekyllPath), fourOhFourExists: fs.existsSync(fourOhFourPath)}, hypothesisId: 'A'});
    // #endregion
  };
  
  return {
    name: 'build-logger',
    writeBundle: createRequiredFiles, // Runs after each bundle is written
    closeBundle: createRequiredFiles, // Runs when bundle is closed (backup)
  };
};
// #endregion

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), buildLoggerPlugin()];

const outDir = path.resolve(import.meta.dirname, "dist/public");
const basePath = '/';

// #region agent log
log({location: 'vite.config.ts:20', message: 'Build config initialized', data: {outDir, basePath, nodeEnv: process.env.NODE_ENV}, hypothesisId: 'A'});
// #endregion

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
