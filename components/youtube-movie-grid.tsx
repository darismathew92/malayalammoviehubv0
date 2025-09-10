"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock } from "lucide-react"

interface YouTubeMovie {
  id: string
  title: string
  year: string
  duration: string
  thumbnail: string
  youtubeId: string
  description: string
  genre: string[]
  type: "movie" | "shortfilm"
}

const youtubeMovies: YouTubeMovie[] = [
  {
    id: "1",
    title: "Kumbakonam Gopals",
    year: "2019",
    duration: "2h 15m",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    youtubeId: "dQw4w9WgXcQ",
    description: "A comedy-drama about a family's journey through life's ups and downs.",
    genre: ["Comedy", "Drama"],
    type: "movie",
  },
  {
    id: "2",
    title: "Pathemari",
    year: "2015",
    duration: "2h 30m",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    youtubeId: "dQw4w9WgXcQ",
    description: "The story of Pallikkal Narayanan who migrated to the Middle East in the 1980s.",
    genre: ["Drama", "Family"],
    type: "movie",
  },
  {
    id: "3",
    title: "Amen",
    year: "2013",
    duration: "2h 20m",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    youtubeId: "dQw4w9WgXcQ",
    description: "A musical romantic drama set in a small village in Kerala.",
    genre: ["Romance", "Musical"],
    type: "movie",
  },
  {
    id: "4",
    title: "The Journey",
    year: "2022",
    duration: "25m",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    youtubeId: "dQw4w9WgXcQ",
    description: "A touching short film about finding hope in unexpected places.",
    genre: ["Drama"],
    type: "shortfilm",
  },
  {
    id: "5",
    title: "Memories",
    year: "2023",
    duration: "18m",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    youtubeId: "dQw4w9WgXcQ",
    description: "An emotional short film exploring childhood memories and nostalgia.",
    genre: ["Drama", "Family"],
    type: "shortfilm",
  },
  {
    id: "6",
    title: "Silent Waves",
    year: "2023",
    duration: "22m",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    youtubeId: "dQw4w9WgXcQ",
    description: "A beautiful short film about the relationship between humans and nature.",
    genre: ["Drama", "Nature"],
    type: "shortfilm",
  },
]

export default function YouTubeMovieGrid() {
  const [selectedMovie, setSelectedMovie] = useState<YouTubeMovie | null>(null)
  const [activeTab, setActiveTab] = useState("movies")

  const movies = youtubeMovies.filter((movie) => movie.type === "movie")
  const shortFilms = youtubeMovies.filter((movie) => movie.type === "shortfilm")

  const MovieCard = ({ movie }: { movie: YouTubeMovie }) => (
    <Card className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={movie.thumbnail || "/placeholder.svg"}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <Button
            size="sm"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => setSelectedMovie(movie)}
          >
            <Play className="mr-2 h-4 w-4" />
            Watch Now
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{movie.year}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {movie.duration}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.map((g) => (
              <Badge key={g} variant="outline" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{movie.description}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="movies">Full Movies</TabsTrigger>
          <TabsTrigger value="shortfilms">Short Films</TabsTrigger>
        </TabsList>

        <TabsContent value="movies">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shortfilms">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortFilms.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMovie?.title}</DialogTitle>
          </DialogHeader>
          {selectedMovie && (
            <div className="space-y-4">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedMovie.youtubeId}`}
                  title={selectedMovie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedMovie.year}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {selectedMovie.duration}
                  </div>
                  <Badge variant="outline">{selectedMovie.type === "movie" ? "Full Movie" : "Short Film"}</Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedMovie.genre.map((g) => (
                    <Badge key={g} variant="outline" className="text-xs">
                      {g}
                    </Badge>
                  ))}
                </div>
                <p className="text-muted-foreground">{selectedMovie.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
