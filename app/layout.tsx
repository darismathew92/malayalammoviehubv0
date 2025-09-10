import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malayalam Movie Hub",
  description: "Designed by Daris Mathew",
  generator: "darismathew",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
              'height' : 60,
              'width' : 468,
              'params' : {}
            };
          `}
        </Script>
        <Script
          id="ad-script"
          src="//www.highperformanceformat.com/ee8acc4550c5b3434578cc8e693b1dc9/invoke.js"
          strategy="afterInteractive"
        />

        {/* --- Second ad block --- */}
        <div id="container-4a1d554af74a536a78f81ec11493b477"></div>
        <Script
          id="second-ad-script"
          src="//pl26236383.revenuecpmgate.com/4a1d554af74a536a78f81ec11493b477/invoke.js"
          async
          strategy="afterInteractive"
        />

        {/* --- Third ad block (direct include) --- */}
        <Script
          id="third-ad-script"
          src="https://www.revenuecpmgate.com/yfu7frp41?key=1a7e2ea822949b8353d7917b83390165"
          async
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
