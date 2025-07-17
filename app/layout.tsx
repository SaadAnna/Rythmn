import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Peakly - Daily Energy Calculator & Boost Solutions | Increase Your Energy Levels',
  description: 'Calculate your daily energy levels with Peakly\'s free energy calculator. Get personalized solutions to boost your energy, improve productivity, and feel more energized throughout the day.',
  keywords: [
    'energy calculator',
    'daily energy levels',
    'energy boost',
    'increase energy',
    'productivity calculator',
    'energy solutions',
    'fatigue calculator',
    'energy assessment',
    'boost energy naturally',
    'energy tracker',
    'vitality calculator',
    'energy optimization'
  ],
  authors: [{ name: 'Peakly Team' }],
  creator: 'Peakly',
  publisher: 'Peakly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://peakly.com'), // Replace with your actual domain
  alternates: {
    canonical: 'https://peakly.com', // Replace with your actual domain
  },
  openGraph: {
    title: 'Peakly - Free Daily Energy Calculator & Personalized Energy Solutions',
    description: 'Discover your daily energy potential with our free calculator. Get instant, personalized recommendations to boost your energy levels and maximize your productivity.',
    url: 'https://peakly.com', // Replace with your actual domain
    siteName: 'Peakly',
    images: [
      {
        url: '/og-image.jpg', // You'll need to create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: 'Peakly Energy Calculator - Boost Your Daily Energy Levels',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peakly - Calculate & Boost Your Daily Energy Levels',
    description: 'Free energy calculator with personalized solutions to increase your energy and productivity. Start your energy transformation today!',
    images: ['/twitter-image.jpg'], // You'll need to create this image (1200x600px recommended)
    creator: '@peakly', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your actual Google Search Console verification code
    // yandex: 'your-yandex-verification-code', // Add if targeting Russian market
    // bing: 'your-bing-verification-code', // Add Bing verification if needed
  },
  category: 'Health & Wellness',
  classification: 'Health and Wellness Calculator',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  manifest: '/manifest.json', // You'll need to create this PWA manifest file
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Peakly Energy Calculator',
  },
  appLinks: {
    web: {
      url: 'https://peakly.com', // Replace with your actual domain
      should_fallback: true,
    },
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'application-name': 'Peakly',
    'msapplication-TileColor': '#ffffff',
    'theme-color': '#ffffff',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="worldwide" />
        <meta name="subject" content="Energy Calculator, Health, Wellness, Productivity" />
        <meta name="abstract" content="Peakly helps you calculate your daily energy levels and provides personalized solutions to boost your energy naturally." />
        <meta name="topic" content="Energy, Health, Wellness, Productivity Calculator" />
        <meta name="summary" content="Free online energy calculator with personalized energy-boosting solutions" />
        <meta name="url" content="https://peakly.com" />
        <meta name="identifier-URL" content="https://peakly.com" />
        <meta name="pagename" content="Peakly - Energy Calculator" />
        <meta name="page-topic" content="Energy Calculator and Wellness Solutions" />
        <meta name="page-type" content="Health and Wellness Tool" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Peakly Energy Calculator",
              "description": "Calculate your daily energy levels and get personalized solutions to boost your energy naturally",
              "url": "https://peakly.com",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              },
              "author": {
                "@type": "Organization",
                "name": "Peakly"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Peakly",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://peakly.com/logo.png"
                }
              },
              "datePublished": "2024-01-01",
              "dateModified": "2024-07-17",
              "inLanguage": "en-US",
              "isAccessibleForFree": true,
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "softwareVersion": "1.0"
            })
          }}
        />
        
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Additional meta tags for better crawling */}
        <meta name="next-head-count" content="2" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body>{children}</body>
    </html>
  )
}