# Yuukke

PR-1 introduces portal route scaffolding and flattens the project so the app now lives at the repository root.

## Route map

### Before
- `/` (single Yuukke app experience with hash-based `#portal` toggle)

### After (PR-1)
- `/` — public landing page with portal entry CTAs
- `/entrepreneurs` — existing Yuukke experience/features
- `/marketing` — placeholder marketing portal scaffold

## Run locally (npm)

**Prerequisites:** Node.js

1. Install dependencies:
   - `npm install`
2. Configure environment variables:
   - copy `.env.example` to `.env.local` (or `.env`) and set required keys
3. Start dev server:
   - `npm run dev`
4. Build production bundle:
   - `npm run build`
