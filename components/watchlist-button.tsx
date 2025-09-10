"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWatchlist } from "@/hooks/use-watchlist"
import { toast } from "@/hooks/use-toast"
import type { WatchlistItem } from "@/lib/watchlist"

interface WatchlistButtonProps {
  item: Omit<WatchlistItem, "addedAt">
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showText?: boolean
}

export function WatchlistButton({ item, variant = "outline", size = "sm", showText = true }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const [isAnimating, setIsAnimating] = useState(false)

  const inWatchlist = isInWatchlist(item.id, item.type)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAnimating(true)

    if (inWatchlist) {
      const success = removeFromWatchlist(item.id, item.type)
      if (success) {
        toast({
          title: "Removed from Watchlist",
          description: `${item.title} has been removed from your watchlist.`,
        })
      }
    } else {
      const success = addToWatchlist(item)
      if (success) {
        toast({
          title: "Added to Watchlist",
          description: `${item.title} has been added to your watchlist.`,
        })
      } else {
        toast({
          title: "Already in Watchlist",
          description: `${item.title} is already in your watchlist.`,
          variant: "destructive",
        })
      }
    }

    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <Button
      variant={inWatchlist ? "default" : variant}
      size={size}
      onClick={handleClick}
      className={`transition-all duration-300 ${
        isAnimating ? "scale-110" : ""
      } ${inWatchlist ? "bg-red-600 hover:bg-red-700" : ""}`}
    >
      {inWatchlist ? (
        <>
          <Check className="h-4 w-4 mr-1" />
          {showText && "In Watchlist"}
        </>
      ) : (
        <>
          <Heart className="h-4 w-4 mr-1" />
          {showText && "Add to Watchlist"}
        </>
      )}
    </Button>
  )
}
