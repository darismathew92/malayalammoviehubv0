import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Suspense } from "react"
import { MovieCacheProvider } from "../contexts/movie-cache-context"
import { SkipLinks } from "@/components/accessibility/skip-links"
import { PWAProvider } from "@/components/pwa/pwa-provider"
import { InstallPrompt } from "@/components/pwa/install-prompt"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Malayalam Movies Hub - Latest OTT Releases & Movie Reviews",
    template: "%s | Malayalam Movies Hub",
  },
  description:
    "Discover the latest Malayalam movies released on OTT platforms like Netflix, Amazon Prime, Disney+ Hotstar. Watch trailers, read reviews, and find your next favorite Malayalam film.",
  keywords: [
    "Malayalam movies",
    "OTT releases",
    "Malayalam cinema",
    "Kerala movies",
    "Netflix Malayalam",
    "Amazon Prime Malayalam",
    "Disney+ Hotstar Malayalam",
    "movie reviews",
    "film trailers",
    "Mollywood",
    "Malayalam films 2024",
    "streaming movies",
  ],
  authors: [{ name: "Daris Mathew" }],
  creator: "Daris Mathew",
  publisher: "Malayalam Movies Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://malayalammovieshub.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Malayalam Movies Hub - Latest OTT Releases & Movie Reviews",
    description:
      "Discover the latest Malayalam movies released on OTT platforms. Watch trailers, read reviews, and find your next favorite Malayalam film.",
    url: "https://malayalammovieshub.com",
    siteName: "Malayalam Movies Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Malayalam Movies Hub - Latest OTT Releases",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malayalam Movies Hub - Latest OTT Releases",
    description: "Discover the latest Malayalam movies released on OTT platforms",
    images: ["/og-image.png"],
    creator: "@malayalammovieshub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Entertainment",
  classification: "Movies & Entertainment",
  other: {
    "theme-color": "#3b82f6",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-config": "/browserconfig.xml",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <Script
          id="enhanced-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://malayalammovieshub.com/#website",
                  name: "Malayalam Movies Hub",
                  description: "Discover the latest Malayalam movies released on OTT platforms",
                  url: "https://malayalammovieshub.com",
                  inLanguage: "en-US",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://malayalammovieshub.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                  publisher: {
                    "@type": "Organization",
                    "@id": "https://malayalammovieshub.com/#organization",
                  },
                  copyrightHolder: {
                    "@type": "Organization",
                    "@id": "https://malayalammovieshub.com/#organization",
                  },
                  copyrightYear: "2024",
                },
                {
                  "@type": "Organization",
                  "@id": "https://malayalammovieshub.com/#organization",
                  name: "Malayalam Movies Hub",
                  url: "https://malayalammovieshub.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://malayalammovieshub.com/logo.png",
                    width: 512,
                    height: 512,
                    caption: "Malayalam Movies Hub Logo",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: ["English", "Malayalam"],
                    areaServed: "IN",
                  },
                  sameAs: [
                    "https://twitter.com/malayalammovieshub",
                    "https://facebook.com/malayalammovieshub",
                    "https://instagram.com/malayalammovieshub",
                  ],
                  foundingDate: "2024",
                  description: "Your ultimate destination for Malayalam cinema and OTT releases",
                },
                {
                  "@type": "WebPage",
                  "@id": "https://malayalammovieshub.com/#webpage",
                  url: "https://malayalammovieshub.com",
                  name: "Malayalam Movies Hub - Latest OTT Releases",
                  description: "Discover the latest Malayalam movies released on OTT platforms",
                  inLanguage: "en-US",
                  isPartOf: {
                    "@id": "https://malayalammovieshub.com/#website",
                  },
                  about: {
                    "@type": "Thing",
                    name: "Malayalam Cinema",
                    description: "Film industry of Kerala, India",
                  },
                  primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: "https://malayalammovieshub.com/og-image.png",
                  },
                },
              ],
            }),
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.omdbapi.com" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//via.placeholder.com" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />

        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />

        <link rel="dns-prefetch" href="//pl26236383.revenuecpmgate.com" />
        <link rel="dns-prefetch" href="//www.revenuecpmgate.com" />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3997090848958699"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="application/rss+xml" title="Malayalam Movies Hub RSS Feed" href="/rss.xml" />
      </head>
      <body className="antialiased">
        <SkipLinks />
        <PWAProvider>
          <MovieCacheProvider>
            <Suspense
              fallback={
                <div
                  className="min-h-screen bg-gray-50 flex items-center justify-center"
                  role="status"
                  aria-label="Loading application"
                >
                  <div
                    className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                    aria-hidden="true"
                  ></div>
                  <span className="sr-only">Loading Malayalam Movies Hub...</span>
                </div>
              }
            >
              {children}
            </Suspense>
            <InstallPrompt />
          </MovieCacheProvider>
        </PWAProvider>

        <div id="container-4a1d554af74a536a78f81ec11493b477" aria-hidden="true"></div>
        <Script
          id="second-ad-script"
          src="//pl26236383.revenuecpmgate.com/4a1d554af74a536a78f81ec11493b477/invoke.js"
          strategy="lazyOnload"
        />

        <Script
          id="third-ad-script"
          src="https://www.revenuecpmgate.com/yfu7frp41?key=1a7e2ea822949b8353d7917b83390165"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
