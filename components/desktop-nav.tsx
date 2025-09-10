"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "OTT Releases" },
  { href: "/upcoming", label: "Theater Releases" },
  { href: "/youtube", label: "YouTube Movies" },
  { href: "/trailers", label: "Trailers" },
  { href: "/watchlist", label: "My Watchlist" },
  { href: "/news", label: "News" },
]

export default function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex justify-center gap-4 mb-6 md:mb-8" aria-label="Movie categories">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-4 py-2 rounded-md whitespace-nowrap text-base transition-colors ${
            pathname === item.href
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
