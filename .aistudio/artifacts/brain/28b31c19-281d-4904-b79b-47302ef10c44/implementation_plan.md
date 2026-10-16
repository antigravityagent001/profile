# GitHub Pages Deployment Fix & bacondev123 Branding Alignment

Resolve the blank white screen on GitHub Pages by replacing the root entry point with a self-contained, zero-build production HTML file and cleansing all legacy metadata of old names in favor of bacondev123.

## User Review & Critical Decisions

> [!IMPORTANT]
> The root cause of the blank white screen is that GitHub Pages serves `index.html` as a static file, but the repository currently points to `/src/main.tsx` (an uncompiled TypeScript React file that browsers cannot execute directly).

- **Confirmed Decision 1**: Replace the repository's root `index.html` with a self-contained zero-build file powered by Tailwind CSS CDN and Lucide Icons CDN. Pushing directly to GitHub `main` will render the site instantly without requiring any GitHub Actions build runner.
- **Confirmed Decision 2**: Use `bacondev123` across all metadata, links, social handles, and documentation references (`bacondev123.github.io`, `github.com/bacondev123`).
- **Confirmed Decision 3**: Complete removal of all legacy references (`Nopphakon Boonsong`, `neew1152`, etc.) in `metadata.json` and project files.

---

## 1. Overview & Core Concept

- **What It Does**: Delivers an instantly deployable developer portal for **bacondev123** (9th-grade systems, Luau game developer, and embedded robotics programmer) that renders immediately on GitHub Pages without build failures.
- **Target Audience**: GitHub visitors, Roblox/Luau community developers, and school robotics collaborators.
- **Key Value**: 100% reliable deployment on GitHub Pages out-of-the-box, zero 404/MIME errors, sub-second load times, and authentic presentation of actual code and hardware projects.

---

## 2. User Experience & Visual Design

- **Aesthetic Direction**: Modern Dark-Purple / Violet Linear & Vercel-inspired developer theme.
  - **Background**: Deep void slate/zinc (`#090a10` and `#0b0c16`).
  - **Borders & Accents**: Subtle dark-purple hairline borders (`border-purple-900/40`), glowing hover transitions (`hover:border-purple-500/60`, `shadow-purple-500/10`), electric violet (`violet-500`), and indigo (`indigo-400`).
  - **Typography**: Clean typography pairing using Syne for bold headlines, Plus Jakarta Sans for body prose, and JetBrains Mono for terminal code blocks.
- **Layout & Structure**:
  1. **Top Bar (3-Zone Contract)**: Wordmark (`bacondev123.github.io`), 4 clean navigation links (`Projects`, `Robotics`, `Visualizations`, `GitHub`), and primary action button (`@bacondev123`).
  2. **Hero Section**: High-impact headline, authentic bio, unboxed stack metadata (`Luau / Rojo • C++ / POP32 • Python / Manim • Git CLI`), action buttons, and live terminal session preview.
  3. **Showcase 1 (The Rising Miracle)**: Luau turn-based server-authoritative combat, Rojo project directory structure, interactive tab switcher for `ActionValidator.luau`, and 16:9 OBS gameplay video container (`assets/combat_demo.mp4`).
  4. **Showcase 2 (Robotics & Hardware)**: Autonomous line tracking in C++, POP32 (ESP32) & ATX2 controller specs, copyable PD control loop routine, and 16:9 video container (`assets/robotics_demo.mp4` / `assets/robotics_hardware.jpg`).
  5. **Showcase 3 (Mathematical Visualizations)**: Python Manim Community Edition, 3D shadow projection algorithm, copyable script, and 16:9 MP4 render container (`assets/manim_render.mp4`).
  6. **Public GitHub Repositories**: Direct interactive cards to `bacondev123/robotics` and `bacondev123/MathAnimations`, plus daily Git CLI commitment banner.
  7. **Footer**: Clean attribution with direct links to repositories and profile.

---

## 3. Key Product Decisions & Trade-Offs

- **Zero-Build Self-Contained `index.html`**:
  - *Chosen Approach*: Embed Tailwind CSS and Lucide Icons via high-availability CDN directly in `index.html`.
  - *Why*: Eliminates the dependency on GitHub Actions runners, Node build environments, or base path subfolder mismatches (`/my-portal/`). Any push to `main` instantly reflects on GitHub Pages.
- **Dual Support for AI Studio Dev Server & GitHub Pages**:
  - *Chosen Approach*: Provide the zero-build production code in `index.html`, while keeping `src/App.tsx` and Vite dev server operational so both AI Studio preview and raw GitHub Pages hosting work simultaneously without conflicts.

---

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────┐
│                   GitHub Repository                      │
├──────────────────────────┬───────────────────────────────┤
│ index.html (Root)        │ Standalone Zero-Build Engine  │
│                          │ • Tailwind CSS CDN            │
│                          │ • Lucide Icons CDN            │
│                          │ • Syne & JetBrains Mono Fonts │
│                          │ • Real Media Embeds (16:9)    │
├──────────────────────────┼───────────────────────────────┤
│ metadata.json            │ bacondev123 Identity Synced   │
├──────────────────────────┼───────────────────────────────┤
│ vite.config.ts           │ base: './' Relative Asset Res │
├──────────────────────────┼───────────────────────────────┤
│ src/App.tsx              │ Synced Dark-Purple UI (Dev)   │
└──────────────────────────┴───────────────────────────────┘
```

- **Metadata Cleanup**: Replace all instances of `Nopphakon Boonsong` and `neew1152` in `metadata.json` with `bacondev123`.
- **Media Fallbacks**: All video tags include subtle styled overlay labels so that even before custom recording files (`combat_demo.mp4`, `robotics_demo.mp4`, `manim_render.mp4`) are placed into `assets/`, the containers look sleek and intentional.
