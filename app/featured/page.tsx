import { Suspense } from "react"
import FeaturedMovieGrid from "@/components/featured-movie-grid"
import MobileNav from "@/components/mobile-nav"
import DesktopNav from "@/components/desktop-nav"
import Link from "next/link"

export const metadata = {
  title: "Featured Malayalam Movies & Short Films | Malayalam Movies Hub",
  description:
    "Discover handpicked Malayalam movies and short films featuring the best of Malayalam cinema. Curated collection of must-watch films.",
  openGraph: {
    title: "Featured Malayalam Movies & Short Films",
    description: "Handpicked Malayalam movies and short films - the best of Malayalam cinema",
    images: ["/og-featured.png"],
  },
}

function FeaturedSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border animate-pulse">
          <div className="aspect-[3/4] bg-gray-200 rounded-t-lg" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-8 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FeaturedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/95 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Malayalam Movies Hub</span>
              </Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section
          className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12"
          aria-label="Featured Malayalam Movies"
        >
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Featured Collection
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Handpicked Malayalam movies and short films showcasing the finest storytelling and cinematic excellence.
            </p>
          </div>

          <nav className="mb-8 hidden md:block" aria-label="Main navigation">
            <DesktopNav />
          </nav>

          <div className="mb-8">
            <div
              className="rounded-xl p-6 md:p-8"
              style={{
                backgroundColor: "#1d4ed8",
                color: "#ffffff",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" style={{ color: "#ffffff" }}>
                  ⭐
                </span>
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: "#ffffff" }}>
                  Editor's Choice
                </h2>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: "#bfdbfe" }}>
                Curated selection of films that have redefined Malayalam cinema through innovative storytelling and
                exceptional craftsmanship.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Award Winners", "Critical Acclaim", "Hidden Gems", "Short Films"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div id="featured-movies">
            <Suspense fallback={<FeaturedSkeleton />}>
              <FeaturedMovieGrid />
            </Suspense>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">© 2024 Malayalam Movies Hub. All rights reserved.</p>
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
