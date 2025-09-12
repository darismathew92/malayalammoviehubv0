"use client"

import type React from "react"

import { useEffect } from "react"

export function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration)
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError)
          })
      })
    }

    // Handle online/offline status
    const handleOnline = () => {
      console.log("App is online")
      // You can show a toast or update UI here
    }

    const handleOffline = () => {
      console.log("App is offline")
      // You can show an offline indicator here
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return <>{children}</>
}
