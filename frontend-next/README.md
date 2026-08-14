# Brew Haven — Frontend (Next.js)

Marketing and booking site for the Brew Haven coffee house.
Next.js 16 (App Router) + React 19, Tailwind CSS v4, Framer Motion, and
React Three Fiber for the 3D scenes.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Copy `.env.example` to `.env.local` to point at a running API:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The Express backend in `../backend` is optional. When the API cannot be
reached, reservations, contact messages, newsletter sign-ups and auth fall
back to local handling so every screen stays usable — see `src/services/`.

## Scripts

| Command                   | What it does                                        |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Dev server with fast refresh                        |
| `npm run build`           | Production build — prerenders all 9 routes to HTML  |
| `npm run start`           | Serve the production build                          |
| `npm run lint`            | oxlint over `src/`                                  |
| `npm run optimize:images` | Recompress `src/assets/images` in place with sharp  |

## Routes

Every route is statically prerendered, so crawlers and social scrapers get
real HTML with the right `<title>` and description.

| Path                  | Page                                                       |
| --------------------- | ---------------------------------------------------------- |
| `/`                   | Hero, story, featured menu, gallery, testimonials, contact |
| `/menu`               | Full-screen menu hero, menu board, 3D spotlight            |
| `/gallery`            | Mosaic gallery with lightbox and a 3D gallery wall         |
| `/about`              | Story, process, values, team                               |
| `/contact`            | Contact details, message form, map, FAQ                    |
| `/reserve`            | Table booking with confirmation                            |
| `/login`, `/register` | Account screens                                            |
| anything else         | `not-found.jsx`                                            |

## Structure

```
src/
  app/          one folder per route; each page exports its own metadata
    layout.jsx  fonts, navbar, footer, JSON-LD for the café
    globals.css Tailwind v4 theme tokens and base styles
  components/
    layout/     navbar, mobile drawer, footer, logo, back-to-top
    hero/ menu/ gallery/ about/ contact/ testimonials/ reservation/ auth/
    three/      shared WebGL primitives (cup, bean, steam, particles, canvas)
    ui/         Button, Field, Container, SectionHeading, Reveal, Loader…
  hooks/        scroll, viewport, reduced-motion, scroll-lock, favourites
  services/     axios client, auth, reservations
  utils/        constants (café details), helpers, motion variants
```

**Server vs client:** the files under `src/app` are server components — they
carry the metadata and compose the page. Everything under `src/components`
is marked `"use client"`, because it animates, holds state or touches the
browser.

## Design system

Colours, fonts, shadows and named animations are Tailwind v4 theme tokens in
`src/app/globals.css`, which is what generates `bg-espresso-900`,
`text-gold-400` and `animate-float`. Café details — address, hours, menu
categories, testimonials — live in `src/utils/constants.js`, so changing the
phone number is a one-line edit.

Fonts are self-hosted through `next/font/google` (Playfair Display +
Poppins) and exposed to Tailwind as `--font-playfair` / `--font-poppins`.

## Images

All photography is imported statically and rendered through `next/image`,
so each device gets an appropriately sized AVIF or WebP with a blur
placeholder while it loads.

## 3D scenes

The hero, the menu spotlight and the gallery wall use React Three Fiber.
Each is lazily imported and only rendered on a desktop with WebGL where the
visitor has not asked for reduced motion; otherwise the site falls back to
photography. Rendering drops to `demand` when a canvas scrolls out of view,
and a `CanvasBoundary` swaps in photography if WebGL throws.

## Accessibility

Skip link, visible focus rings, keyboard-navigable lightbox and drawer
(Escape/arrow keys), `aria-*` state on every custom control, labelled form
fields with inline errors, and a global `prefers-reduced-motion` opt-out.
