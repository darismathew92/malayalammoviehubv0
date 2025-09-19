"use server"

const API_KEY = "3642aeba"
const API_BASE_URL = "https://www.omdbapi.com/"

const movieCache = new Map<string, { movie: Movie | null; timestamp: number }>()
const detailsCache = new Map<string, { details: MovieDetails | null; timestamp: number }>()
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

const MAX_CONCURRENT_REQUESTS = 5
const REQUEST_DELAY = 100 // Reduced from 200ms to 100ms

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION
}

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

export async function searchMovies(
  query = "Malayalam",
  page = 1,
): Promise<{
  movies: Movie[]
  totalResults: number
}> {
  try {
    const response = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch (parseError) {
      console.error("Invalid JSON response:", text)
      return { movies: [], totalResults: 0 }
    }

    if (data.Response === "False") {
      return { movies: [], totalResults: 0 }
    }

    const movies = data.Search.map((movie: any) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg?height=400&width=300",
      type: movie.Type,
      imdbID: movie.imdbID,
    }))

    return {
      movies,
      totalResults: Number.parseInt(data.totalResults, 10),
    }
  } catch (error) {
    console.error("Error fetching movies:", error)
    return { movies: [], totalResults: 0 }
  }
}

export async function getMovieByTitle(title: string): Promise<Movie | null> {
  const cached = movieCache.get(title)
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.movie
  }

  try {
    const response = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch (parseError) {
      console.error(`Invalid JSON response for ${title}:`, text)
      movieCache.set(title, { movie: null, timestamp: Date.now() })
      return null
    }

    if (data.Response === "False") {
      console.error(`Movie not found: ${title}`)
      movieCache.set(title, { movie: null, timestamp: Date.now() })
      return null
    }

    const movie = {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      poster: data.Poster !== "N/A" ? data.Poster : "/placeholder.svg?height=400&width=300",
      type: data.Type,
      imdbID: data.imdbID,
    }

    movieCache.set(title, { movie, timestamp: Date.now() })
    return movie
  } catch (error) {
    console.error(`Error fetching movie by title (${title}):`, error)
    movieCache.set(title, { movie: null, timestamp: Date.now() })
    return null
  }
}

export async function getSpecificMovies(movieTitles: string[]): Promise<Movie[]> {
  try {
    const movies: Movie[] = []

    // Process movies in batches to avoid overwhelming the API
    for (let i = 0; i < movieTitles.length; i += MAX_CONCURRENT_REQUESTS) {
      const batch = movieTitles.slice(i, i + MAX_CONCURRENT_REQUESTS)

      // Process batch in parallel
      const batchPromises = batch.map(async (title, index) => {
        // Add small delay for each request in batch to avoid rate limiting
        if (index > 0) {
          await delay(REQUEST_DELAY * index)
        }
        return getMovieByTitle(title)
      })

      const batchResults = await Promise.all(batchPromises)

      // Add successful results to movies array
      batchResults.forEach((movie) => {
        if (movie) {
          movies.push(movie)
        }
      })

      // Add delay between batches
      if (i + MAX_CONCURRENT_REQUESTS < movieTitles.length) {
        await delay(REQUEST_DELAY)
      }
    }

    return movies
  } catch (error) {
    console.error("Error fetching specific movies:", error)
    return []
  }
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetails | null> {
  const cached = detailsCache.get(imdbID)
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.details
  }

  try {
    const response = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch (parseError) {
      console.error("Invalid JSON response:", text)
      detailsCache.set(imdbID, { details: null, timestamp: Date.now() })
      return null
    }

    if (data.Response === "False") {
      detailsCache.set(imdbID, { details: null, timestamp: Date.now() })
      return null
    }

    detailsCache.set(imdbID, { details: data, timestamp: Date.now() })
    return data
  } catch (error) {
    console.error("Error fetching movie details:", error)
    detailsCache.set(imdbID, { details: null, timestamp: Date.now() })
    return null
  }
}
