"use client"

import React, { useState } from "react"
import { Calendar, Info, Play } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/optimized-image"
import { WatchlistButton } from "@/components/watchlist-button"
import type { BaseMovie } from "@/lib/types"

interface BaseMovieCardProps {
  movie: BaseMovie & { platform?: string }
  onAction?: (movie: BaseMovie & { platform?: string }) => void
  actionLabel?: string
  showPlatform?: boolean
  showWatchlist?: boolean
  platformColor?: string
  variant?: "default" | "featured" | "compact"
}

export const BaseMovieCard = React.memo(
  ({
    movie,
    onAction,
    actionLabel = "View Details",
    showPlatform = true,
    showWatchlist = true,
    platformColor = "bg-gray-600 hover:bg-gray-700",
    variant = "default",
  }: BaseMovieCardProps) => {
    const [isHovered, setIsHovered] = useState(false)

    const cardClassName =
      variant === "compact"
        ? "overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
        : "overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"

    return (
      <Card className={cardClassName} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <CardHeader className="p-0">
          <div className="aspect-[3/4] relative group">
            <OptimizedImage
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              width={300}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              priority={false}
            />

            {showPlatform && movie.platform && (
              <div className="absolute top-2 right-2 z-10">
                <Badge
                  className={`${platformColor} text-white text-xs shadow-lg transition-transform duration-200 ${
                    isHovered ? "scale-105" : ""
                  }`}
                >
                  {movie.platform}
                </Badge>
              </div>
            )}

            {showWatchlist && (
              <div className="absolute top-2 left-2 z-10">
                <WatchlistButton
                  item={{
                    id: movie.id,
                    title: movie.title,
                    year: movie.year,
                    poster: movie.poster,
                    type: movie.type,
                    platform: movie.platform,
                  }}
                  showText={false}
                  size="sm"
                />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 md:p-4 transition-all duration-300">
              <h3 className="font-bold text-white text-sm md:text-lg line-clamp-2 mb-1 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                {movie.title}
              </h3>
              <div className="flex items-center gap-2 text-white text-xs md:text-sm">
                <Calendar className="h-3 w-3 flex-shrink-0 drop-shadow-lg" />
                <span className="drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_80%)]">{movie.year}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3 md:p-4">
          <div className="flex flex-wrap gap-1 md:gap-2 items-center">
            <Badge variant="outline" className="capitalize text-xs">
              {movie.type}
            </Badge>
            {showPlatform && movie.platform && (
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <Play className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">Watch on {movie.platform}</span>
              </div>
            )}
          </div>
        </CardContent>

        {onAction && (
          <CardFooter className="p-3 md:p-4 pt-0">
            <Button
              variant="secondary"
              className="w-full text-xs md:text-sm h-8 md:h-10 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              onClick={() => onAction(movie)}
            >
              <Info className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              {actionLabel}
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  },
)

BaseMovieCard.displayName = "BaseMovieCard"
