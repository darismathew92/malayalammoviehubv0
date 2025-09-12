"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Film } from "lucide-react"
import { Button } from "@/components/ui/button"

export const MovieCardSkeleton = React.memo(() => (
  <Card className="overflow-hidden animate-pulse">
    <CardHeader className="p-0">
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300" />
    </CardHeader>
    <CardContent className="p-3 md:p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded-md w-3/4" />
      <div className="h-3 bg-gray-200 rounded-md w-1/2" />
    </CardContent>
    <CardFooter className="p-3 md:p-4 pt-0">
      <div className="h-8 bg-gray-200 rounded-md w-full" />
    </CardFooter>
  </Card>
))

MovieCardSkeleton.displayName = "MovieCardSkeleton"

export const GridSkeleton = React.memo(({ count = 12 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
    {Array.from({ length: count }, (_, index) => (
      <MovieCardSkeleton key={index} />
    ))}
  </div>
))

GridSkeleton.displayName = "GridSkeleton"

interface EmptyStateProps {
  title: string
  description: string
  onRetry?: () => void
  icon?: React.ReactNode
}

export const EmptyState = React.memo(
  ({
    title,
    description,
    onRetry,
    icon = <Film className="mx-auto h-16 w-16 text-muted-foreground mb-4" />,
  }: EmptyStateProps) => (
    <div className="text-center py-16">
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  ),
)

EmptyState.displayName = "EmptyState"

interface ErrorStateProps {
  error: string
  onRetry?: () => void
}

export const ErrorState = React.memo(({ error, onRetry }: ErrorStateProps) => (
  <div className="bg-destructive/15 border border-destructive/20 text-destructive p-4 rounded-lg mb-6 mx-4 md:mx-0">
    <div className="flex items-center justify-between">
      <p className="text-sm md:text-base">{error}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="ml-4 border-destructive/20 hover:bg-destructive/10 bg-transparent"
        >
          Retry
        </Button>
      )}
    </div>
  </div>
))

ErrorState.displayName = "ErrorState"
