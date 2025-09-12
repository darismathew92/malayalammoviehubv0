"use client"

import React from "react"
import type { BaseMovie } from "@/lib/types"
import { GridSkeleton, EmptyState, ErrorState } from "@/components/shared/loading-states"

interface BaseMovieGridProps<T extends BaseMovie> {
  items: T[]
  loading: boolean
  error: string | null
  renderCard: (item: T) => React.ReactNode
  emptyTitle?: string
  emptyDescription?: string
  onRetry?: () => void
  gridClassName?: string
  skeletonCount?: number
}

export function BaseMovieGrid<T extends BaseMovie>({
  items,
  loading,
  error,
  renderCard,
  emptyTitle = "No movies found",
  emptyDescription = "Unable to load movie data at this time",
  onRetry,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8",
  skeletonCount = 12,
}: BaseMovieGridProps<T>) {
  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />
  }

  if (loading) {
    return <GridSkeleton count={skeletonCount} />
  }

  if (items.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} onRetry={onRetry} />
  }

  return (
    <div className={gridClassName}>
      {items.map((item) => (
        <React.Fragment key={item.id}>{renderCard(item)}</React.Fragment>
      ))}
    </div>
  )
}
