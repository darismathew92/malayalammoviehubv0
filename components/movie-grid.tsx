"use client"

import React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Calendar, Info, Star, Film, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { OptimizedImage } from "@/components/optimized-image"
import { WatchlistButton } from "@/components/watchlist-button"
import { useMovieCache } from "@/contexts/movie-cache-context"

import { getMovieDetails, getSpecificMovies, type Movie, type MovieDetails } from "@/lib/api"

// Movie list with platform information
const MOVIE_LIST = [
  { title: "Meesha", platform: "Sun NXT,OTT Play Premium" },
  { title: "Flask", platform: "Manorama Max" },
  { title: "Raveendra Nee Evide?", platform: "Saina Play, Prime Video" },
  { title: "Kammattam", platform: "ZEE5" },
  { title: "The Chronicles of the 4.5 Gang", platform: "SonyLIV" },
  { title: "Soothravakyam", platform: "Lionsgate Play" },
  { title: "Perumani", platform: "Saina Play" },
  { title: "Nadikar", platform: "Saina Play, Prime Video" },
  { title: "Ronth", platform: "Jio Hotstar" },
  { title: "Narivetta", platform: "SonyLIV" },
  { title: "Mr. and Mrs. Bachelor", platform: "Manorama Max" },
  { title: "Moonwalk", platform: "Jio Hotstar" },
  { title: "Aap Kaise Ho", platform: "SunNXT" },
  { title: "Pariwar", platform: "Prime Video" },
  { title: "Alappuzha Gymkhana", platform: "SonyLIV" },
  { title: "Padakkalam", platform: "Jio Hotstar" },
  { title: "Thudarum", platform: "Jio Hotstar" },
  { title: "Abhilasham", platform: "Prime Video, Manorama Max" },
  { title: "Ponman", platform: "Disney+ Hotstar" },
  { title: "Officer on Duty", platform: "Netflix" },
  { title: "Manjummel Boys", platform: "Disney+ Hotstar" },
  { title: "Premalu", platform: "Disney+ Hotstar" },
  { title: "Aavesham", platform: "Amazon Prime" },
  { title: "Bramayugam", platform: "SonyLIV" },
  { title: "Guruvayoor Ambalanadayil", platform: "Disney+ Hotstar" },
] as const

const PLATFORM_COLORS: Record<string, string> = {
  Netflix: "bg-red-600 hover:bg-red-700",
  "Amazon Prime": "bg-blue-600 hover:bg-blue-700",
  "Disney+ Hotstar": "bg-blue-500 hover:bg-blue-600",
  SonyLIV: "bg-purple-600 hover:bg-purple-700",
  ZEE5: "bg-indigo-600 hover:bg-indigo-700",
  "Apple TV+": "bg-gray-800 hover:bg-gray-900",
}

const MovieCard = React.memo(
  ({
    movie,
    onMovieClick,
    getPlatformColor,
  }: {
    movie: Movie & { platform?: string }
    onMovieClick: (movie: Movie & { platform?: string }) => void
    getPlatformColor: (platform: string) => string
  }) => {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] relative">
            <OptimizedImage
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              width={300}
              height={400}
              className="w-full h-full object-cover"
              loading="lazy"
              priority={false}
            />
            {movie.platform && (
              <div className="absolute top-2 right-2">
                <Badge className={`${getPlatformColor(movie.platform)} text-white text-xs`}>{movie.platform}</Badge>
              </div>
            )}
            <div className="absolute top-2 left-2">
              <WatchlistButton
                item={{
                  id: movie.id,
                  title: movie.title,
                  year: movie.year,
                  poster: movie.poster,
                  type: "ott",
                  platform: movie.platform,
                }}
                showText={false}
                size="sm"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
              <h3 className="font-bold text-white text-sm md:text-lg line-clamp-2">{movie.title}</h3>
              <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm mt-1">
                <Calendar className="h-3 w-3" />
                <span>{movie.year}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-wrap gap-1 md:gap-2">
            <Badge variant="outline" className="capitalize text-xs">
              {movie.type}
            </Badge>
            {movie.platform && (
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <Play className="h-3 w-3 mr-1" />
                <span className="truncate">Watch on {movie.platform}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <Button
            variant="secondary"
            className="w-full text-xs md:text-sm h-8 md:h-10"
            onClick={() => onMovieClick(movie)}
          >
            <Info className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Details
          </Button>
        </CardFooter>
      </Card>
    )
  },
)

MovieCard.displayName = "MovieCard"

export default function MovieGrid() {
  const [movies, setMovies] = useState<(Movie & { platform?: string })[]>([])
  const [selectedMovie, setSelectedMovie] = useState<(MovieDetails & { platform?: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const { getCachedMovies, setCachedMovies, getCachedMovieDetails, setCachedMovieDetails } = useMovieCache()

  const movieTitles = useMemo(() => MOVIE_LIST.map((item) => item.title), [])

  const getPlatformColor = useCallback((platform: string) => {
    return PLATFORM_COLORS[platform] || "bg-gray-600 hover:bg-gray-700"
  }, [])

  const fetchMovies = useCallback(
    async (movieTitles: string[]) => {
      const cachedMovies = getCachedMovies()
      if (cachedMovies && cachedMovies.length > 0) {
        const moviesWithPlatform = cachedMovies.map((movie) => {
          const movieInfo = MOVIE_LIST.find((item) => item.title.toLowerCase() === movie.title.toLowerCase())
          return {
            ...movie,
            platform: movieInfo?.platform,
          }
        })
        setMovies(moviesWithPlatform)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        const result = await getSpecificMovies(movieTitles)

        const moviesWithPlatform = result.map((movie) => {
          const movieInfo = MOVIE_LIST.find((item) => item.title.toLowerCase() === movie.title.toLowerCase())
          return {
            ...movie,
            platform: movieInfo?.platform,
          }
        })

        setMovies(moviesWithPlatform)
        setCachedMovies(result)

        if (result.length === 0) {
          setError("No movies found. Please check the movie titles in the code.")
        } else if (result.length < movieTitles.length) {
          setError(`Found ${result.length} out of ${movieTitles.length} movies. Some titles may be incorrect.`)
        }
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [getCachedMovies, setCachedMovies],
  )

  useEffect(() => {
    fetchMovies(movieTitles)
  }, [fetchMovies, movieTitles])

  const handleMovieClick = useCallback(
    async (movie: Movie & { platform?: string }) => {
      const cachedDetails = getCachedMovieDetails(movie.imdbID)
      if (cachedDetails) {
        setSelectedMovie({
          ...cachedDetails,
          platform: movie.platform,
        })
        setOpen(true)
        return
      }

      setLoadingDetails(true)
      setOpen(true)

      try {
        const details = await getMovieDetails(movie.imdbID)
        if (details) {
          setCachedMovieDetails(movie.imdbID, details)
          setSelectedMovie({
            ...details,
            platform: movie.platform,
          })
        } else {
          setError("Failed to load movie details")
        }
      } catch (err) {
        console.error(err)
        setError("An error occurred while fetching movie details")
      } finally {
        setLoadingDetails(false)
      }
    },
    [getCachedMovieDetails, setCachedMovieDetails],
  )

  return (
    <>
      {error && (
        <div className="bg-destructive/15 text-destructive p-3 md:p-4 rounded-md mb-4 md:mb-6 mx-4 md:mx-0 text-sm md:text-base">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {Array.from({ length: 8 }, (_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-[3/4] bg-gray-200" />
              </CardHeader>
              <CardContent className="p-3 md:p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </CardContent>
              <CardFooter className="p-3 md:p-4 pt-0">
                <div className="h-8 bg-gray-200 rounded w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12">
          <Film className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No movies found</h3>
          <p className="text-muted-foreground">Please check the movie titles in the configuration</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={handleMovieClick}
              getPlatformColor={getPlatformColor}
            />
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] mx-4 max-h-[90vh] overflow-y-auto">
          {loadingDetails ? (
            <div className="space-y-4 py-4">
              <div className="flex gap-4">
                <Skeleton className="w-24 h-32 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ) : selectedMovie ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMovie.Title}</DialogTitle>
                <DialogDescription>
                  {selectedMovie.Year} • {selectedMovie.Runtime}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={
                      selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "/placeholder.svg?height=400&width=300"
                    }
                    alt={selectedMovie.Title}
                    className="w-24 h-32 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-sm">{selectedMovie.Plot}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {selectedMovie.imdbRating}
                      </Badge>
                      {selectedMovie.Genre.split(", ").map((genre) => (
                        <Badge key={genre} variant="outline">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Director</h4>
                  <p className="text-sm text-muted-foreground">{selectedMovie.Director}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cast</h4>
                  <p className="text-sm text-muted-foreground">{selectedMovie.Actors}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Language</h4>
                  <p className="text-sm text-muted-foreground">{selectedMovie.Language}</p>
                </div>
                {selectedMovie.platform && (
                  <div>
                    <h4 className="font-medium mb-1">Available on</h4>
                    <p className="text-sm text-muted-foreground">{selectedMovie.platform}</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <Button onClick={() => setOpen(false)}>Close</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p>Failed to load movie details</p>
              <Button onClick={() => setOpen(false)} className="mt-4">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
