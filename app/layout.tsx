import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GEONYX | AI Recommendation Intelligence',
  description: 'AI recommends your competitors. Your team tracks mentions. Nobody diagnoses why. GEONYX explains the structure behind AI recommendations and validates what to change.',
  metadataBase: new URL('https://geonyx.ai'),
  openGraph: {
    title: 'GEONYX | AI Recommendation Intelligence',
    description: 'AI recommends your competitors. Your team tracks mentions. Nobody diagnoses why. GEONYX changes that.',
    type: 'website',
    url: 'https://geonyx.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEONYX | AI Recommendation Intelligence',
    description: 'AI recommends your competitors. Your team tracks mentions. Nobody diagnoses why.',
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
