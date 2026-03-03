# GEONYX

AI Recommendation Intelligence platform.

## Deploy

Connected to Vercel. Push to `main` to deploy.

## Setup

```bash
npm install
npm run dev
```

## Form

Application form submits to Formspree (ID: `mykknngn`).
- Work email validation (blocks gmail, yahoo, hotmail, etc.)
- Honeypot spam protection (`_gotcha` field)
- Error state with retry on network/server failure
- Success confirmation on 200 response

## Structure

```
app/
  layout.tsx     - Root layout, Inter font, OG meta tags
  page.tsx       - Landing page (single component)
  globals.css    - All styles
  icon.svg       - Favicon
```
