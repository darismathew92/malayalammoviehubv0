import Link from "next/link"
import MovieGrid from "@/components/movie-grid"
import RandomMovieGenerator from "@/components/random-movie-generator"
import MobileNav from "@/components/mobile-nav"
import DesktopNav from "@/components/desktop-nav"
import Script from "next/script"

export const metadata = {
  title: "Latest OTT Released Malayalam Movies September 2025",
  description:
    "Discover the newest Malayalam films available on Netflix, Amazon Prime Video, Disney+ Hotstar, and other streaming platforms. Updated daily with latest releases.",
  openGraph: {
    title: "Latest OTT Released Malayalam Movies September 2025",
    description: "Discover the newest Malayalam films available on streaming platforms",
    images: ["/og-home.png"],
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Script
        id="movie-collection-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://malayalammovieshub.com/#collectionpage",
                name: "Latest OTT Released Malayalam Movies September 2025",
                description: "Collection of the latest Malayalam movies released on OTT platforms in September 2025",
                url: "https://malayalammovieshub.com",
                inLanguage: "en-US",
                isPartOf: {
                  "@id": "https://malayalammovieshub.com/#website",
                },
                mainEntity: {
                  "@type": "ItemList",
                  name: "Malayalam Movies Collection",
                  description: "Latest Malayalam movies available on OTT platforms",
                  numberOfItems: 50,
                  itemListElement: [
                    {
                      "@type": "Movie",
                      name: "Malayalam Movie Collection",
                      genre: ["Drama", "Action", "Comedy", "Thriller"],
                      inLanguage: "ml",
                      countryOfOrigin: "IN",
                    },
                  ],
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://malayalammovieshub.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Latest Malayalam Movies",
                    item: "https://malayalammovieshub.com/#movies",
                  },
                ],
              },
            ],
          }),
        }}
      />

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-lg md:text-xl font-bold text-gray-900">Malayalam Movies Hub</span>
              </Link>
              <div className="hidden sm:block">
                <RandomMovieGenerator />
              </div>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12"
          aria-label="Latest Malayalam Movies"
          itemScope
          itemType="https://schema.org/CollectionPage"
        >
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight" itemProp="name">
              Latest OTT Released Malayalam Movies September 2025
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" itemProp="description">
              Discover the newest Malayalam films available on popular streaming platforms like Netflix, Amazon Prime
              Video, Disney+ Hotstar, and more.
            </p>
          </div>

          <nav className="mb-8" aria-label="Main navigation">
            <DesktopNav />
          </nav>

          <div id="movies" itemProp="mainEntity">
            <MovieGrid />
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © 2024 Malayalam Movies Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
