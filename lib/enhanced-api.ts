"use server"

const API_KEY = "3642aeba"
const API_BASE_URL = "https://www.omdbapi.com/"

class EnhancedCache<T> {
  private cache = new Map<string, { data: T; timestamp: number }>()
  private readonly TTL = 30 * 60 * 1000 // 30 minutes
  private readonly MAX_SIZE = 500

  set(key: string, value: T): void {
    // Clean expired entries and maintain size limit
    this.cleanup()

    if (this.cache.size >= this.MAX_SIZE) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, { data: value, timestamp: Date.now() })
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.TTL) {
        this.cache.delete(key)
      }
    }
  }
}

const movieCache = new EnhancedCache<Movie | null>()
const detailsCache = new EnhancedCache<MovieDetails | null>()

class RequestQueue {
  private queue: Array<() => Promise<any>> = []
  private processing = false
  private readonly DELAY = 150 // Reduced delay for better performance

  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await request()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })

      if (!this.processing) {
        this.process()
      }
    })
  }

  private async process(): Promise<void> {
    this.processing = true

    while (this.queue.length > 0) {
      const request = this.queue.shift()
      if (request) {
        await request()
        if (this.queue.length > 0) {
          await new Promise((resolve) => setTimeout(resolve, this.DELAY))
        }
      }
    }

    this.processing = false
  }
}

const requestQueue = new RequestQueue()

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

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) return response

      if (i === retries) throw new Error(`API request failed with status ${response.status}`)
    } catch (error) {
      if (i === retries) throw error
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
  throw new Error("Max retries exceeded")
}

export async function getMovieByTitle(title: string): Promise<Movie | null> {
  if (movieCache.has(title)) {
    return movieCache.get(title)
  }

  return requestQueue.add(async () => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
      const text = await response.text()

      let data
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        console.error(`Invalid JSON response for ${title}:`, text)
        movieCache.set(title, null)
        return null
      }

      if (data.Response === "False") {
        movieCache.set(title, null)
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

      movieCache.set(title, movie)
      return movie
    } catch (error) {
      console.error(`Error fetching movie by title (${title}):`, error)
      movieCache.set(title, null)
      return null
    }
  })
}

export async function getSpecificMovies(movieTitles: string[]): Promise<Movie[]> {
  try {
    const BATCH_SIZE = 3
    const movies: Movie[] = []

    for (let i = 0; i < movieTitles.length; i += BATCH_SIZE) {
      const batch = movieTitles.slice(i, i + BATCH_SIZE)
      const batchPromises = batch.map((title) => getMovieByTitle(title))
      const batchResults = await Promise.all(batchPromises)

      movies.push(...(batchResults.filter((movie) => movie !== null) as Movie[]))
    }

    return movies
  } catch (error) {
    console.error("Error fetching specific movies:", error)
    return []
  }
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetails | null> {
  if (detailsCache.has(imdbID)) {
    return detailsCache.get(imdbID)
  }

  return requestQueue.add(async () => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`)
      const text = await response.text()

      let data
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        console.error("Invalid JSON response:", text)
        detailsCache.set(imdbID, null)
        return null
      }

      if (data.Response === "False") {
        detailsCache.set(imdbID, null)
        return null
      }

      detailsCache.set(imdbID, data)
      return data
    } catch (error) {
      console.error("Error fetching movie details:", error)
      detailsCache.set(imdbID, null)
      return null
    }
  })
}

export async function searchMovies(
  query = "Malayalam",
  page = 1,
): Promise<{
  movies: Movie[]
  totalResults: number
}> {
  const cacheKey = `search_${query}_${page}`

  if (movieCache.has(cacheKey)) {
    return movieCache.get(cacheKey) as any
  }

  return requestQueue.add(async () => {
    try {
      const response = await fetchWithRetry(
        `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`,
      )
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

      const result = {
        movies: data.Search.map((movie: any) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg?height=400&width=300",
          type: movie.Type,
          imdbID: movie.imdbID,
        })),
        totalResults: Number.parseInt(data.totalResults, 10),
      }

      movieCache.set(cacheKey, result as any)
      return result
    } catch (error) {
      console.error("Error fetching movies:", error)
      return { movies: [], totalResults: 0 }
    }
  })
}
