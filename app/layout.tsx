import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'GEONYX | AI Visibility Index',
  description: 'The world\'s first AI Visibility Index. GEONYX transforms brands into first-class entities inside AI ecosystems, capturing visibility at the model-decision layer.',
  keywords: ['AI visibility', 'GEO', 'generative engine optimization', 'LLM', 'brand visibility', 'AI search', 'enterprise AI'],
  authors: [{ name: 'GEONYX' }],
  openGraph: {
    title: 'GEONYX | AI Visibility Index',
    description: 'Transform your brand into a first-class entity inside AI ecosystems.',
    url: 'https://geonyx.ai',
    siteName: 'GEONYX',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEONYX | AI Visibility Index',
    description: 'Transform your brand into a first-class entity inside AI ecosystems.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
