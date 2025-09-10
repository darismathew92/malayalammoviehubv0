import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Suspense } from "react"
import { MovieCacheProvider } from "../contexts/movie-cache-context"
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
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
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
                    name: "Malayalam Movies Hub",
                    url: "https://malayalammovieshub.com",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://malayalammovieshub.com/logo.png",
                      width: 512,
                      height: 512,
                    },
                    sameAs: [
                      "https://twitter.com/malayalammovieshub",
                      "https://facebook.com/malayalammovieshub",
                      "https://instagram.com/malayalammovieshub",
                    ],
                  },
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
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: ["English", "Malayalam"],
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

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="dns-prefetch" href="//pl26236383.revenuecpmgate.com" />
        <link rel="dns-prefetch" href="//www.revenuecpmgate.com" />
      </head>
      <body>
        <MovieCacheProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </MovieCacheProvider>

        <div id="container-4a1d554af74a536a78f81ec11493b477"></div>
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
