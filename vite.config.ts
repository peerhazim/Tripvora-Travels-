import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // Relative base ensures assets load properly on GitHub Pages (https://<user>.github.io/<repo>/)
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'generate-github-pages-404',
        closeBundle() {
          const distDir = path.resolve(__dirname, 'dist');
          const docsDir = path.resolve(__dirname, 'docs');
          const indexPath = path.join(distDir, 'index.html');
          const notFoundPath = path.join(distDir, '404.html');
          const noJekyllDist = path.join(distDir, '.nojekyll');

          if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, notFoundPath);
          }
          fs.writeFileSync(noJekyllDist, '');

          // Also mirror to /docs directory for standard GitHub Pages "Deploy from branch -> /docs" mode
          try {
            if (!fs.existsSync(docsDir)) {
              fs.mkdirSync(docsDir, { recursive: true });
            }
            fs.cpSync(distDir, docsDir, { recursive: true, force: true });
          } catch (err) {
            console.error('Error copying build to docs folder:', err);
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
