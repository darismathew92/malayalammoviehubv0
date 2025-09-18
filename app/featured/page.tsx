import MobileNav from "@/components/mobile-nav"
import DesktopNav from "@/components/desktop-nav"
import Link from "next/link"

export const metadata = {
  title: "Featured Short Film | Malayalam Movies Hub",
  description:
    "Watch our featured Malayalam short film - a showcase of exceptional storytelling and cinematic excellence.",
  openGraph: {
    title: "Featured Short Film",
    description: "Featured Malayalam short film - exceptional storytelling",
    images: ["/og-featured.png"],
  },
}

export default function FeaturedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/95 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Malayalam Movies Hub</span>
              </Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <DesktopNav />
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Short Film</h1>
            </div>

            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/QPdiI35EzsM?si=QRIEtH0SCAy51Ha4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">© 2024 Malayalam Movies Hub. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
