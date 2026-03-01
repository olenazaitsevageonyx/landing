import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GEONYX | AI Recommendation Intelligence',
  description: 'GEONYX measures why AI models recommend your competitors instead of you. Structural diagnostics for AI-mediated recommendations.',
  metadataBase: new URL('https://geonyx.ai'),
  openGraph: {
    title: 'GEONYX | AI Recommendation Intelligence',
    description: 'AI recommends your competitors. Nobody on your team is measuring it. GEONYX changes that.',
    type: 'website',
    url: 'https://geonyx.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEONYX | AI Recommendation Intelligence',
    description: 'AI recommends your competitors. Nobody on your team is measuring it.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
