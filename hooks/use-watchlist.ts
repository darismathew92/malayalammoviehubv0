"use client"

import { useState, useEffect } from "react"
import { watchlistManager, type WatchlistItem } from "@/lib/watchlist"

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial load
    setWatchlist(watchlistManager.getWatchlist())
    setIsLoading(false)

    // Listen for watchlist updates
    const handleWatchlistUpdate = () => {
      setWatchlist(watchlistManager.getWatchlist())
    }

    window.addEventListener("watchlistUpdated", handleWatchlistUpdate)
    return () => window.removeEventListener("watchlistUpdated", handleWatchlistUpdate)
  }, [])

  const addToWatchlist = (item: Omit<WatchlistItem, "addedAt">) => {
    return watchlistManager.addToWatchlist(item)
  }

  const removeFromWatchlist = (id: string, type: string) => {
    return watchlistManager.removeFromWatchlist(id, type)
  }

  const isInWatchlist = (id: string, type: string) => {
    return watchlistManager.isInWatchlist(id, type)
  }

  const clearWatchlist = () => {
    return watchlistManager.clearWatchlist()
  }

  const getWatchlistByType = (type: WatchlistItem["type"]) => {
    return watchlistManager.getWatchlistByType(type)
  }

  return {
    watchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
    getWatchlistByType,
  }
}
