import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const newsArticles = [
  {
    id: 1,
    title: "Mammootty's 'Turbo' Creates Box Office Records",
    excerpt:
      "The action-packed thriller starring Mammootty has broken several box office records in its opening weekend, collecting over ₹25 crores worldwide.",
    content:
      "Mammootty's latest film 'Turbo' has taken the Malayalam film industry by storm, setting new benchmarks at the box office. The film, directed by Vysakh, has collected an impressive ₹25 crores in its opening weekend alone.",
    author: "Cinema Reporter",
    date: "2024-12-15",
    category: "Box Office",
    readTime: "3 min read",
    image: "/mammootty-turbo-movie-poster.jpg",
  },
  {
    id: 2,
    title: "Fahadh Faasil Announces New Project with Lijo Jose Pellissery",
    excerpt:
      "The acclaimed actor-director duo is set to collaborate again after their successful venture 'Nanpakal Nerathu Mayakkam'.",
    content:
      "Fahadh Faasil and director Lijo Jose Pellissery have announced their new collaboration, much to the excitement of Malayalam cinema fans. This marks their second project together after the critically acclaimed 'Nanpakal Nerathu Mayakkam'.",
    author: "Film Insider",
    date: "2024-12-14",
    category: "Announcements",
    readTime: "2 min read",
    image: "/fahadh-faasil-lijo-jose-pellissery.jpg",
  },
  {
    id: 3,
    title: "Kerala State Film Awards 2024 Winners Announced",
    excerpt:
      "The prestigious awards ceremony recognized outstanding contributions to Malayalam cinema, with 'Nanpakal Nerathu Mayakkam' winning multiple awards.",
    content:
      "The Kerala State Film Awards 2024 have been announced, celebrating the best of Malayalam cinema. 'Nanpakal Nerathu Mayakkam' emerged as the biggest winner, taking home awards for Best Film, Best Director, and Best Actor.",
    author: "Awards Desk",
    date: "2024-12-13",
    category: "Awards",
    readTime: "4 min read",
    image: "/kerala-state-film-awards-2024.jpg",
  },
  {
    id: 4,
    title: "Mohanlal's 'Barroz' Gets International Distribution Deal",
    excerpt:
      "The 3D fantasy film directed by Mohanlal himself has secured distribution rights across multiple international markets.",
    content:
      "Mohanlal's directorial debut 'Barroz' has secured international distribution deals, marking a significant milestone for Malayalam cinema's global reach. The 3D fantasy adventure will be released in over 15 countries.",
    author: "International Correspondent",
    date: "2024-12-12",
    category: "International",
    readTime: "3 min read",
    image: "/mohanlal-barroz-3d-movie.jpg",
  },
  {
    id: 5,
    title: "Prithviraj Sukumaran's Production House Announces Three New Films",
    excerpt:
      "Prithviraj Productions has unveiled an ambitious slate of three new Malayalam films set to go into production in 2025.",
    content:
      "Actor-producer Prithviraj Sukumaran has announced three exciting new projects under his production banner. The films will feature a mix of established and emerging talent, showcasing diverse genres from thriller to family drama.",
    author: "Production News",
    date: "2024-12-11",
    category: "Production",
    readTime: "2 min read",
    image: "/prithviraj-sukumaran-producer.jpg",
  },
  {
    id: 6,
    title: "Tovino Thomas Wraps Shooting for Upcoming Sci-Fi Thriller",
    excerpt:
      "The versatile actor has completed filming for his next project, a science fiction thriller that promises to push the boundaries of Malayalam cinema.",
    content:
      "Tovino Thomas has wrapped up shooting for his highly anticipated sci-fi thriller, which is being touted as one of the most technically advanced Malayalam films ever made. The film features cutting-edge VFX and an innovative storyline.",
    author: "Set Reporter",
    date: "2024-12-10",
    category: "Production",
    readTime: "3 min read",
    image: "/tovino-thomas-sci-fi-movie.jpg",
  },
]

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-center py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-bold">Malayalam Movies Hub</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-4 md:py-6 lg:py-10">
          <div className="flex flex-col gap-2 md:gap-4 text-center mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight px-4 md:px-0">
              Malayalam Cinema News
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4 md:px-0">
              Stay updated with the latest news, announcements, and developments in Malayalam cinema industry.
            </p>
          </div>

          <nav
            className="flex justify-start md:justify-center gap-2 md:gap-4 mb-6 md:mb-8 overflow-x-auto pb-2 px-4 md:px-0"
            aria-label="Movie categories"
          >
            <Link
              href="/"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              OTT Releases
            </Link>
            <Link
              href="/upcoming"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              Theater Releases
            </Link>
            <Link
              href="/youtube"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              YouTube Movies
            </Link>
            <Link
              href="/trailers"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              Trailers
            </Link>
            <Link
              href="/watchlist"
              className="px-3 py-2 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap text-sm md:text-base"
            >
              My Watchlist
            </Link>
            <Link
              href="/news"
              className="px-3 py-2 md:px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap text-sm md:text-base"
              aria-current="page"
            >
              News
            </Link>
          </nav>

          <div className="grid gap-6 md:gap-8">
            {/* Featured Article */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={newsArticles[0].image || "/placeholder.svg"}
                    alt={newsArticles[0].title}
                    className="h-48 md:h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{newsArticles[0].category}</Badge>
                    <span className="text-sm text-muted-foreground">Featured</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">{newsArticles[0].title}</h2>
                  <p className="text-muted-foreground mb-4">{newsArticles[0].content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {newsArticles[0].author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(newsArticles[0].date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {newsArticles[0].readTime}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* News Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsArticles.slice(1).map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4">{article.excerpt}</CardDescription>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-4 md:py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-xs md:text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Malayalam Movies Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs md:text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs md:text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
