"use client"

import { useState, useEffect } from "react"
import { Calendar, Info, Star, Film, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import { getMovieDetails, getSpecificMovies, type Movie, type MovieDetails } from "@/lib/api"

// Movie list with theater information
const UPCOMING_MOVIE_LIST = [
  { title: "Lokah Chapter One: Chandra", theater: "PVR Cinemas", releaseDate: "28 August 2025" },
  { title: "Hridayapoorvam", theater: "INOX", releaseDate: "28 August 2025" },
  { title: "Odum Kuthira Chadum Kuthira", theater: "PVR Cinemas", releaseDate: "29 August 2025" },
]

// Theater colors for badges
const THEATER_COLORS: Record<string, string> = {
  "PVR Cinemas": "bg-red-600 hover:bg-red-700",
  Cinepolis: "bg-blue-600 hover:bg-blue-700",
  INOX: "bg-purple-600 hover:bg-purple-700",
  "Carnival Cinemas": "bg-green-600 hover:bg-green-700",
  Cinemax: "bg-orange-600 hover:bg-orange-700",
}

export default function UpcomingMovieGrid() {
  const [movies, setMovies] = useState<(Movie & { theater?: string; releaseDate?: string })[]>([])
  const [selectedMovie, setSelectedMovie] = useState<
    (MovieDetails & { theater?: string; releaseDate?: string }) | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)

  useEffect(() => {
    fetchMovies(UPCOMING_MOVIE_LIST.map((item) => item.title))
  }, [])

  const fetchMovies = async (movieTitles: string[]) => {
    setLoading(true)
    setError(null)
    try {
      const result = await getSpecificMovies(movieTitles)

      // Add theater and release date information to each movie
      const moviesWithTheater = result.map((movie) => {
        const movieInfo = UPCOMING_MOVIE_LIST.find((item) => item.title.toLowerCase() === movie.title.toLowerCase())
        return {
          ...movie,
          theater: movieInfo?.theater,
          releaseDate: movieInfo?.releaseDate,
        }
      })

      setMovies(moviesWithTheater)

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
  }

  const handleMovieClick = async (movie: Movie & { theater?: string; releaseDate?: string }) => {
    setLoadingDetails(true)
    setOpen(true)

    try {
      const details = await getMovieDetails(movie.imdbID)
      if (details) {
        setSelectedMovie({
          ...details,
          theater: movie.theater,
          releaseDate: movie.releaseDate,
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
  }

  const getTheaterColor = (theater: string) => {
    return THEATER_COLORS[theater] || "bg-gray-600 hover:bg-gray-700"
  }

  return (
    <>
      {error && <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <Skeleton className="aspect-[3/4] w-full h-[300px]" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-10 w-full" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {movies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-[3/4] relative">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="object-cover w-full h-full"
                  />
                  {movie.theater && (
                    <div className="absolute top-2 right-2">
                      <Badge className={`${getTheaterColor(movie.theater)} text-white`}>{movie.theater}</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="font-bold text-white text-lg">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{movie.releaseDate || movie.year}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="capitalize">
                    {movie.type}
                  </Badge>
                  {movie.theater && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Ticket className="h-3 w-3 mr-1" />
                      <span>In {movie.theater}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="secondary" className="w-full" onClick={() => handleMovieClick(movie)}>
                  <Info className="h-4 w-4 mr-2" />
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
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
                <DialogTitle className="flex items-center gap-2">
                  {selectedMovie.Title}
                  {selectedMovie.theater && (
                    <Badge className={`${getTheaterColor(selectedMovie.theater)} text-white ml-2`}>
                      {selectedMovie.theater}
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  {selectedMovie.releaseDate || selectedMovie.Year} • {selectedMovie.Runtime}
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
                {selectedMovie.theater && (
                  <div>
                    <h4 className="font-medium mb-1">Theater</h4>
                    <p className="text-sm text-muted-foreground">{selectedMovie.theater}</p>
                  </div>
                )}
                {selectedMovie.releaseDate && (
                  <div>
                    <h4 className="font-medium mb-1">Release Date</h4>
                    <p className="text-sm text-muted-foreground">{selectedMovie.releaseDate}</p>
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
