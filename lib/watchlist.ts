export interface WatchlistItem {
  id: string
  title: string
  year: string
  poster: string
  type: "ott" | "upcoming" | "youtube" | "trailer"
  platform?: string
  theater?: string
  releaseDate?: string
  youtubeId?: string
  genre?: string[]
  duration?: string
  description?: string
  addedAt: number
}

class WatchlistManager {
  private readonly STORAGE_KEY = "malayalam-movies-watchlist"

  getWatchlist(): WatchlistItem[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error reading watchlist:", error)
      return []
    }
  }

  addToWatchlist(item: Omit<WatchlistItem, "addedAt">): boolean {
    try {
      const watchlist = this.getWatchlist()

      // Check if item already exists
      if (watchlist.some((existing) => existing.id === item.id && existing.type === item.type)) {
        return false
      }

      const newItem: WatchlistItem = {
        ...item,
        addedAt: Date.now(),
      }

      watchlist.unshift(newItem) // Add to beginning
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(watchlist))

      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent("watchlistUpdated"))
      return true
    } catch (error) {
      console.error("Error adding to watchlist:", error)
      return false
    }
  }

  removeFromWatchlist(id: string, type: string): boolean {
    try {
      const watchlist = this.getWatchlist()
      const filtered = watchlist.filter((item) => !(item.id === id && item.type === type))

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
      window.dispatchEvent(new CustomEvent("watchlistUpdated"))
      return true
    } catch (error) {
      console.error("Error removing from watchlist:", error)
      return false
    }
  }

  isInWatchlist(id: string, type: string): boolean {
    const watchlist = this.getWatchlist()
    return watchlist.some((item) => item.id === id && item.type === type)
  }

  clearWatchlist(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
      window.dispatchEvent(new CustomEvent("watchlistUpdated"))
      return true
    } catch (error) {
      console.error("Error clearing watchlist:", error)
      return false
    }
  }

  getWatchlistByType(type: WatchlistItem["type"]): WatchlistItem[] {
    return this.getWatchlist().filter((item) => item.type === type)
  }
}

export const watchlistManager = new WatchlistManager()
