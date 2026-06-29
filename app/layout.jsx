import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

// Update this to your live domain once the custom domain is connected in Vercel.
const SITE_URL = 'https://geonyx.ai';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'GEONYX · AI Recommendation Intelligence',
  description:
    'Independent AI recommendation intelligence. We measure why AI models recommend one company over another, across global and sovereign models, and what to change.',
  applicationName: 'GEONYX',
  keywords: [
    'AI recommendation intelligence',
    'AI visibility',
    'sovereign AI models',
    'LLM recommendation',
    'GEONYX',
  ],
  authors: [{ name: 'GEONYX LLC' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'GEONYX',
    title: 'GEONYX · AI Recommendation Intelligence',
    description:
      'We measure why AI recommends your competitor, across global and sovereign models, and what to change.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEONYX · AI Recommendation Intelligence',
    description: 'We measure why AI recommends your competitor, and what to change.',
  },
  robots: { index: true, follow: true },
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GEONYX LLC',
  url: SITE_URL,
  email: 'hello@geonyx.ai',
  description:
    'Independent AI recommendation intelligence firm. Measures why AI models recommend one entity over another, across global and sovereign models.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </body>
    </html>
  );
}
