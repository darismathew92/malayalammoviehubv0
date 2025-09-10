import Link from "next/link"
import YouTubeMovieGrid from "@/components/youtube-movie-grid"
import RandomMovieGenerator from "@/components/random-movie-generator"

export default function YouTubeMovies() {
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
            <h1 className="text-3xl font-bold tracking-tight">YouTube Free Malayalam Movies</h1>
            <p className="text-muted-foreground">Watch full Malayalam movies and short films for free on YouTube</p>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            <Link
              href="/"
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              OTT Releases
            </Link>
            <Link
              href="/upcoming"
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              Theater Releases
            </Link>
            <Link
              href="/youtube"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              YouTube Movies
            </Link>
          </div>
          <YouTubeMovieGrid />
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
