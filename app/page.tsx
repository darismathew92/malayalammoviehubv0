import Link from "next/link"
import MovieGrid from "@/components/movie-grid"
import RandomMovieGenerator from "@/components/random-movie-generator"
import Script from "next/script"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="movie-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Latest OTT Released Malayalam Movies September 2025",
            description: "Collection of the latest Malayalam movies released on OTT platforms in September 2025",
            url: "https://malayalammovieshub.com",
            mainEntity: {
              "@type": "ItemList",
              name: "Malayalam Movies Collection",
              description: "Latest Malayalam movies available on OTT platforms",
            },
          }),
        }}
      />

      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-center py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-bold">Malayalam Movies Hub</span>
            </Link>
            <div>
              <RandomMovieGenerator />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-4 md:py-6 lg:py-10" aria-label="Latest Malayalam Movies">
          <div className="flex flex-col gap-2 md:gap-4 text-center mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight px-4 md:px-0">
              Latest OTT Released Malayalam Movies September 2025
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4 md:px-0">
              Discover the newest Malayalam films available on popular streaming platforms like Netflix, Amazon Prime
              Video, Disney+ Hotstar, and more.
            </p>
          </div>

          <nav
            className="flex justify-start md:justify-center gap-2 md:gap-4 mb-6 md:mb-8 overflow-x-auto pb-2 px-4 md:px-0"
            aria-label="Movie categories"
          >
            <Link
              href="/"
              className="px-3 py-2 md:px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap text-sm md:text-base"
              aria-current="page"
            >
              OTT Releases
            </Link>
            <Link
              href="/upcoming"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              Theater Releases
            </Link>
            <Link
              href="/youtube"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              YouTube Movies
            </Link>
            <Link
              href="/trailers"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              Trailers
            </Link>
            <Link
              href="/watchlist"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              My Watchlist
            </Link>
            <Link
              href="/news"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              News
            </Link>
          </nav>

          <MovieGrid />
        </section>
      </main>

      <footer className="border-t py-4 md:py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-xs md:text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Malayalam Movies Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs md:text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs md:text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
