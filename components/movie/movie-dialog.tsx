"use client"

import React, { Suspense } from "react"
import dynamic from "next/dynamic"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { OptimizedImage } from "@/components/optimized-image"

const Dialog = dynamic(() => import("@/components/ui/dialog").then((mod) => ({ default: mod.Dialog })), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-96" />,
})
const DialogContent = dynamic(() => import("@/components/ui/dialog").then((mod) => ({ default: mod.DialogContent })))
const DialogDescription = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => ({ default: mod.DialogDescription })),
)
const DialogHeader = dynamic(() => import("@/components/ui/dialog").then((mod) => ({ default: mod.DialogHeader })))
const DialogTitle = dynamic(() => import("@/components/ui/dialog").then((mod) => ({ default: mod.DialogTitle })))

interface MovieDetails {
  Title: string
  Year: string
  Runtime: string
  Plot: string
  Director: string
  Actors: string
  Language: string
  Genre: string
  imdbRating: string
  Poster: string
  platform?: string
}

interface MovieDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  movie: MovieDetails | null
  loading: boolean
}

export const MovieDialog = React.memo(({ open, onOpenChange, movie, loading }: MovieDialogProps) => {
  return (
    <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-96" />}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] mx-4 max-h-[90vh] overflow-y-auto">
          {loading ? (
            <div className="space-y-4 py-4">
              <div className="flex gap-4">
                <Skeleton className="w-24 h-32 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ) : movie ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">{movie.Title}</DialogTitle>
                <DialogDescription className="text-base">
                  {movie.Year} • {movie.Runtime}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <OptimizedImage
                    src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
                    alt={movie.Title}
                    width={96}
                    height={128}
                    className="w-24 h-32 rounded-md flex-shrink-0"
                    priority={true}
                  />
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed mb-3">{movie.Plot}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600">
                        <Star className="h-3 w-3" />
                        {movie.imdbRating}
                      </Badge>
                      {movie.Genre.split(", ").map((genre) => (
                        <Badge key={genre} variant="outline">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid gap-3">
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Director</h4>
                    <p className="text-sm text-muted-foreground">{movie.Director}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Cast</h4>
                    <p className="text-sm text-muted-foreground">{movie.Actors}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Language</h4>
                    <p className="text-sm text-muted-foreground">{movie.Language}</p>
                  </div>
                  {movie.platform && (
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Available on</h4>
                      <p className="text-sm text-muted-foreground">{movie.platform}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={() => onOpenChange(false)} className="px-6">
                    Close
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Failed to load movie details</p>
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Suspense>
  )
})

MovieDialog.displayName = "MovieDialog"
