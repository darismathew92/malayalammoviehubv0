"use server"

const API_KEY = "3642aeba"
const API_BASE_URL = "https://www.omdbapi.com/"

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

export async function getMovieDetails(imdbID: string): Promise<MovieDetails | null> {
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
      return null
    }

    if (data.Response === "False") {
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching movie details:", error)
    return null
  }
}

export async function getMovieByTitle(title: string): Promise<Movie | null> {
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
      return null
    }

    if (data.Response === "False") {
      console.error(`Movie not found: ${title}`)
      return null
    }

    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      poster: data.Poster !== "N/A" ? data.Poster : "/placeholder.svg?height=400&width=300",
      type: data.Type,
      imdbID: data.imdbID,
    }
  } catch (error) {
    console.error(`Error fetching movie by title (${title}):`, error)
    return null
  }
}

export async function getSpecificMovies(movieTitles: string[]): Promise<Movie[]> {
  try {
    // Use Promise.all to fetch all movies in parallel
    const moviesPromises = movieTitles.map((title) => getMovieByTitle(title))
    const results = await Promise.all(moviesPromises)

    // Filter out any null results (movies that weren't found)
    return results.filter((movie): movie is Movie => movie !== null)
  } catch (error) {
    console.error("Error fetching specific movies:", error)
    return []
  }
}
