"use client"

import { useState, useCallback } from "react"
import type { GridState, GridActions } from "@/lib/types"

export function useGridState<T>(): GridState<T> & GridActions<T> {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)

  const handleSetItems = useCallback((newItems: T[]) => {
    setItems(newItems)
  }, [])

  const handleSetLoading = useCallback((isLoading: boolean) => {
    setLoading(isLoading)
  }, [])

  const handleSetError = useCallback((errorMessage: string | null) => {
    setError(errorMessage)
  }, [])

  const handleSetSelectedItem = useCallback((item: T | null) => {
    setSelectedItem(item)
  }, [])

  return {
    items,
    loading,
    error,
    selectedItem,
    setItems: handleSetItems,
    setLoading: handleSetLoading,
    setError: handleSetError,
    setSelectedItem: handleSetSelectedItem,
  }
}
