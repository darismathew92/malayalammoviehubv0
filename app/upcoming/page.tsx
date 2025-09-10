import Link from "next/link"
import UpcomingMovieGrid from "@/components/upcoming-movie-grid"
import RandomMovieGenerator from "@/components/random-movie-generator"

export default function UpcomingMovies() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <meta name="google-adsense-account" content="ca-pub-3997090848958699" />
        <div className="container flex h-16 items-center justify-center py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">Malayalam Movies Hub</span>
            </Link>
            <RandomMovieGenerator />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-6 md:py-10">
          <div className="flex flex-col gap-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Upcoming Malayalam Movies in Theaters</h1>
          </div>
          <nav className="mb-8" aria-label="Movie categories">
            <div className="flex justify-center">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-4 sm:px-0 max-w-full">
                <Link
                  href="/"
                  className="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  OTT Releases
                </Link>
                <Link
                  href="/upcoming"
                  className="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  aria-current="page"
                >
                  Theater Releases
                </Link>
                <Link
                  href="/youtube"
                  className="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  YouTube Movies
                </Link>
                <Link
                  href="/trailers"
                  className="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  Trailers
                </Link>
                <Link
                  href="/watchlist"
                  className="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  My Watchlist
                </Link>
              </div>
            </div>
          </nav>
          <UpcomingMovieGrid />
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 OTT Malayalam Movies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
