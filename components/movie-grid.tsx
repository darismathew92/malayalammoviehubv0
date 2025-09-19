"use client"

import React from "react"
import { useState, useEffect, useMemo, useCallback, Suspense } from "react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { OptimizedImage } from "@/components/optimized-image"
import { WatchlistButton } from "@/components/watchlist-button"
import { useMovieCache } from "@/contexts/movie-cache-context"

import { getMovieDetails, getSpecificMovies, type Movie, type MovieDetails } from "@/lib/api"

const CalendarIcon = () => (
  <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const InfoIcon = () => (
  <svg className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const StarIcon = () => (
  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const FilmIcon = () => (
  <svg className="mx-auto h-16 w-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011 1v2m0 0v16l-4-2-4 2V4m8 0H8m0 0V1a1 1 0 00-1 1v2"
    />
  </svg>
)

const PlayIcon = () => (
  <svg className="h-3 w-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15"
    />
  </svg>
)

const Dialog = dynamic(() => import("@/components/ui/dialog").then((mod) => ({ default: mod.Dialog })), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-96" />,
})
const DialogContent = dynamic(() => import("@/components/ui/dialog").then((mod) => ({ default: mod.DialogContent })))
const DialogDescription = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => ({ default: mod.DialogDescription })),
)
const DialogHeader = dynamic(() => import("@/components/ui/dialog").then((mod) => ({ default: mod.DialogHeader })))
const DialogTitle = dynamic(() => import("@/components/ui/dialog").then((mod) => ({ default: mod.DialogTitle })))

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

const MovieCardSkeleton = React.memo(() => (
  <Card className="overflow-hidden animate-pulse">
    <CardHeader className="p-0">
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300" />
    </CardHeader>
    <CardContent className="p-3 md:p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded-md w-3/4" />
      <div className="h-3 bg-gray-200 rounded-md w-1/2" />
    </CardContent>
    <CardFooter className="p-3 md:p-4 pt-0">
      <div className="h-8 bg-gray-200 rounded-md w-full" />
    </CardFooter>
  </Card>
))

MovieCardSkeleton.displayName = "MovieCardSkeleton"

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
    const [isHovered, setIsHovered] = useState(false)

    return (
      <Card
        className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0">
          <div className="aspect-[3/4] relative group">
            <OptimizedImage
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              width={300}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              priority={false}
            />
            {movie.platform && (
              <div className="absolute top-2 right-2 z-10">
                <Badge
                  className={`${getPlatformColor(movie.platform)} text-white text-xs shadow-lg transition-transform duration-200 ${isHovered ? "scale-105" : ""}`}
                >
                  {movie.platform}
                </Badge>
              </div>
            )}
            <div className="absolute top-2 left-2 z-10">
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
            <div
              className="absolute bottom-0 left-0 right-0 p-3 md:p-4 transition-all duration-300"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 100%)",
                backdropFilter: "blur(2px)",
              }}
            >
              <h3
                className="font-bold text-sm md:text-lg line-clamp-2 mb-1"
                style={{
                  color: "#ffffff",
                  textShadow: "2px 2px 4px rgba(0,0,0,1), 1px 1px 2px rgba(0,0,0,1)",
                }}
              >
                {movie.title}
              </h3>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <CalendarIcon />
                <span
                  style={{
                    color: "#ffffff",
                    textShadow: "1px 1px 2px rgba(0,0,0,1)",
                  }}
                >
                  {movie.year}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-wrap gap-1 md:gap-2 items-center">
            <Badge variant="outline" className="capitalize text-xs">
              {movie.type}
            </Badge>
            {movie.platform && (
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <PlayIcon />
                <span className="truncate">Watch on {movie.platform}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <Button
            variant="secondary"
            className="w-full text-xs md:text-sm h-8 md:h-10 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
            onClick={() => onMovieClick(movie)}
          >
            <InfoIcon />
            View Details
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
  const [currentPage, setCurrentPage] = useState(1)
  const [moviesPerPage] = useState(12) // Show 12 movies per page

  const { getCachedMovies, setCachedMovies, getCachedMovieDetails, setCachedMovieDetails } = useMovieCache()

  const movieTitles = useMemo(() => MOVIE_LIST.map((item) => item.title), [])

  const getPlatformColor = useCallback((platform: string) => {
    return PLATFORM_COLORS[platform] || "bg-gray-600 hover:bg-gray-700"
  }, [])

  const totalPages = Math.ceil(movies.length / moviesPerPage)
  const startIndex = (currentPage - 1) * moviesPerPage
  const endIndex = startIndex + moviesPerPage
  const currentMovies = movies.slice(startIndex, endIndex)

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    document.getElementById("movies")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }, [currentPage, handlePageChange])

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }, [currentPage, totalPages, handlePageChange])

  const fetchMovies = useCallback(
    async (movieTitles: string[], retryCount = 0) => {
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

      console.log("[v0] Starting to fetch movies...", new Date().toISOString())
      const startTime = Date.now()

      try {
        const result = await getSpecificMovies(movieTitles)

        const endTime = Date.now()
        console.log(`[v0] Fetched ${result.length} movies in ${endTime - startTime}ms`)

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
          setError("No movies found. Please check your internet connection.")
        } else if (result.length < movieTitles.length) {
          console.warn(`Found ${result.length} out of ${movieTitles.length} movies. Some titles may be incorrect.`)
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err)
        if (retryCount < 2) {
          console.log(`[v0] Retrying... attempt ${retryCount + 1}`)
          setTimeout(() => fetchMovies(movieTitles, retryCount + 1), 2000)
          return
        }
        setError("Failed to load movies. Please check your internet connection and try again.")
      } finally {
        setLoading(false)
      }
    },
    [getCachedMovies, setCachedMovies],
  )

  useEffect(() => {
    fetchMovies(movieTitles)
  }, [fetchMovies, movieTitles])

  useEffect(() => {
    setCurrentPage(1)
  }, [movies.length])

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
        console.error("Error fetching movie details:", err)
        setError("An error occurred while fetching movie details")
      } finally {
        setLoadingDetails(false)
      }
    },
    [getCachedMovieDetails, setCachedMovieDetails],
  )

  const handleRetry = useCallback(() => {
    fetchMovies(movieTitles)
  }, [fetchMovies, movieTitles])

  return (
    <>
      {error && (
        <div className="bg-destructive/15 border border-destructive/20 text-destructive p-4 rounded-lg mb-6 mx-4 md:mx-0">
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="ml-4 border-destructive/20 hover:bg-destructive/10 bg-transparent"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {Array.from({ length: 12 }, (_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-16">
          <FilmIcon />
          <h3 className="text-xl font-semibold mb-2">No movies found</h3>
          <p className="text-muted-foreground mb-4">Unable to load movie data at this time</p>
          <Button onClick={handleRetry} variant="outline">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6 px-2">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, movies.length)} of {movies.length} movies
            </p>
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8"
            id="movies"
          >
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={handleMovieClick}
                getPlatformColor={getPlatformColor}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {currentPage > 2 && (
                    <>
                      <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(1)} className="cursor-pointer">
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {currentPage > 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}

                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 2, currentPage - 1)) + i
                    if (pageNum > totalPages) return null

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum)}
                          isActive={pageNum === currentPage}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  {currentPage < totalPages - 1 && (
                    <>
                      {currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(totalPages)} className="cursor-pointer">
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}

      <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-96" />}>
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
                  <DialogTitle className="text-xl font-bold">{selectedMovie.Title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedMovie.Year} • {selectedMovie.Runtime}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <OptimizedImage
                      src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "/placeholder.svg"}
                      alt={selectedMovie.Title}
                      width={96}
                      height={128}
                      className="w-24 h-32 rounded-md flex-shrink-0"
                      priority={true}
                    />
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed mb-3">{selectedMovie.Plot}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600">
                          <StarIcon />
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
                  <div className="grid gap-3">
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Director</h4>
                      <p className="text-sm text-muted-foreground">{selectedMovie.Director}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Cast</h4>
                      <p className="text-sm text-muted-foreground">{selectedMovie.Actors}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Language</h4>
                      <p className="text-sm text-muted-foreground">{selectedMovie.Language}</p>
                    </div>
                    {selectedMovie.platform && (
                      <div>
                        <h4 className="font-semibold mb-1 text-sm">Available on</h4>
                        <p className="text-sm text-muted-foreground">{selectedMovie.platform}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => setOpen(false)} className="px-6">
                      Close
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Failed to load movie details</p>
                <Button onClick={() => setOpen(false)} variant="outline">
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Suspense>
    </>
  )
}
