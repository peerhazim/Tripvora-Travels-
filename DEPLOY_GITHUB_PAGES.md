# GitHub Pages Deployment Guide for TripVora Travels

This repository is fully configured to prevent blank white screens on GitHub Pages. You have 3 easy deployment methods:

---

### Option 1: Zero-Config Deployment (Recommended & Easiest)
GitHub Pages has a built-in feature to serve from the `/docs` folder where the pre-compiled production build is stored.

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Update build"
   git push origin main
   ```
2. On your GitHub repository page:
   - Go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select **`main`** (or `master`) and select the **`/docs`** folder from the dropdown.
   - Click **Save**.
3. In 1–2 minutes, your website will be live without any blank white page!

---

### Option 2: One-Command CLI Deploy (`gh-pages`)
1. Run the deploy script in your terminal:
   ```bash
   npm run deploy
   ```
2. This automatically builds the production app and pushes it to a dedicated `gh-pages` branch on GitHub.
3. In **Settings** > **Pages**, set **Branch** to `gh-pages` and folder to `/ (root)`.

---

### Option 3: Automated CI/CD (GitHub Actions)
A workflow has been pre-configured at `.github/workflows/deploy.yml`:
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every time you push to `main`, GitHub Actions will build and deploy your site automatically.

---

### Why the Blank White Page Happened & What Was Fixed:
1. **Uncompiled Source on Static Hosts**: GitHub Pages does not run Node.js or compile `.tsx` files if deployed from repository root. The build now automatically outputs a production bundle into `/docs` and `/dist`.
2. **Jekyll Filtering**: Added `.nojekyll` files so GitHub Pages will not ignore asset folders or mangle JavaScript bundles.
3. **Asset Base Paths**: Configured `base: './'` in `vite.config.ts` and made tour image paths relative (`./images/...`) so they load correctly on repository sub-paths (`https://<user>.github.io/<repo>/`).
4. **404 Routing**: Auto-generated `404.html` so direct URLs and page refreshes work properly.
5. **Runtime Error Boundary**: Added a styled error boundary fallback to prevent unhandled JavaScript exceptions from causing a blank screen.
