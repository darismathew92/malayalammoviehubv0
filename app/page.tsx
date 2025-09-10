import Head from "next/head"
import Link from "next/link"
import MovieGrid from "@/components/movie-grid"
import RandomMovieGenerator from "@/components/random-movie-generator"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Malayalam Movies Hub</title>
        <meta name="description" content="Discover the latest Malayalam movies released on OTT platforms.in kerala" />
        <meta name="google-adsense-account" content="ca-pub-3997090848958699"/> 
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Malayalam Movies Hub" />
        <meta property="og:description" content="Discover the latest Malayalam movies released on OTT platforms." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://malayalammovieshub.com" />
        <meta property="og:type" content="website" />
      </Head>
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <h1 className="text-3xl font-bold tracking-tight">Latest OTT Released Malayalam Movies</h1>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            <Link href="/" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
              OTT Releases
            </Link>
            <Link
              href="/upcoming"
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              Theater Releases
            </Link>
          </div>
          <MovieGrid />
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
