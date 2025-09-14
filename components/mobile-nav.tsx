"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import RandomMovieGenerator from "./random-movie-generator"

const navItems = [
  { href: "/", label: "OTT Releases", icon: "🎬", description: "Latest streaming movies" },
  { href: "/featured", label: "Featured", icon: "⭐", description: "Editor's picks" },
  { href: "/upcoming", label: "Theater Releases", icon: "🎭", description: "Coming to cinemas" },
  { href: "/youtube", label: "YouTube Movies", icon: "📺", description: "Free full movies" },
  { href: "/trailers", label: "Trailers", icon: "🎥", description: "Latest previews" },
  { href: "/watchlist", label: "My Watchlist", icon: "📋", description: "Saved movies" },
  { href: "/news", label: "News", icon: "📰", description: "Industry updates" },
]

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation relative z-50"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-x-0 top-0 bottom-0 bg-white z-[70] animate-in slide-in-from-top-4 duration-300 ease-out overflow-y-auto">
            <div className="h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4">
              <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
                aria-label="Close menu"
              >
                <XIcon />
              </button>
            </div>

            <div className="px-4 py-6 h-full flex flex-col">
              {/* Navigation Items */}
              <nav className="flex-1">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200 touch-manipulation active:scale-95 ${
                        pathname === item.href
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                          : "text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.label}</div>
                        <div
                          className={`text-sm truncate ${pathname === item.href ? "text-blue-100" : "text-gray-500"}`}
                        >
                          {item.description}
                        </div>
                      </div>
                      {pathname === item.href && <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Random Movie Section */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">✨</span>
                    <div>
                      <div className="font-medium text-gray-900">Discover Something New</div>
                      <div className="text-sm text-gray-600">Get a random movie suggestion</div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <RandomMovieGenerator />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 grid grid-cols-1 gap-3">
                <Link
                  href="/watchlist"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                >
                  <HeartIcon />
                  <span className="text-sm font-medium text-gray-900">Watchlist</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MobileNav
