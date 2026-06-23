# GEONYX — landing (Next.js, ready for Vercel)

Premium, technical landing page for GEONYX. App Router, single page.

## What's inside
- `app/page.jsx` — renders the landing
- `components/GeonyxLanding.jsx` — the whole page (hero, what we do, who we work with,
  the system / pipeline + formula + JSON, the live probe widget, cooperation-by-request, footer)
- `app/layout.jsx` — page metadata

## Before you go live (2 things)
1. **Request form.** Open `components/GeonyxLanding.jsx`, find `FORMSPREE_ENDPOINT` near the top.
   Create a free form at https://formspree.io, paste its endpoint, e.g.
   `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/abcdwxyz';`
   Until you set it, the form just shows the success message and sends nothing.
2. **Live probe** is an illustrative simulation (labelled on the page). It does not call real
   models. Keep it that way for the public site.

## Run locally
```
npm install
npm run dev
```
Open http://localhost:3000

## Deploy on Vercel
**Option A — update your existing repo**
1. Copy `app/` and `components/` into your `geonyx` repo (replace the old page).
2. Commit and push to GitHub. Vercel rebuilds automatically.

**Option B — fresh deploy**
1. Push this folder to a GitHub repo.
2. vercel.com → New Project → Import the repo → Deploy. No env vars required.

## Notes
- No API keys needed for this landing.
- Fonts (Inter, IBM Plex Mono) load via `next/font` (self-hosted at build, fast). They are fetched
  from Google Fonts during `next build`, which works on Vercel automatically.
- Favicon: `app/icon.svg`. Link preview image: `app/opengraph-image.png` (and `twitter-image.png`).
- OG/Twitter tags and `metadataBase` are set in `app/layout.jsx`. Change `https://geonyx.ai` if your domain differs.
