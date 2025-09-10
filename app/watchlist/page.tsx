"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Search, Filter, Calendar, Clock, Trash2, Film, Youtube, Ticket, Monitor } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { useWatchlist } from "@/hooks/use-watchlist"
import { WatchlistButton } from "@/components/watchlist-button"
import RandomMovieGenerator from "@/components/random-movie-generator"
import MobileNav from "@/components/mobile-nav"
import DesktopNav from "@/components/desktop-nav"
import type { WatchlistItem } from "@/lib/watchlist"
import Script from "next/script"

const TYPE_ICONS = {
  ott: Monitor,
  upcoming: Ticket,
  youtube: Youtube,
  trailer: Film,
}

const TYPE_LABELS = {
  ott: "OTT Movies",
  upcoming: "Theater Releases",
  youtube: "YouTube Movies",
  trailer: "Trailers",
}

export default function WatchlistPage() {
  const { watchlist, clearWatchlist, getWatchlistByType } = useWatchlist()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedMovie, setSelectedMovie] = useState<WatchlistItem | null>(null)

  const filteredWatchlist = useMemo(() => {
    let filtered = activeTab === "all" ? watchlist : getWatchlistByType(activeTab as WatchlistItem["type"])

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter((item) => item.genre?.includes(selectedGenre))
    }

    return filtered
  }, [watchlist, activeTab, searchQuery, selectedGenre, getWatchlistByType])

  const allGenres = useMemo(() => {
    const genres = new Set<string>()
    watchlist.forEach((item) => {
      item.genre?.forEach((g) => genres.add(g))
    })
    return Array.from(genres).sort()
  }, [watchlist])

  const counts = useMemo(
    () => ({
      all: watchlist.length,
      ott: getWatchlistByType("ott").length,
      upcoming: getWatchlistByType("upcoming").length,
      youtube: getWatchlistByType("youtube").length,
      trailer: getWatchlistByType("trailer").length,
    }),
    [watchlist, getWatchlistByType],
  )

  const handleMovieClick = (movie: WatchlistItem) => {
    if (movie.youtubeId) {
      setSelectedMovie(movie)
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("all")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Script
        id="watchlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "My Watchlist - Malayalam Movies Hub",
            description: "Personal watchlist of Malayalam movies, trailers, and YouTube content",
            url: "https://malayalammovieshub.com/watchlist",
          }),
        }}
      />

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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12" aria-label="My Watchlist">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              My Watchlist
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Keep track of Malayalam movies, trailers, and YouTube content you want to watch across all platforms.
            </p>
          </div>

          <div className="mb-8">
            <DesktopNav />
          </div>

          {watchlist.length > 0 && (
            <div className="flex justify-center mb-6">
              <Button variant="destructive" onClick={clearWatchlist} className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Clear All ({watchlist.length} items)
              </Button>
            </div>
          )}

          {watchlist.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Your watchlist is empty</h3>
              <p className="text-muted-foreground mb-6">
                Start adding movies from different sections to build your personal collection
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/">Browse OTT Movies</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/youtube">YouTube Movies</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search your watchlist..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {allGenres.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Genres</SelectItem>
                          {allGenres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground text-center">
                  {searchQuery || selectedGenre !== "all" ? (
                    <>
                      Showing {filteredWatchlist.length} result{filteredWatchlist.length !== 1 ? "s" : ""}
                      {searchQuery && ` for "${searchQuery}"`}
                      {selectedGenre !== "all" && ` in ${selectedGenre}`}
                    </>
                  ) : (
                    `${watchlist.length} items in your watchlist`
                  )}
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
                  <TabsTrigger value="ott">OTT ({counts.ott})</TabsTrigger>
                  <TabsTrigger value="upcoming">Theater ({counts.upcoming})</TabsTrigger>
                  <TabsTrigger value="youtube">YouTube ({counts.youtube})</TabsTrigger>
                  <TabsTrigger value="trailer">Trailers ({counts.trailer})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  {filteredWatchlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredWatchlist.map((item) => {
                        const IconComponent = TYPE_ICONS[item.type]
                        return (
                          <Card
                            key={`${item.id}-${item.type}`}
                            className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                            onClick={() => handleMovieClick(item)}
                          >
                            <CardHeader className="p-0">
                              <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                                <OptimizedImage
                                  src={item.poster || "/placeholder.svg"}
                                  alt={item.title}
                                  width={300}
                                  height={400}
                                  className="w-full h-full transition-transform group-hover:scale-110"
                                />
                                <div className="absolute top-2 left-2">
                                  <Badge className="flex items-center gap-1">
                                    <IconComponent className="h-3 w-3" />
                                    {TYPE_LABELS[item.type]}
                                  </Badge>
                                </div>
                                <div className="absolute top-2 right-2">
                                  <WatchlistButton item={item} showText={false} size="sm" />
                                </div>
                                {item.platform && (
                                  <div className="absolute bottom-2 left-2">
                                    <Badge variant="secondary">{item.platform}</Badge>
                                  </div>
                                )}
                                {item.theater && (
                                  <div className="absolute bottom-2 left-2">
                                    <Badge variant="secondary">{item.theater}</Badge>
                                  </div>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{item.year}</Badge>
                                {item.duration && (
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {item.duration}
                                  </div>
                                )}
                              </div>
                              {item.genre && item.genre.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {item.genre.slice(0, 3).map((g) => (
                                    <Badge key={g} variant="outline" className="text-xs">
                                      {g}
                                    </Badge>
                                  ))}
                                  {item.genre.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{item.genre.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}
                              {item.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                              )}
                              {item.releaseDate && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                                  <Calendar className="h-3 w-3" />
                                  {item.releaseDate}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No items found matching your criteria.</p>
                      <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
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

      {/* YouTube Video Modal */}
      <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMovie?.title}</DialogTitle>
          </DialogHeader>
          {selectedMovie?.youtubeId && (
            <div className="space-y-4">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedMovie.youtubeId}`}
                  title={selectedMovie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedMovie.year}</Badge>
                  {selectedMovie.duration && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {selectedMovie.duration}
                    </div>
                  )}
                </div>
                {selectedMovie.genre && (
                  <div className="flex flex-wrap gap-1">
                    {selectedMovie.genre.map((g) => (
                      <Badge key={g} variant="outline" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                )}
                {selectedMovie.description && <p className="text-muted-foreground">{selectedMovie.description}</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
