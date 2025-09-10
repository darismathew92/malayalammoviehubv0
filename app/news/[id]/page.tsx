import Link from "next/link"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

const newsArticles = [
  {
    id: 1,
    title: "Mammootty's 'Turbo' Crosses ₹25 Crores",
    excerpt: "Action thriller breaks box office records in opening weekend.",
    content: `Mammootty's latest action thriller 'Turbo' has achieved a remarkable milestone by crossing ₹25 crores at the box office within its opening weekend. The film, directed by Vysakh, has been praised for its high-octane action sequences and Mammootty's powerful performance.

The movie opened to packed theaters across Kerala and other South Indian states, with many shows running housefull. Trade analysts predict that 'Turbo' could become one of the highest-grossing Malayalam films of 2024.

The film's success can be attributed to its engaging storyline, stellar performances, and top-notch technical values. Mammootty's portrayal of the lead character has been particularly appreciated by both critics and audiences.

'Turbo' is expected to continue its strong performance in the coming weeks, with plans for wider release in international markets already underway.`,
    author: "Cinema Reporter",
    date: "2024-12-15",
    category: "Box Office",
    image: "/mammootty-turbo-movie-poster.jpg",
  },
  {
    id: 2,
    title: "Fahadh Faasil-Lijo Jose Pellissery Reunite",
    excerpt: "Acclaimed duo announces new project after 'Nanpakal Nerathu Mayakkam'.",
    content: `The acclaimed actor-director duo of Fahadh Faasil and Lijo Jose Pellissery are set to reunite for a new project, following their critically acclaimed collaboration in 'Nanpakal Nerathu Mayakkam'.

The announcement was made during a recent film festival, where both artists expressed their excitement about working together again. While details about the new project remain under wraps, sources suggest it will be another experimental venture that pushes the boundaries of conventional storytelling.

Their previous collaboration, 'Nanpakal Nerathu Mayakkam', was widely praised for its innovative narrative structure and Fahadh's nuanced performance. The film won several awards at various film festivals and established the duo as one of the most creative partnerships in contemporary Malayalam cinema.

Industry insiders are eagerly awaiting more details about this upcoming project, which is expected to begin production in early 2025.`,
    author: "Film Insider",
    date: "2024-12-14",
    category: "Announcements",
    image: "/fahadh-faasil-lijo-jose-pellissery.jpg",
  },
  // Add more detailed articles as needed...
]

interface NewsDetailPageProps {
  params: {
    id: string
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = newsArticles.find((article) => article.id === Number.parseInt(params.id))

  if (!article) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/news" className="flex items-center gap-2 hover:opacity-80">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to News</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold">Malayalam Movies Hub</span>
          </Link>
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <article className="container py-6 md:py-10 max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{article.category}</Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">{article.title}</h1>

            <p className="text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
          </div>

          {/* Featured Image */}
          <div className="mb-6 md:mb-8">
            <Card className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Article Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-6">Related News</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {newsArticles
                .filter((item) => item.id !== article.id)
                .slice(0, 3)
                .map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/news/${relatedArticle.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="text-xs mb-2">
                          {relatedArticle.category}
                        </Badge>
                        <h4 className="font-medium text-sm leading-tight line-clamp-2 mb-2">{relatedArticle.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{relatedArticle.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </article>
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
