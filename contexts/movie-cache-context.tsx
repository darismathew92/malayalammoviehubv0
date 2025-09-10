"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Movie = {
  id: string
  title: string
  year: string
  poster: string
  type: string
  imdbID: string
}

export type MovieDetails = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Actors: string
  Plot: string
  Language: string
  Poster: string
  Ratings: Array<{ Source: string; Value: string }>
  imdbRating: string
  imdbID: string
  Type: string
}

type CacheData = {
  movies: Movie[]
  movieDetails: Map<string, MovieDetails>
  lastFetched: number
}

type MovieCacheContextType = {
  getCachedMovies: () => Movie[] | null
  setCachedMovies: (movies: Movie[]) => void
  getCachedMovieDetails: (imdbID: string) => MovieDetails | null
  setCachedMovieDetails: (imdbID: string, details: MovieDetails) => void
  clearCache: () => void
  isCacheValid: () => boolean
}

const MovieCacheContext = createContext<MovieCacheContextType | undefined>(undefined)

const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export function MovieCacheProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<CacheData>({
    movies: [],
    movieDetails: new Map(),
    lastFetched: 0,
  })

  const isCacheValid = useCallback(() => {
    return Date.now() - cache.lastFetched < CACHE_DURATION
  }, [cache.lastFetched])

  const getCachedMovies = useCallback(() => {
    if (cache.movies.length > 0 && isCacheValid()) {
      return cache.movies
    }
    return null
  }, [cache.movies, isCacheValid])

  const setCachedMovies = useCallback((movies: Movie[]) => {
    setCache((prev) => ({
      ...prev,
      movies,
      lastFetched: Date.now(),
    }))
  }, [])

  const getCachedMovieDetails = useCallback(
    (imdbID: string) => {
      return cache.movieDetails.get(imdbID) || null
    },
    [cache.movieDetails],
  )

  const setCachedMovieDetails = useCallback((imdbID: string, details: MovieDetails) => {
    setCache((prev) => ({
      ...prev,
      movieDetails: new Map(prev.movieDetails).set(imdbID, details),
    }))
  }, [])

  const clearCache = useCallback(() => {
    setCache({
      movies: [],
      movieDetails: new Map(),
      lastFetched: 0,
    })
  }, [])

  return (
    <MovieCacheContext.Provider
      value={{
        getCachedMovies,
        setCachedMovies,
        getCachedMovieDetails,
        setCachedMovieDetails,
        clearCache,
        isCacheValid,
      }}
    >
      {children}
    </MovieCacheContext.Provider>
  )
}

export function useMovieCache() {
  const context = useContext(MovieCacheContext)
  if (context === undefined) {
    throw new Error("useMovieCache must be used within a MovieCacheProvider")
  }
  return context
}
