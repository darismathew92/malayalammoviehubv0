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
    "Watch latest Malayalam movies online, OTT releases on Netflix, Amazon Prime, Disney+ Hotstar. Find Meesha Madhavan, Kumbalangi Nights, Trance, Ayyappanum Koshiyum and more Malayalam films with trailers, reviews and news.",
  keywords: [
    "malayalam movies online watch",
    "latest released malayalam movies ott",
    "latest released movies in malayalam",
    "ott malayalam movies",
    "malayalam shortfilms to watch",
    "malayalam movie news",
    "Latest OTT Released Malayalam Movies September 2025",
    "meesha madhavan malayalam movie",
    "kumbalangi nights watch online",
    "trance malayalam movie",
    "ayyappanum koshiyum full movie",
    "angamaly diaries malayalam",
    "action hero biju malayalam",
    "in harihar nagar comedy",
    "mammootty movies online",
    "mohanlal movies ott",
    "dileep comedy movies",
    "nivin pauly films",
    "fahadh faasil movies",
    "prithviraj malayalam movies",
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
    "Malayalam films 2025",
    "streaming movies",
    "malayalam full movies",
    "malayalam movies with subtitles",
    "best malayalam movies",
    "new malayalam movies",
    "malayalam blockbuster movies",
    "malayalam comedy movies",
    "malayalam thriller movies",
    "malayalam drama movies",
    "malayalam action movies",
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
    title: "Malayalam Movies Hub - Watch Latest OTT Releases Online",
    description:
      "Watch latest Malayalam movies online including Meesha Madhavan, Kumbalangi Nights, Trance, Ayyappanum Koshiyum. Find OTT releases, trailers, reviews and Malayalam movie news.",
    url: "https://malayalammovieshub.com",
    siteName: "Malayalam Movies Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Malayalam Movies Hub - Latest OTT Releases & Malayalam Films Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malayalam Movies Hub - Latest OTT Malayalam Movies",
    description: "Watch latest Malayalam movies online, OTT releases, trailers and movie news",
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
    "geo.region": "IN-KL",
    "geo.placename": "Kerala, India",
    language: "Malayalam, English",
    "content-language": "en, ml",
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
                  description: "Watch latest Malayalam movies online, OTT releases, trailers and movie news",
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
                  copyrightYear: "2025",
                  keywords:
                    "malayalam movies online watch, latest released malayalam movies ott, ott malayalam movies, malayalam movie news, meesha madhavan, kumbalangi nights, trance malayalam movie",
                  about: [
                    {
                      "@type": "Thing",
                      name: "Malayalam Cinema",
                      description: "Film industry of Kerala, India producing movies in Malayalam language",
                    },
                    {
                      "@type": "Thing",
                      name: "OTT Platforms",
                      description: "Over-the-top streaming services for Malayalam movies",
                    },
                    {
                      "@type": "Thing",
                      name: "Malayalam Movie Reviews",
                      description: "Reviews and ratings of latest Malayalam films",
                    },
                  ],
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
                  foundingDate: "2025",
                  description: "Your ultimate destination for Malayalam cinema and OTT releases",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Malayalam Movies Collection",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Malayalam Movie Streaming",
                          description: "Watch latest Malayalam movies online",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Movie Reviews & News",
                          description: "Latest Malayalam movie reviews and entertainment news",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://malayalammovieshub.com/#webpage",
                  url: "https://malayalammovieshub.com",
                  name: "Malayalam Movies Hub - Watch Latest OTT Releases Online",
                  description:
                    "Watch latest Malayalam movies online including popular films like Meesha Madhavan, Kumbalangi Nights, Trance, Ayyappanum Koshiyum and more OTT releases",
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
                  mainEntity: {
                    "@type": "ItemList",
                    name: "Popular Malayalam Movies",
                    description: "Collection of popular Malayalam movies available for online viewing",
                    numberOfItems: 20,
                    itemListElement: [
                      {
                        "@type": "ListItem",
                        position: 1,
                        item: {
                          "@type": "Movie",
                          name: "Meesha Madhavan",
                          genre: ["Comedy", "Drama"],
                          inLanguage: "ml",
                          countryOfOrigin: "IN",
                        },
                      },
                      {
                        "@type": "ListItem",
                        position: 2,
                        item: {
                          "@type": "Movie",
                          name: "Kumbalangi Nights",
                          genre: ["Drama", "Family", "Comedy"],
                          inLanguage: "ml",
                          countryOfOrigin: "IN",
                        },
                      },
                      {
                        "@type": "ListItem",
                        position: 3,
                        item: {
                          "@type": "Movie",
                          name: "Trance",
                          genre: ["Thriller", "Psychological", "Drama"],
                          inLanguage: "ml",
                          countryOfOrigin: "IN",
                        },
                      },
                      {
                        "@type": "ListItem",
                        position: 4,
                        item: {
                          "@type": "Movie",
                          name: "Ayyappanum Koshiyum",
                          genre: ["Action", "Drama"],
                          inLanguage: "ml",
                          countryOfOrigin: "IN",
                        },
                      },
                      {
                        "@type": "ListItem",
                        position: 5,
                        item: {
                          "@type": "Movie",
                          name: "Angamaly Diaries",
                          genre: ["Drama", "Action"],
                          inLanguage: "ml",
                          countryOfOrigin: "IN",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Where can I watch Malayalam movies online?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "You can watch Malayalam movies online on OTT platforms like Netflix, Amazon Prime Video, Disney+ Hotstar, and YouTube. Our site provides links and information about the latest Malayalam movie releases on these platforms.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What are the latest released Malayalam movies on OTT?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The latest OTT released Malayalam movies include recent hits and classics. Check our homepage for the most current releases on Netflix, Amazon Prime, and other streaming platforms.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can I watch Meesha Madhavan online?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, Meesha Madhavan starring Dileep and Kavya Madhavan is available to watch online. Check our YouTube movies section for viewing options.",
                      },
                    },
                  ],
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
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Kerala, India" />
        <meta name="language" content="Malayalam, English" />
        <meta name="content-language" content="en, ml" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />

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
