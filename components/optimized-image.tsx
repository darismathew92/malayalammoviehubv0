"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
}

export function OptimizedImage({
  src,
  alt,
  width = 300,
  height = 400,
  className = "",
  priority = false,
  loading = "lazy",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getOptimizedSrc = useCallback(
    (originalSrc: string) => {
      if (originalSrc.includes("maxresdefault.jpg")) {
        return originalSrc.replace("maxresdefault.jpg", "hqdefault.jpg")
      }
      if (originalSrc.includes("placeholder.svg")) {
        return `${originalSrc}?height=${height}&width=${width}`
      }
      return originalSrc
    },
    [width, height],
  )

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)
  }, [])

  const optimizedSrc = getOptimizedSrc(src)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full animate-pulse" />}
      <Image
        src={hasError ? `/placeholder.svg?height=${height}&width=${width}&text=Image+Not+Found` : optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={loading}
        className={`object-cover transition-all duration-500 ease-out ${
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
  )
}
