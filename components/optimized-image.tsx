"use client"

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width = 300,
  height = 400,
  className = "",
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const optimizedSrc = src.includes("maxresdefault.jpg") ? src.replace("maxresdefault.jpg", "hqdefault.jpg") : src

  return (
    <div className={`relative ${className}`}>
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
      <Image
        src={hasError ? "/placeholder.svg" : optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
