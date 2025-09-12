"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Clock, Search, Filter } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import React from "react"
import { WatchlistButton } from "@/components/watchlist-button"
import youtubeMoviesData from "@/data/youtube-movies.json"

interface YouTubeMovie {
  id: string
  title: string
  year: string
  duration: string
  thumbnail: string
  youtubeId: string
  description: string
  genre: string[]
  type: "movie" | "shortfilm"
}

const youtubeMovies: YouTubeMovie[] = youtubeMoviesData

const MovieCard = React.memo(
  ({ movie, onMovieClick }: { movie: YouTubeMovie; onMovieClick: (movie: YouTubeMovie) => void }) => (
    <Card className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <OptimizedImage
            src={movie.thumbnail || "/placeholder.svg"}
            alt={movie.title}
            width={400}
            height={225}
            className="h-full w-full transition-transform group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-1">
              <WatchlistButton
                item={{
                  id: movie.id,
                  title: movie.title,
                  year: movie.year,
                  poster: movie.thumbnail,
                  type: "youtube",
                  youtubeId: movie.youtubeId,
                  genre: movie.genre,
                  duration: movie.duration,
                  description: movie.description,
                }}
                showText={false}
                size="sm"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <Button
            size="sm"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onMovieClick(movie)}
          >
            <Play className="mr-2 h-4 w-4" />
            Watch Now
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-semibold text-lg line-clamp-1 flex-1">{movie.title}</h3>
            <WatchlistButton
              item={{
                id: movie.id,
                title: movie.title,
                year: movie.year,
                poster: movie.thumbnail,
                type: "youtube",
                youtubeId: movie.youtubeId,
                genre: movie.genre,
                duration: movie.duration,
                description: movie.description,
              }}
              showText={true}
              size="sm"
              className="shrink-0"
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{movie.year}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {movie.duration}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.map((g) => (
              <Badge key={g} variant="outline" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{movie.description}</p>
        </div>
      </CardContent>
    </Card>
  ),
)

MovieCard.displayName = "MovieCard"

export default function YouTubeMovieGrid() {
  const [selectedMovie, setSelectedMovie] = useState<YouTubeMovie | null>(null)
  const [activeTab, setActiveTab] = useState("movies")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")

  const handleFullscreenChange = useCallback(() => {
    if (
      document.fullscreenElement &&
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      // Force landscape orientation on mobile when entering fullscreen
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {
          // Fallback if orientation lock fails
          console.log("[v0] Orientation lock not supported or failed")
        })
      }
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [handleFullscreenChange])

  const filteredMovies = useMemo(() => {
    return youtubeMovies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = selectedGenre === "all" || movie.genre.includes(selectedGenre)
      return matchesSearch && matchesGenre
    })
  }, [searchQuery, selectedGenre])

  const movies = useMemo(() => filteredMovies.filter((movie) => movie.type === "movie"), [filteredMovies])
  const shortFilms = useMemo(() => filteredMovies.filter((movie) => movie.type === "shortfilm"), [filteredMovies])

  const allGenres = useMemo(() => {
    const genres = new Set<string>()
    youtubeMovies.forEach((movie) => {
      movie.genre.forEach((g) => genres.add(g))
    })
    return Array.from(genres).sort()
  }, [])

  const handleMovieClick = useCallback((movie: YouTubeMovie) => {
    setSelectedMovie(movie)
  }, [])

  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedGenre("all")
  }, [])

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search movies and short films..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
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
        </div>

        <div className="text-sm text-muted-foreground">
          {searchQuery || selectedGenre !== "all" ? (
            <>
              Showing {filteredMovies.length} result{filteredMovies.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedGenre !== "all" && ` in ${selectedGenre}`}
            </>
          ) : (
            `${youtubeMovies.length} total movies and short films`
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="movies">Full Movies ({movies.length})</TabsTrigger>
          <TabsTrigger value="shortfilms">Short Films ({shortFilms.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="movies">
          {movies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No movies found matching your criteria.</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shortfilms">
          {shortFilms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shortFilms.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No short films found matching your criteria.</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMovie?.title}</DialogTitle>
          </DialogHeader>
          {selectedMovie && (
            <div className="space-y-4">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedMovie.youtubeId}?autoplay=1`}
                  title={selectedMovie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="rounded-lg"
                  data-video-player="true"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedMovie.year}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {selectedMovie.duration}
                  </div>
                  <Badge variant="outline">{selectedMovie.type === "movie" ? "Full Movie" : "Short Film"}</Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedMovie.genre.map((g) => (
                    <Badge key={g} variant="outline" className="text-xs">
                      {g}
                    </Badge>
                  ))}
                </div>
                <p className="text-muted-foreground">{selectedMovie.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
