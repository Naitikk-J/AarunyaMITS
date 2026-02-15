# AarunyaMITS — Repository Optimization Report

> Generated: 2025-02-15 | Total `public/` assets: **195.71 MB** committed to git

---

## Table of Contents

1. [🔴 Critical Issues](#-critical-issues)
2. [🟠 Unused Dependencies (28 packages)](#-unused-dependencies-28-packages)
3. [🟡 Unused Source Files (13 files)](#-unused-source-files-13-files)
4. [🔵 Binary Assets & Git Bloat](#-binary-assets--git-bloat)
5. [⚪ Configuration Cleanup](#-configuration-cleanup)
6. [📊 Estimated Savings Summary](#-estimated-savings-summary)
7. [✅ Action Checklist](#-action-checklist)

---

## 🔴 Critical Issues

### 1. Hardcoded Mapbox API Key in Source Code

**File:** `src/components/3d/MapboxMap.tsx` (line 41-42)

```ts
const mbTokenPart1 = "pk.eyJ1IjoibmFpdGlrMTUiLCJhIjoiY21rcnl4c3huMTN";
const mbTokenPart2 = "zczNjcXI0NXJtYWJnbyJ9.gtvh5cp45HExNYhckFmmIQ";
```

The token is intentionally split to bypass secret scanners. **This key is exposed in the public repo and should be rotated immediately.** Move to `VITE_MAPBOX_TOKEN` environment variable.

---

### 2. 30 `console.log` Statements Leaking Sensitive Data

| File | Count | Data Leaked |
|------|-------|-------------|
| `src/hooks/useAuth.ts` | 5 | Raw API responses, user objects |
| `src/pages/CampusExplorer.tsx` | 7 | Debug cache/texture logs |
| `src/pages/UnifiedRegistration.tsx` | 18 | Auth state, API responses, localStorage contents |

These are visible in the browser console in production. Remove all or replace with a conditional logger.

---

### 3. Dual Package Manager Lock Files

Both `package-lock.json` (npm, 0.31 MB) and `bun.lockb` (Bun, 0.31 MB) are committed. This causes dependency tree drift between contributors.

**Fix:** Pick one package manager. Delete the other lock file and add it to `.gitignore`.

---

### 4. `next-themes` in a Vite Project

`next-themes` is a Next.js-only package, imported in `src/components/ui/sonner.tsx`. In a Vite SPA it either silently no-ops or breaks theme detection. Replace with a Vite-compatible theme approach.

---

## 🟠 Unused Dependencies (28 packages)

### Server-Side Packages (should NOT be in client dependencies)

| Package | Issue | Action |
|---------|-------|--------|
| `razorpay` | Server-side Node.js SDK. Zero imports in `src/`. Client uses browser checkout script via `useRazorpay` hook. | **Remove** |
| `sharp` | Only used in `scripts/*.js` (build-time image processing). Pulls ~30 MB of native binaries. | **Move to `devDependencies`** |

### Never-Imported Packages

| Package | Action |
|---------|--------|
| `baseline-browser-mapping` | Remove |
| `caniuse-lite` | Remove (transitive dep, not a direct dependency) |
| `@supabase/supabase-js` | Remove (project uses custom API, not Supabase) |
| `@supabase/auth-helpers-react` | Remove |
| `recharts` | Remove |
| `cmdk` | Remove |
| `input-otp` | Remove |
| `embla-carousel-react` | Remove |
| `react-resizable-panels` | Remove |
| `vaul` | Remove |
| `react-day-picker` | Remove |
| `react-map-gl` | Remove (project uses `mapbox-gl` directly) |
| `@hookform/resolvers` | Remove |
| `react-hook-form` | Remove |
| `zod` | Remove |
| `three-mesh-bvh` | Remove |

### Unused Radix UI Packages (20 of 22 installed)

All of these have zero imports anywhere in `src/`:

```
@radix-ui/react-accordion       @radix-ui/react-alert-dialog
@radix-ui/react-aspect-ratio    @radix-ui/react-avatar
@radix-ui/react-checkbox         @radix-ui/react-collapsible
@radix-ui/react-context-menu     @radix-ui/react-dropdown-menu
@radix-ui/react-hover-card       @radix-ui/react-menubar
@radix-ui/react-navigation-menu  @radix-ui/react-popover
@radix-ui/react-progress         @radix-ui/react-radio-group
@radix-ui/react-scroll-area      @radix-ui/react-select
@radix-ui/react-separator        @radix-ui/react-slider
@radix-ui/react-switch           @radix-ui/react-tabs
@radix-ui/react-toggle           @radix-ui/react-toggle-group
```

**Root cause:** shadcn/ui installs Radix primitives for each component added, but most shadcn components were never actually used in the app.

### Consolidation Opportunities

| Current | Issue | Recommendation |
|---------|-------|----------------|
| `sonner` + `@radix-ui/react-toast` | Dual toast system wired in `App.tsx`, but only `sonner` is called by pages. | Remove `@radix-ui/react-toast`, `ui/toast.tsx`, `ui/toaster.tsx`. Keep `sonner`. |
| `react-qr-code` + `qrcode` | Both QR libs are used for different things (rendering vs data URL generation). | Consolidate to one library. |
| `axios` | Only used in `src/lib/api.ts`. Native `fetch` saves ~13 KB gzipped. | Consider replacing with `fetch`. |

---

## 🟡 Unused Source Files (13 files)

### Components — Safe to Delete

| File | Reason |
|------|--------|
| `src/components/ProtectedRoute.tsx` | Never imported by any route or component. |
| `src/components/HeroSection.tsx` | Never imported. Its children (`InsertCoin`, `PixelButton`) become transitively dead. |
| `src/components/InsertCoin.tsx` | Only imported by unused `HeroSection`. |
| `src/components/PixelButton.tsx` | Only imported by unused `HeroSection`. |
| `src/components/NavBar.tsx` | Never imported (replaced by `ui/MainNavigation.tsx`). |
| `src/components/ui/KidcoreDecorations.tsx` | Never imported. |
| `src/components/ui/BottomActions.tsx` | Never imported. |
| `src/components/ui/BuildingInfo.tsx` | Never imported. |
| `src/components/ui/ControlsGuide.tsx` | Never imported. |
| `src/components/ui/use-toast.ts` | Unused barrel re-export. The real implementation is `src/hooks/use-toast.ts`. |

### Hooks — Safe to Delete

| File | Reason |
|------|--------|
| `src/hooks/useGlitchEffect.ts` | Exported but never imported anywhere. |
| `src/hooks/useDeviceCapability.ts` | Exported but never imported anywhere. |

### Pages — Should Not Ship to Production

| File | Reason |
|------|--------|
| `src/pages/ResponsiveTest.tsx` | Debug/development page showing window dimensions and breakpoint tests. Remove from `App.tsx` routes or gate behind `import.meta.env.DEV`. |

---

## 🔵 Binary Assets & Git Bloat

### Total: ~196 MB in `public/` committed to git

| Asset Type | Count | Size | Recommendation |
|------------|-------|------|----------------|
| Gallery photos (`.avif`) | 54 | 5.99 MB | Move to CDN or Git LFS |
| Sound effects (`.wav`) | 15 | 4.29 MB | Convert to `.mp3`/`.ogg` (~80% smaller) |
| 3D model (`statue.glb`) | 1 | 4.31 MB | Apply Draco/meshopt compression or host externally |
| **`tv-book.png`** | 1 | **10.51 MB** | **Redundant — `.avif` version exists.** Delete immediately. |
| `bg-phone.png` | 1 | 0.30 MB | Redundant — `.avif` version exists. Delete. |

### Fonts

| Directory | Files | Size | Status |
|-----------|-------|------|--------|
| `fredoka-one/` | 1 | 83.7 KB | ✅ Used |
| `orbitron/` | 1 | 15.6 KB | ✅ Used |
| `press-start-2p/` | 1 | 1.6 KB | ✅ Used |
| `vt323/` | 1 | 30.5 KB | ✅ Used |
| `space-mono/` | 3 | 103.4 KB | ⚠️ Class defined but **never applied** in any component |
| `{press-start-2p,...,rajdhani}/` | 1 | 28.5 KB | ❌ **Junk** — malformed directory from bad glob/script |

### Files to Remove

- `public/tv-book.png` — **saves 10.51 MB**
- `public/bg-phone.png` — saves 0.30 MB
- `public/fonts/{press-start-2p,vt323,space-mono,orbitron,fredoka-one,rajdhani}/` — junk directory
- `public/fonts/space-mono/` — 3 unused font files (103.4 KB)

---

## ⚪ Configuration Cleanup

### TypeScript — All Safety Checks Disabled

`tsconfig.app.json` has: `strict: false`, `noImplicitAny: false`, `noUnusedLocals: false`, `noUnusedParameters: false`, `noFallthroughCasesInSwitch: false`.

**Recommendation:** Incrementally enable `strict: true`. At minimum enable `noUnusedLocals` and `noUnusedParameters` to catch dead code automatically.

### ESLint — `no-unused-vars` Disabled

`eslint.config.js` sets `@typescript-eslint/no-unused-vars: "off"`, hiding all unused imports and variables.

**Recommendation:** Set to `"warn"` to surface dead code without breaking CI.

### Tailwind Config Bloat

- **Content paths** include `./pages/**`, `./components/**`, `./app/**` — none of these top-level directories exist. Only `./src/**` is valid.
- **Sidebar colors** (`sidebar.*`) are shadcn boilerplate — no sidebar component exists.
- **Accordion animations** (`accordion-down`/`accordion-up`) — no accordion used.

### Deployment Config Redundancy

Both `_redirects` (Netlify) and `vercel.json` (Vercel) exist. Pick the actual deployment platform and remove the other.

### Dead Test Infrastructure

| Item | Status |
|------|--------|
| `vitest.config.ts` | Configured |
| `src/test/setup.ts` | Configured |
| `vitest`, `jsdom`, `@testing-library/jest-dom`, `@testing-library/react` | Installed |
| **Actual test files** | **Zero** |

Either write tests or remove the entire test setup to reduce install time.

### `index.css` Bloat (~700+ lines)

- Multiple effects disabled with `display: none` (`.crt-overlay`, `.noise-overlay`, `.scanlines`, `.vhs-filter`) — dead CSS.
- Utility classes duplicating Tailwind (`.radical-red`, `.electric-yellow`, etc.).
- Stagger animation with 10 hardcoded `:nth-child` rules.

### `robots.txt` References Missing Sitemap

```
Sitemap: https://aarunya.in/sitemap.xml
```

No `sitemap.xml` exists in the repo. Either generate one at deploy time or remove the reference.

### `.gitignore` Missing Entries

Add:
```
# Lock file for unused package manager (pick one)
bun.lockb
# OR
package-lock.json
```

---

## 📊 Estimated Savings Summary

| Category | Estimated Savings |
|----------|-------------------|
| Remove 28 unused npm packages | ~100+ MB in `node_modules`, faster installs |
| Delete unused source files (13 files) | Cleaner codebase, reduced bundle analysis noise |
| Remove `tv-book.png` + `bg-phone.png` | **10.81 MB** from git history |
| Remove junk font directory | 28.5 KB + cleaner structure |
| Remove unused `space-mono` fonts | 103.4 KB |
| Convert `.wav` → `.mp3`/`.ogg` | ~3.4 MB saved (80% reduction) |
| Remove one lock file | 0.31 MB + no more contributor confusion |
| Remove dead test infrastructure | 4 fewer dev deps to install |

---

## ✅ Action Checklist

### Immediate (Critical)

- [ ] **Rotate the Mapbox API key** and move to `VITE_MAPBOX_TOKEN` env var
- [ ] **Remove all 30 `console.log` statements** from `useAuth.ts`, `CampusExplorer.tsx`, `UnifiedRegistration.tsx`
- [ ] **Delete one lock file** (`bun.lockb` or `package-lock.json`) and add to `.gitignore`
- [ ] **Remove `next-themes`** and replace with Vite-compatible theme detection in `sonner.tsx`
- [ ] **Delete `public/tv-book.png`** (10.51 MB redundant PNG)

### High Priority (Dependency Cleanup)

- [ ] Remove `razorpay` from dependencies
- [ ] Move `sharp` to `devDependencies`  
- [ ] Remove all 20 unused Radix UI packages
- [ ] Remove: `baseline-browser-mapping`, `caniuse-lite`, `@supabase/supabase-js`, `@supabase/auth-helpers-react`, `recharts`, `cmdk`, `input-otp`, `embla-carousel-react`, `react-resizable-panels`, `vaul`, `react-day-picker`, `react-map-gl`, `@hookform/resolvers`, `react-hook-form`, `zod`, `three-mesh-bvh`
- [ ] Consolidate dual toast system (remove Radix toast, keep `sonner`)

### Medium Priority (Dead Code Removal)

- [ ] Delete 13 unused source files listed above
- [ ] Remove `ResponsiveTest` route from `App.tsx` (or gate behind `DEV`)
- [ ] Remove corresponding unused shadcn wrapper files (`ui/aspect-ratio.tsx`, `ui/dropdown-menu.tsx`, etc.)
- [ ] Delete `public/bg-phone.png`
- [ ] Delete junk font directory `{press-start-2p,...,rajdhani}/`
- [ ] Delete `public/fonts/space-mono/` (3 unused files)

### Low Priority (Config & Polish)

- [ ] Enable `noUnusedLocals` and `noUnusedParameters` in `tsconfig.app.json`
- [ ] Set `@typescript-eslint/no-unused-vars` to `"warn"` in `eslint.config.js`
- [ ] Clean up `tailwind.config.ts` (remove fake content paths, sidebar colors, accordion animations)
- [ ] Remove either `_redirects` or `vercel.json` based on actual deployment platform
- [ ] Audit `index.css` for dead CSS (~100+ lines of disabled effects)
- [ ] Decide on test infrastructure: write tests or remove `vitest` setup entirely
- [ ] Fix or remove `Sitemap` line in `robots.txt`
- [ ] Consider converting `.wav` sound files to `.mp3`/`.ogg`
- [ ] Consider hosting large assets (photos, GLB model) on a CDN instead of git
