"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Clock, Search, Filter } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import React from "react"
import { WatchlistButton } from "@/components/watchlist-button"

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
  id: "5",
  title: "Meesha Madhavan Malayalam Comedy Full Movie | Dileep | Kavya Madhavan",
  year: "2020",
  duration: "2h 23m",
  thumbnail: "https://img.youtube.com/vi/6U89t0c5TBQ/maxresdefault.jpg",
  youtubeId: "6U89t0c5TBQ",
  description: "This is a full-length Malayalam comedy movie titled \"Meesha Madhavan,\" starring Dileep and Kavya Madhavan.",
  genre: [
    "Comedy",
    "Drama"
  ],
  type: "movie",
},
 {
  id: "6",
  title: "Angamaly Diaries ",
  year: "2018",
  duration: "2h 4m",
  thumbnail: "https://img.youtube.com/vi/9mRG1GVxtkY/maxresdefault.jpg",
  youtubeId: "9mRG1GVxtkY",
  description: "The video, \"Angamaly Diaries,\" is a narrative film set in Angamaly, a town in Kerala, India, focusing on the life of Vincent Pepe and his group of friends. The story follows their coming-of-age, their involvement in local rivalries, and their entry into the pork business.",
  genre: [
    "Drama",
    "Action"
  ],
  type: "movie",
},
  {
    id: "7",
    title: "Kumbalangi Nights",
    year: "2019",
    duration: "2h 15m",
    thumbnail: "https://img.youtube.com/vi/bNyKd0PUx04/maxresdefault.jpg",
    youtubeId: "bNyKd0PUx04",
    description:
      "Four brothers living in the fishing hamlet of Kumbalangi share a love-hate relationship with each other. A heartwarming tale of family, love, and redemption.",
    genre: ["Drama", "Family", "Comedy"],
    type: "movie",
  },
  {
    id: "8",
    title: "Kuberan",
    year: "2002",
    duration: "2h 1m",
    thumbnail: "https://img.youtube.com/vi/s6P9QNj2_o0/maxresdefault.jpg",
    youtubeId: "s6P9QNj2_o0",
    description:
      "Siddharthan is an actor who is the guardian of three children from his village. He rents a house posing as a rich man and is visited by his old friend Ramanujan, who creates chaos. The young heiress Pooja, who is the daughter of the owner of a palace, has a haunted past. Her husband was a sadist so she ran away to her native village. Her mother finds out where she is and also comes to the village. Pooja does not want to go with her mother, so she acts like a memory-loss patient and says that their neighbour Siddharthan is her husband and his adopted children are their children. Thus, her mother allows Pooja to stay in the village. Pooja's husband finds her and comes to get her back. Pooja tells Siddharthan that she does not want to go with her husband. Siddharthan fights Pooja's husband, and in the end Gouri's father shoots Pooja's husband and goes to prison. Pooja leaves the house and Siddharthan joins his girlfriend Gauri",
    genre: ["Comedy", "Drama", "Romance"],
    type: "movie",
  },
  {
    id: "9",
    title: "Sethurama Iyer CBI",
    year: "2004",
    duration: "2h 20m",
    thumbnail: "https://img.youtube.com/vi/MUyjRy8g21U/maxresdefault.jpg",
    youtubeId: "MUyjRy8g21U",
    description:
      "The fourth installment in the popular CBI series featuring Mammootty as the brilliant investigator Sethurama Iyer. A gripping crime thriller that follows the CBI team as they unravel a complex murder mystery with their signature methodical investigation style.",
    genre: ["Thriller", "Crime", "Mystery"],
    type: "movie",
  },
  {
    id: "10",
    title: "Hello Mummy",
    year: "2014",
    duration: "2h 5m",
    thumbnail: "https://img.youtube.com/vi/fjkVtzBCWI4/maxresdefault.jpg",
    youtubeId: "fjkVtzBCWI4",
    description:
      "A hilarious comedy about a young man who gets entangled in supernatural events involving a mummy. A fun-filled adventure that combines horror elements with comedy, creating an entertaining experience for the whole family.",
    genre: ["Comedy", "Horror", "Adventure"],
    type: "movie",
  },
  {
    id: "11",
    title: "Trance",
    year: "2020",
    duration: "2h 20m",
    thumbnail: "https://img.youtube.com/vi/idwRqmXn1kc/maxresdefault.jpg",
    youtubeId: "idwRqmXn1kc",
    description:
      "A psychological thriller that follows Viju Prasad, a motivational speaker who gets caught up in the dark world of religious manipulation and mass psychology. A gripping tale that explores the thin line between faith and fanaticism.",
    genre: ["Thriller", "Psychological", "Drama"],
    type: "movie",
  },
  {
    id: "12",
    title: "Aadu 2",
    year: "2017",
    duration: "2h 40m",
    thumbnail: "https://img.youtube.com/vi/ibw3-fIrgbY/maxresdefault.jpg",
    youtubeId: "ibw3-fIrgbY",
    description:
      "The hilarious sequel to the cult comedy Aadu. Shaji Pappan and his gang return with more misadventures and laugh-out-loud moments. A perfect blend of absurd humor and entertaining storytelling that has become a favorite among Malayalam comedy lovers.",
    genre: ["Comedy", "Adventure", "Entertainment"],
    type: "movie",
  },
  {
    id: "13",
    title: "Runway",
    year: "2004",
    duration: "2h 30m",
    thumbnail: "https://img.youtube.com/vi/Ke3Tx5iUOTw/maxresdefault.jpg",
    youtubeId: "Ke3Tx5iUOTw",
    description:
      "A gripping thriller that follows the story of a young man caught in a web of crime and deception. An intense drama that explores themes of survival, loyalty, and the consequences of choices made under pressure.",
    genre: ["Thriller", "Drama", "Action"],
    type: "movie",
  },
  {
    id: "14",
    title: "Sandesham",
    year: "1991",
    duration: "2h 20m",
    thumbnail: "https://img.youtube.com/vi/iAb1SgB1hwg/maxresdefault.jpg",
    youtubeId: "iAb1SgB1hwg",
    description:
      "A brilliant political satire that explores the dynamics of Kerala politics through the story of two brothers with opposing political ideologies. A timeless classic that combines humor with sharp social commentary on political rivalry and family relationships.",
    genre: ["Comedy", "Political", "Satire"],
    type: "movie",
  },
  {
    id: "15",
    title: "Narayaneente Moonnaanmakkal",
    year: "2025",
    duration: "1h 49m",
    thumbnail: "https://img.youtube.com/vi/pfNV33U03hI/maxresdefault.jpg",
    youtubeId: "pfNV33U03hI",
    description: "Narayaneente Moonnaanmakkal Malayalam Full Movie| Joju George | Suraj Venjaramoodu |Sharan Venugopal",
    genre: ["Drama", "Family"],
    type: "movie",
  },
  {
    id: "16",
    title: "Thuruppugulan",
    year: "2024",
    duration: "2h 21m",
    thumbnail: "https://img.youtube.com/vi/ZfvWA6YSyXg/maxresdefault.jpg",
    youtubeId: "ZfvWA6YSyXg",
    description: "Thuruppugulan Full HD Movie | Malayalam Comedy Movies | Mammootty | Sneha | Innocent | Devan",
    genre: ["Comedy"],
    type: "movie",
  },
  {
    id: "17",
    title: "Godha",
    year: "2025",
    duration: "1h 50m",
    thumbnail: "https://img.youtube.com/vi/vfHESR01Bzg/maxresdefault.jpg",
    youtubeId: "vfHESR01Bzg",
    description: "Godha malayalam full movie tovino thomas basil joseph",
    genre: ["Comedy", "Sports"],
    type: "movie",
  },
  {
    id: "18",
    title: "My Boss",
    year: "2012",
    duration: "2h 37m",
    thumbnail: "https://img.youtube.com/vi/cHrEPepm9wE/maxresdefault.jpg",
    youtubeId: "cHrEPepm9wE",
    description: "My Boss (2012) Malayalam Full Movie | 4K UltraHD | Dileep | Mamta Mohandas | My Boss Malayalam Movie",
    genre: ["Comedy", "Romance"],
    type: "movie",
  },
  {
    id: "20",
    title: "Friends",
    year: "2023",
    duration: "2h 45m",
    thumbnail: "https://img.youtube.com/vi/OlakJF7FbNU/maxresdefault.jpg",
    youtubeId: "OlakJF7FbNU",
    description: "Friends Malayalam Full Movie | Siddique | Jayaram | Mukesh | Sreenivasan",
    genre: ["Comedy", "Drama"],
    type: "movie",
  },
  {
    id: "21",
    title: "Fingerprint",
    year: "2020",
    duration: "1h 52m",
    thumbnail: "https://img.youtube.com/vi/VCkuEqzxbCg/maxresdefault.jpg",
    youtubeId: "VCkuEqzxbCg",
    description: "Fingerprint New Malayalam Movie Malayalam Crime Thriller Full movie | New Movie 2020",
    genre: ["Crime", "Thriller"],
    type: "movie",
  },
  {
    id: "22",
    title: "Ullasam",
    year: "2022",
    duration: "2h 6m",
    thumbnail: "https://img.youtube.com/vi/T79G-me-ijQ/maxresdefault.jpg",
    youtubeId: "T79G-me-ijQ",
    description: "Ullasam 2022 Malayalam Full Movie ",
    genre: ["Comedy", "Romance"],
    type: "movie",
  },
  {
    id: "23",
    title: "Action Hero Biju",
    year: "2016",
    duration: "2h 24m",
    thumbnail: "https://img.youtube.com/vi/ZK3lMGPgqD4/maxresdefault.jpg",
    youtubeId: "ZK3lMGPgqD4",
    description:
      "A realistic portrayal of a police officer's life, following Sub-Inspector Biju Paulose as he deals with various cases and situations in his daily duty. An engaging action-comedy that showcases the challenges and humor in police work.",
    genre: ["Action", "Comedy", "Drama"],
    type: "movie",
  },
  {
    id: "24",
    title: "In Harihar Nagar",
    year: "1990",
    duration: "2h 8m",
    thumbnail: "https://img.youtube.com/vi/2MwMSEWSRNI/maxresdefault.jpg",
    youtubeId: "2MwMSEWSRNI",
    description:
      "A classic Malayalam comedy about four friends living in Harihar Nagar who get involved in a mystery when a new neighbor arrives. This cult comedy launched a successful franchise and remains one of the most beloved Malayalam comedies of all time.",
    genre: ["Comedy", "Mystery", "Entertainment"],
    type: "movie",
  },
]

const MovieCard = React.memo(
  ({ movie, onMovieClick }: { movie: YouTubeMovie; onMovieClick: (movie: YouTubeMovie) => void }) => (
    <Card className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <OptimizedImage
            src={movie.thumbnail || "/placeholder.svg"}
            alt={movie.title}
            width={400}
            height={225}
            className="h-full w-full transition-transform group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-1">
              <WatchlistButton
                item={{
                  id: movie.id,
                  title: movie.title,
                  year: movie.year,
                  poster: movie.thumbnail,
                  type: "youtube",
                  youtubeId: movie.youtubeId,
                  genre: movie.genre,
                  duration: movie.duration,
                  description: movie.description,
                }}
                showText={false}
                size="sm"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <Button
            size="sm"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onMovieClick(movie)}
          >
            <Play className="mr-2 h-4 w-4" />
            Watch Now
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-semibold text-lg line-clamp-1 flex-1">{movie.title}</h3>
            <WatchlistButton
              item={{
                id: movie.id,
                title: movie.title,
                year: movie.year,
                poster: movie.thumbnail,
                type: "youtube",
                youtubeId: movie.youtubeId,
                genre: movie.genre,
                duration: movie.duration,
                description: movie.description,
              }}
              showText={true}
              size="sm"
              className="shrink-0"
            />
          </div>
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
  ),
)

MovieCard.displayName = "MovieCard"

export default function YouTubeMovieGrid() {
  const [selectedMovie, setSelectedMovie] = useState<YouTubeMovie | null>(null)
  const [activeTab, setActiveTab] = useState("movies")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")

  const handleFullscreenChange = useCallback(() => {
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

  const filteredMovies = useMemo(() => {
    return youtubeMovies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = selectedGenre === "all" || movie.genre.includes(selectedGenre)
      return matchesSearch && matchesGenre
    })
  }, [searchQuery, selectedGenre])

  const movies = useMemo(() => filteredMovies.filter((movie) => movie.type === "movie"), [filteredMovies])
  const shortFilms = useMemo(() => filteredMovies.filter((movie) => movie.type === "shortfilm"), [filteredMovies])

  const allGenres = useMemo(() => {
    const genres = new Set<string>()
    youtubeMovies.forEach((movie) => {
      movie.genre.forEach((g) => genres.add(g))
    })
    return Array.from(genres).sort()
  }, [])

  const handleMovieClick = useCallback((movie: YouTubeMovie) => {
    setSelectedMovie(movie)
  }, [])

  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedGenre("all")
  }, [])

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search movies and short films..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {allGenres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {searchQuery || selectedGenre !== "all" ? (
            <>
              Showing {filteredMovies.length} result{filteredMovies.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedGenre !== "all" && ` in ${selectedGenre}`}
            </>
          ) : (
            `${youtubeMovies.length} total movies and short films`
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="movies">Full Movies ({movies.length})</TabsTrigger>
          <TabsTrigger value="shortfilms">Short Films ({shortFilms.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="movies">
          {movies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No movies found matching your criteria.</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shortfilms">
          {shortFilms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shortFilms.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No short films found matching your criteria.</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
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
                  src={`https://www.youtube.com/embed/${selectedMovie.youtubeId}?autoplay=1`}
                  title={selectedMovie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="rounded-lg"
                  data-video-player="true"
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
