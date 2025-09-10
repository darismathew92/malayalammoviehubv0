import Link from "next/link"
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
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-14 md:h-16 items-center justify-between">
            <Link href="/news" className="flex items-center gap-2 hover:opacity-80 min-w-0">
              <span className="text-lg">←</span>
              <span className="text-sm font-medium truncate">Back</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">M</span>
              </div>
              <span className="text-base md:text-lg font-bold text-gray-900 hidden sm:block truncate">
                Malayalam Movies Hub
              </span>
            </Link>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              <span className="text-base">↗</span>
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <article className="container px-4 py-4 md:py-6 lg:py-10 max-w-4xl mx-auto">
          <div className="mb-4 md:mb-6 lg:mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                {article.category}
              </span>
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="text-sm">👤</span>
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">📅</span>
                  <span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight mb-3 md:mb-4 leading-tight text-gray-900">
              {article.title}
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">{article.excerpt}</p>
          </div>

          <div className="mb-4 md:mb-6 lg:mb-8">
            <div className="overflow-hidden rounded-xl bg-gray-100">
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-sm md:text-base leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-900">Related News</h3>
            <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {newsArticles
                .filter((item) => item.id !== article.id)
                .slice(0, 3)
                .map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/news/${relatedArticle.id}`}>
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 active:scale-[0.98]">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-3 md:p-4">
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-2">
                          {relatedArticle.category}
                        </span>
                        <h4 className="font-semibold text-sm leading-tight line-clamp-2 mb-2 text-gray-900">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{relatedArticle.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-gray-50 border-t py-4 md:py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs md:text-sm text-gray-600">© 2024 Malayalam Movies Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
