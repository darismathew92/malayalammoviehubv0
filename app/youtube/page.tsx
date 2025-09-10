import Link from "next/link"
import YouTubeMovieGrid from "@/components/youtube-movie-grid"
import RandomMovieGenerator from "@/components/random-movie-generator"
import MobileNav from "@/components/mobile-nav"
import DesktopNav from "@/components/desktop-nav"

export default function YouTubeMovies() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              YouTube Free Malayalam Movies
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Watch full Malayalam movies and short films for free on YouTube
            </p>
          </div>

          <div className="mb-8">
            <DesktopNav />
          </div>

          <YouTubeMovieGrid />
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
