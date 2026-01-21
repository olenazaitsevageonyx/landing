# GEONYX Landing Page

The world's first AI Visibility Index. GEONYX transforms brands into first-class entities inside AI ecosystems, capturing visibility at the model-decision layer.

![GEONYX](https://img.shields.io/badge/GEONYX-Private%20Beta-00d4ff)
![Next.js](https://img.shields.io/badge/Next.js-14.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🌍 Interactive world map
- 📧 Formspree contact form integration
- 🔒 Government-ready security badges
- 🌐 9+ LLM model coverage display

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/geonyx-landing.git

# Navigate to project directory
cd geonyx-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy automatically

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/geonyx-landing)

### Manual Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
geonyx-landing/
├── app/
│   ├── globals.css      # Global styles + Tailwind
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main landing page
├── public/
│   ├── favicon.ico      # Favicon
│   └── icon.svg         # SVG icon
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Configuration

### Contact Form

The contact form uses Formspree. To change the endpoint:

1. Create account at [Formspree](https://formspree.io)
2. Create new form
3. Update endpoint in `app/page.tsx`:

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### Metadata

Update site metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'GEONYX | AI Visibility Index',
  description: 'Your description here',
  // ...
}
```

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Inter (Google Fonts)
- **Form:** Formspree
- **Deployment:** Vercel

## License

© 2026 GEONYX. All rights reserved.

---

**Private Beta · Invite Only**
