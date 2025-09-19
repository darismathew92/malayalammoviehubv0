import Link from "next/link"
import MovieGrid from "@/components/movie-grid"
import RandomMovieGenerator from "@/components/random-movie-generator"
import { MobileNav } from "@/components/mobile-nav"
import DesktopNav from "@/components/desktop-nav"
import { BreadcrumbStructuredData, WebPageStructuredData } from "@/components/seo/structured-data"
import { ScreenReaderText } from "@/components/accessibility/screen-reader-text"

export const metadata = {
  title: "Malayalam Movies Online Watch - Latest OTT Released Movies September 2025",
  description:
    "Watch Malayalam movies online including Meesha Madhavan, Kumbalangi Nights, Trance, Ayyappanum Koshiyum. Latest released Malayalam movies on OTT platforms like Netflix, Amazon Prime, Disney+ Hotstar. Malayalam shortfilms, movie news and reviews.",
  keywords: [
    "malayalam movies online watch",
    "latest released malayalam movies ott",
    "ott malayalam movies",
    "meesha madhavan malayalam movie",
    "kumbalangi nights watch online",
    "trance malayalam movie online",
    "ayyappanum koshiyum full movie",
    "malayalam shortfilms to watch",
    "malayalam movie news",
    "Latest OTT Released Malayalam Movies September 2025",
  ],
  openGraph: {
    title: "Malayalam Movies Online Watch - Latest OTT Released Movies September 2025",
    description:
      "Watch Malayalam movies online including popular films like Meesha Madhavan, Kumbalangi Nights, Trance. Latest OTT releases on Netflix, Amazon Prime, Disney+ Hotstar",
    images: ["/og-home.png"],
  },
}

export default function Home() {
  const breadcrumbItems = [
    { name: "Home", url: "https://malayalammovieshub.com" },
    { name: "Malayalam Movies Online", url: "https://malayalammovieshub.com/#movies" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <WebPageStructuredData
        title="Malayalam Movies Online Watch - Latest OTT Released Movies September 2025"
        description="Watch Malayalam movies online including Meesha Madhavan, Kumbalangi Nights, Trance, Ayyappanum Koshiyum. Latest released Malayalam movies on OTT platforms."
        url="https://malayalammovieshub.com"
      />

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                aria-label="Malayalam Movies Hub - Watch Malayalam Movies Online"
              >
                <div
                  className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm"
                  aria-hidden="true"
                >
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  <span className="sm:hidden">Malayalam Movies Hub</span>
                  <span className="hidden sm:inline">Malayalam Movies Hub</span>
                </span>
              </Link>
              <div className="hidden sm:block">
                <RandomMovieGenerator />
              </div>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1" id="main-content" role="main">
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12"
          aria-labelledby="main-heading"
        >
          <div className="text-center mb-8 md:mb-12">
            <h1
              id="main-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight px-2 text-balance"
            >
              Malayalam Movies Online Watch - Latest OTT Released Movies September 2025
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-2 text-pretty">
              Watch Malayalam movies online including popular films like <strong>Meesha Madhavan</strong>,{" "}
              <strong>Kumbalangi Nights</strong>, <strong>Trance</strong>, and <strong>Ayyappanum Koshiyum</strong>.
              Discover the latest released Malayalam movies on OTT platforms like Netflix, Amazon Prime Video, Disney+
              Hotstar. Find Malayalam shortfilms to watch, movie news, reviews and trailers all in one place.
              <ScreenReaderText>
                This page contains a comprehensive collection of Malayalam movies available for online viewing,
                including the latest OTT releases, classic films, and upcoming movies with trailers and reviews.
              </ScreenReaderText>
            </p>
          </div>

          <nav className="mb-8" aria-label="Main navigation" id="navigation" role="navigation">
            <DesktopNav />
          </nav>

          <section className="mb-12 md:hidden" aria-labelledby="mobile-features-heading">
            <h2 id="mobile-features-heading" className="text-xl font-semibold text-gray-900 mb-6 text-center px-4">
              Explore Malayalam Cinema Content
            </h2>
            <div className="grid grid-cols-2 gap-4 px-2" role="list">
              <Link
                href="/featured"
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="listitem"
                aria-describedby="featured-desc"
              >
                <div
                  className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:bg-yellow-200 transition-colors"
                  aria-hidden="true"
                >
                  <span className="text-2xl" role="img" aria-label="Star">
                    ⭐
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-900 block">Featured Movies</span>
                  <span id="featured-desc" className="text-xs text-gray-500 mt-1 block">
                    Handpicked Malayalam films
                  </span>
                </div>
              </Link>

              <Link
                href="/youtube"
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="listitem"
                aria-describedby="youtube-desc"
              >
                <div
                  className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors"
                  aria-hidden="true"
                >
                  <span className="text-2xl" role="img" aria-label="Television">
                    📺
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-900 block">YouTube Movies</span>
                  <span id="youtube-desc" className="text-xs text-gray-500 mt-1 block">
                    Free Malayalam full movies
                  </span>
                </div>
              </Link>

              <Link
                href="/trailers"
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="listitem"
                aria-describedby="trailers-desc"
              >
                <div
                  className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors"
                  aria-hidden="true"
                >
                  <span className="text-2xl" role="img" aria-label="Movie camera">
                    🎥
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-900 block">Movie Trailers</span>
                  <span id="trailers-desc" className="text-xs text-gray-500 mt-1 block">
                    Latest Malayalam previews
                  </span>
                </div>
              </Link>

              <Link
                href="/news"
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="listitem"
                aria-describedby="news-desc"
              >
                <div
                  className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors"
                  aria-hidden="true"
                >
                  <span className="text-2xl" role="img" aria-label="Newspaper">
                    📰
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-900 block">Malayalam Movie News</span>
                  <span id="news-desc" className="text-xs text-gray-500 mt-1 block">
                    Industry updates & reviews
                  </span>
                </div>
              </Link>

              <Link
                href="/upcoming"
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="listitem"
                aria-describedby="upcoming-desc"
              >
                <div
                  className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors"
                  aria-hidden="true"
                >
                  <span className="text-2xl" role="img" aria-label="Theater masks">
                    🎭
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-900 block">Upcoming Malayalam Movies</span>
                  <span id="upcoming-desc" className="text-xs text-gray-500 mt-1 block">
                    Coming to theaters & OTT
                  </span>
                </div>
              </Link>
            </div>
          </section>

          <section id="movies" aria-labelledby="movies-heading">
            <h2 id="movies-heading" className="sr-only">
              Malayalam Movies Collection - Watch Online on OTT Platforms
            </h2>
            <MovieGrid />
          </section>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 mb-2">
                © 2024 Malayalam Movies Hub. Your destination for Malayalam movies online.
              </p>
              <p className="text-xs text-gray-500">
                Watch latest Malayalam movies, OTT releases, trailers and movie news
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <div className="flex items-center gap-8">
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Terms of Service
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
