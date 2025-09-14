"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWatchlist } from "@/hooks/use-watchlist"
import { toast } from "@/hooks/use-toast"
import type { WatchlistItem } from "@/lib/watchlist"

const HeartIcon = () => (
  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

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
          <CheckIcon />
          {showText && "In Watchlist"}
        </>
      ) : (
        <>
          <HeartIcon />
          {showText && "Add to Watchlist"}
        </>
      )}
    </Button>
  )
}
