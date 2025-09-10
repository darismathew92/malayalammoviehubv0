"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import RandomMovieGenerator from "./random-movie-generator"

const navItems = [
  { href: "/", label: "OTT Releases", icon: "🎬" },
  { href: "/upcoming", label: "Theater Releases", icon: "🎭" },
  { href: "/youtube", label: "YouTube Movies", icon: "📺" },
  { href: "/trailers", label: "Trailers", icon: "🎥" },
  { href: "/watchlist", label: "My Watchlist", icon: "⭐" },
  { href: "/news", label: "News", icon: "📰" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <span
          className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
        />
        <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 my-1 ${isOpen ? "opacity-0" : ""}`} />
        <span
          className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
            <nav className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                        : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                    <span className="text-lg">✨</span>
                    <span className="text-sm font-medium text-gray-700">Random Movie:</span>
                    <RandomMovieGenerator />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}

export default MobileNav
