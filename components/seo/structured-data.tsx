"use client"

import Script from "next/script"

interface MovieStructuredDataProps {
  movies: Array<{
    title: string
    year: string
    genre?: string[]
    director?: string
    actors?: string[]
    rating?: string
    poster?: string
    platform?: string
  }>
}

export function MovieCollectionStructuredData({ movies }: MovieStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Malayalam Movies Collection",
    description: "Latest Malayalam movies available on OTT platforms",
    numberOfItems: movies.length,
    itemListElement: movies.map((movie, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Movie",
        name: movie.title,
        dateCreated: movie.year,
        genre: movie.genre || ["Drama"],
        director: movie.director
          ? {
              "@type": "Person",
              name: movie.director,
            }
          : undefined,
        actor: movie.actors?.map((actor) => ({
          "@type": "Person",
          name: actor,
        })),
        aggregateRating: movie.rating
          ? {
              "@type": "AggregateRating",
              ratingValue: movie.rating,
              bestRating: "10",
              worstRating: "1",
            }
          : undefined,
        image: movie.poster,
        inLanguage: "ml",
        countryOfOrigin: "IN",
      },
    })),
  }

  return (
    <Script
      id="movie-collection-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

interface WebPageStructuredDataProps {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}

export function WebPageStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: WebPageStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    inLanguage: "en-US",
    isPartOf: {
      "@id": "https://malayalammovieshub.com/#website",
    },
    about: {
      "@type": "Thing",
      name: "Malayalam Cinema",
    },
    mainEntity: {
      "@type": "Thing",
      name: "Malayalam Movies",
    },
  }

  return (
    <Script
      id="webpage-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
