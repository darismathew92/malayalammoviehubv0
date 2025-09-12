"use client"

import type React from "react"

interface ScreenReaderTextProps {
  children: React.ReactNode
  className?: string
}

export function ScreenReaderText({ children, className = "" }: ScreenReaderTextProps) {
  return <span className={`sr-only ${className}`}>{children}</span>
}

interface VisuallyHiddenProps {
  children: React.ReactNode
  focusable?: boolean
}

export function VisuallyHidden({ children, focusable = false }: VisuallyHiddenProps) {
  const className = focusable
    ? "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-2 focus:rounded focus:shadow-lg"
    : "sr-only"

  return <div className={className}>{children}</div>
}
