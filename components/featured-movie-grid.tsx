"use client"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Star, Film, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const FEATURED_MOVIES = [
  {
    id: 1,
    title: "Kumbalangi Nights",
    year: "2019",
    director: "Madhu C. Narayanan",
    genre: "Drama, Family",
    rating: "8.7",
    platform: "YouTube",
    description: "A heartwarming tale of four brothers and their complex relationships in the backwaters of Kochi.",
    poster: "/placeholder.svg?height=400&width=300&text=Kumbalangi+Nights",
    featured: true,
    type: "movie",
    awards: ["National Film Award", "Kerala State Film Award"],
  },
  {
    id: 2,
    title: "Angamaly Diaries",
    year: "2017",
    director: "Lijo Jose Pellissery",
    genre: "Action, Comedy",
    rating: "8.1",
    platform: "YouTube",
    description:
      "A raw and energetic portrayal of life in Angamaly, following a group of friends in the pork business.",
    poster: "/placeholder.svg?height=400&width=300&text=Angamaly+Diaries",
    featured: true,
    type: "movie",
  },
  {
    id: 9,
    title: "Memories of a Machine",
    year: "2023",
    director: "Sooraj Tom",
    genre: "Sci-Fi, Short Film",
    rating: "8.5",
    platform: "YouTube",
    description: "A thought-provoking short film about AI consciousness and human emotions.",
    poster: "/placeholder.svg?height=400&width=300&text=Memories+of+a+Machine",
    featured: true,
    type: "short-film",
    duration: "18 min",
  },
  {
    id: 12,
    title: "Biriyani",
    year: "2022",
    director: "Sajin Baabu",
    genre: "Comedy, Short Film",
    rating: "8.0",
    platform: "YouTube",
    description: "A hilarious short film about the cultural significance of biriyani in Kerala.",
    poster: "/placeholder.svg?height=400&width=300&text=Biriyani",
    featured: true,
    type: "short-film",
    duration: "12 min",
  },
] as const

const PLATFORM_COLORS = {
  Netflix: "bg-red-600 text-white",
  "Amazon Prime": "bg-blue-600 text-white",
  Hotstar: "bg-orange-600 text-white",
  YouTube: "bg-red-600 text-white",
  Neestream: "bg-purple-600 text-white",
} as const

export default function FeaturedMovieGrid() {
  const [filter, setFilter] = useState<"all" | "movies" | "short-films">("all")

  const filteredMovies = useMemo(() => {
    return FEATURED_MOVIES.filter((movie) => {
      if (filter === "all") return true
      if (filter === "movies") return movie.type === "movie"
      if (filter === "short-films") return movie.type === "short-film"
      return true
    })
  }, [filter])

  const getPlatformColor = (platform: string) => {
    return PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS] || "bg-gray-600 text-white"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-lg p-1" role="tablist">
          {[
            { key: "all", label: "All Featured" },
            { key: "movies", label: "Movies" },
            { key: "short-films", label: "Short Films" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              role="tab"
              aria-selected={filter === key}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredMovies.map((movie) => (
          <Card
            key={movie.id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader className="p-0">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={movie.poster || "/placeholder.svg"}
                  alt={`${movie.title} poster`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={movie.id <= 4}
                />

                <div className="absolute top-2 right-2 z-20">
                  <Badge className={getPlatformColor(movie.platform)}>{movie.platform}</Badge>
                </div>

                <div className="absolute top-2 left-2 z-20">
                  <Badge className="bg-amber-500 text-white font-medium">⭐ FEATURED</Badge>
                </div>

                {movie.type === "short-film" && (
                  <div className="absolute top-10 left-2 z-20">
                    <Badge className="bg-purple-600 text-white">SHORT FILM</Badge>
                  </div>
                )}

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 100%) !important",
                  }}
                />

                <div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.9) !important",
                  }}
                >
                  <h3
                    className="font-bold text-lg line-clamp-2 mb-1"
                    style={{
                      color: "#ffffff !important",
                      textShadow: "2px 2px 4px rgba(0,0,0,1) !important",
                      backgroundColor: "rgba(0,0,0,0.8) !important",
                      padding: "2px 4px !important",
                      borderRadius: "4px !important",
                    }}
                  >
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-white" />
                      <span
                        style={{
                          color: "#ffffff !important",
                          textShadow: "1px 1px 2px rgba(0,0,0,1) !important",
                          backgroundColor: "rgba(0,0,0,0.8) !important",
                          padding: "1px 3px !important",
                          borderRadius: "3px !important",
                        }}
                      >
                        {movie.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span
                        style={{
                          color: "#ffffff !important",
                          textShadow: "1px 1px 2px rgba(0,0,0,1) !important",
                          backgroundColor: "rgba(0,0,0,0.8) !important",
                          padding: "1px 3px !important",
                          borderRadius: "3px !important",
                        }}
                      >
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {movie.genre.split(", ")[0]}
                </Badge>
                {movie.duration && (
                  <Badge variant="outline" className="text-xs">
                    {movie.duration}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{movie.description}</p>

              {movie.awards && movie.awards.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    🏆 {movie.awards[0].length > 20 ? `${movie.awards[0].substring(0, 20)}...` : movie.awards[0]}
                  </Badge>
                </div>
              )}

              <div className="flex items-center text-sm text-gray-500">
                <Play className="h-3 w-3 mr-1" />
                <span>Available on {movie.platform}</span>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="flex gap-2 w-full">
                <Link href={`/watch/${movie.id}`} className="flex-1">
                  <Button className="w-full h-9 text-sm">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Now
                  </Button>
                </Link>
                <Button variant="outline" className="h-9 px-3 bg-transparent">
                  + List
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center py-16">
          <Film className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No featured content found</h3>
          <p className="text-gray-600">Try selecting a different filter to see more content</p>
        </div>
      )}
    </div>
  )
}
