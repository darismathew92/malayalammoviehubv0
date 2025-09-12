import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import DesktopNav from "@/components/desktop-nav"
import newsArticles from "@/data/news.json"

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Malayalam Movies Hub</span>
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-6 lg:py-10">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Malayalam Cinema News
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Quick updates and latest happenings in Malayalam film industry.
            </p>
          </div>

          <div className="mb-8">
            <DesktopNav />
          </div>

          <div className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {newsArticles.map((article) => (
              <Link key={article.id} href={`/news/${article.id}`}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-semibold leading-snug line-clamp-2 mb-2 text-gray-900">
                      {article.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="truncate font-medium">{article.author}</span>
                      <span className="flex-shrink-0 ml-2">
                        {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">© 2024 Malayalam Movies Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
