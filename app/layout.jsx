import { Inter, IBM_Plex_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

// Change to your production domain if different.
export const metadata = {
  metadataBase: new URL('https://geonyx.ai'),
  title: 'GEONYX | AI Recommendation Intelligence',
  description:
    'We measure how AI models recognize, recommend and cite entities, across global and sovereign models, and quantify what to change.',
  openGraph: {
    title: 'GEONYX | AI Recommendation Intelligence',
    description:
      'We measure why AI recommends your competitors, and which sources AI trusts.',
    url: 'https://geonyx.ai',
    siteName: 'GEONYX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEONYX | AI Recommendation Intelligence',
    description:
      'We measure why AI recommends your competitors, and which sources AI trusts.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
