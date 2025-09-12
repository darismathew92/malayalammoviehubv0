export interface BaseMovie {
  id: string
  title: string
  year: string
  poster?: string
  type: string
}

export interface OTTMovie extends BaseMovie {
  platform?: string
  imdbID: string
}

export interface YouTubeMovie extends BaseMovie {
  youtubeId: string
  duration: string
  genre: string[]
  description?: string
}

export interface TrailerMovie extends BaseMovie {
  youtubeId: string
  genre: string[]
  description?: string
}

export interface UpcomingMovie extends BaseMovie {
  releaseDate: string
  genre: string[]
  description?: string
}

export interface FeaturedMovie extends BaseMovie {
  platform?: string
  imdbID: string
  featured: boolean
  rating?: string
}

export type MovieType = "ott" | "youtube" | "trailer" | "upcoming" | "featured"

export interface GridState<T> {
  items: T[]
  loading: boolean
  error: string | null
  selectedItem: T | null
}

export interface GridActions<T> {
  setItems: (items: T[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSelectedItem: (item: T | null) => void
}
