"use client"

import type React from "react"

import Script from "next/script"
import "./globals.css"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* --- First ad block --- */}
        <Script id="ad-options" strategy="beforeInteractive">
          {`
            atOptions = {
              'key' : 'ee8acc4550c5b3434578cc8e693b1dc9',
              'format' : 'iframe',
              'height' : window.innerWidth < 768 ? 50 : 60,
              'width' : window.innerWidth < 768 ? 320 : 468,
              'params' : {}
            };
          `}
        </Script>
        <Script
          id="ad-script"
          src="//www.highperformanceformat.com/ee8acc4550c5b3434578cc8e693b1dc9/invoke.js"
          strategy="afterInteractive"
        />

        {/* --- New Banner Ad --- */}
        <div className="w-full flex justify-center py-4 bg-gray-50/50">
          <div
            id="container-4a1d554af74a536a78f81ec11493b477"
            className="max-w-[468px] w-full min-h-[60px] flex justify-center items-center border border-gray-200 rounded-lg bg-white"
          />
        </div>
        <Script
          id="new-banner-script"
          src="//pl26236383.revenuecpmgate.com/4a1d554af74a536a78f81ec11493b477/invoke.js"
          async
          data-cfasync="false"
          strategy="afterInteractive"
        />

        {/* --- Second ad block --- */}
        <div className="w-full flex justify-center py-2">
          <div
            id="container-second-ad"
            className="max-w-[468px] w-full min-h-[60px] flex justify-center items-center"
          />
        </div>

        {/* --- Third ad block (direct include) --- */}
        <Script
          id="third-ad-script"
          src="https://www.revenuecpmgate.com/yfu7frp41?key=1a7e2ea822949b8353d7917b83390165"
          async
          strategy="afterInteractive"
        />

        {/* --- Mobile-responsive CSS for ads --- */}
        <style jsx global>{`
          @media (max-width: 768px) {
            #container-4a1d554af74a536a78f81ec11493b477,
            #container-second-ad {
              max-width: 320px !important;
              min-height: 50px !important;
            }
          }
        `}</style>
      </body>
    </html>
  )
}
