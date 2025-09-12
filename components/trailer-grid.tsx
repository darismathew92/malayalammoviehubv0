"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Calendar, Clock } from "lucide-react"
import { WatchlistButton } from "@/components/watchlist-button"
import React from "react"
import trailersData from "@/data/trailers.json"

interface Trailer {
  id: string
  title: string
  youtubeId: string
  thumbnail: string
  description: string
  releaseDate: string
  duration: string
  category: "latest" | "classic"
  views: string
}

const trailers: Trailer[] = trailersData

export default function TrailerGrid() {
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null)
  const [activeTab, setActiveTab] = useState("latest")

  const filteredTrailers = trailers.filter((trailer) => trailer.category === activeTab)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleFullscreenChange = React.useCallback(() => {
    if (
      document.fullscreenElement &&
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      // Force landscape orientation on mobile when entering fullscreen
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {
          // Fallback if orientation lock fails
          console.log("[v0] Orientation lock not supported or failed")
        })
      }
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [handleFullscreenChange])

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="latest">Latest Trailers</TabsTrigger>
          <TabsTrigger value="classic">Classic Trailers</TabsTrigger>
        </TabsList>

        <TabsContent value="latest" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrailers.map((trailer) => (
              <TrailerCard key={trailer.id} trailer={trailer} onClick={() => setSelectedTrailer(trailer)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="classic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrailers.map((trailer) => (
              <TrailerCard key={trailer.id} trailer={trailer} onClick={() => setSelectedTrailer(trailer)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedTrailer} onOpenChange={() => setSelectedTrailer(null)}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>{selectedTrailer?.title}</DialogTitle>
          </DialogHeader>
          {selectedTrailer && (
            <div className="space-y-4">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedTrailer.youtubeId}?autoplay=1`}
                  title={selectedTrailer.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  data-video-player="true"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{selectedTrailer.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedTrailer.releaseDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedTrailer.duration}
                  </div>
                  <div>{selectedTrailer.views} views</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface TrailerCardProps {
  trailer: Trailer
  onClick: () => void
}

function TrailerCard({ trailer, onClick }: TrailerCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="group cursor-pointer space-y-3 rounded-lg border p-4 transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img
          src={trailer.thumbnail || "/placeholder.svg"}
          alt={trailer.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-1">
            <WatchlistButton
              item={{
                id: trailer.id,
                title: trailer.title,
                year: new Date(trailer.releaseDate).getFullYear().toString(),
                poster: trailer.thumbnail,
                type: "trailer",
                youtubeId: trailer.youtubeId,
                duration: trailer.duration,
                description: trailer.description,
              }}
              showText={false}
              size="sm"
            />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="lg" className="rounded-full" onClick={onClick}>
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="text-xs">
            {trailer.duration}
          </Badge>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold line-clamp-1 flex-1">{trailer.title}</h3>
          <WatchlistButton
            item={{
              id: trailer.id,
              title: trailer.title,
              year: new Date(trailer.releaseDate).getFullYear().toString(),
              poster: trailer.thumbnail,
              type: "trailer",
              youtubeId: trailer.youtubeId,
              duration: trailer.duration,
              description: trailer.description,
            }}
            showText={true}
            size="sm"
            className="shrink-0"
          />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{trailer.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(trailer.releaseDate)}</span>
          <span>{trailer.views} views</span>
        </div>
      </div>
    </div>
  )
}
