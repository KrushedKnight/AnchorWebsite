# Anchor Website

Landing page for **Anchor** — a macOS focus & session-tracking productivity app.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Hosting:** Vercel
- **Styling:** Plain CSS (globals.css, CSS variables) — no Tailwind
- **Fonts:** Lora (serif, headings) + DM Sans (body) via `next/font/google`
- **Animations:** GSAP + ScrollTrigger (npm package)
- **3D:** Three.js (hero particle canvas)

## Project Structure
```
app/
  layout.tsx        — root layout, font loading, metadata
  page.tsx          — main landing page (server component)
  globals.css       — all styles, CSS variables, responsive breakpoints
  components/
    HeroCanvas.tsx  — Three.js particle background (client)
    Animations.tsx  — GSAP scroll animations (client)
    LiveTimer.tsx   — live countdown timer for mock app (client)
    CustomCursor.tsx — custom cursor with lerp tracking (client)
```

## Design System
- Palette: cream (#faf7f2), sand (#f0e9df), blush (#e8d5c4), sage (#a8b8a4), accent (#7b9e8a)
- Warm, grounded, soft aesthetic — NOT dark mode
- 50px pill buttons, 20px card radius
- Noise texture overlay on body

## Key Commands
- `npm run dev` — local dev server
- `npm run build` — production build
- Deploys automatically via Vercel on push

## Sections
1. Fixed frosted-glass nav
2. Hero with Three.js canvas, GSAP entrance, live timer mock
3. Marquee strip
4. Features (3-col grid, 6 cards)
5. Screenshot rows (widget demo, analytics demo)
6. How it Works (3 steps with connecting lines)
7. Download CTA
8. FAQ (2-col grid)
9. Footer