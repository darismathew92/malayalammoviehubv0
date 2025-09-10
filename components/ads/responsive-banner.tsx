"use client"

import { useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface ResponsiveBannerProps {
  id: string
  scriptSrc: string
  containerId?: string
  className?: string
}

export default function ResponsiveBanner({ id, scriptSrc, containerId, className = "" }: ResponsiveBannerProps) {
  const isMobile = useIsMobile()

  useEffect(() => {
    // Load the ad script dynamically
    const script = document.createElement("script")
    script.src = scriptSrc
    script.async = true
    script.setAttribute("data-cfasync", "false")
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [scriptSrc])

  return (
    <div
      className={`
      w-full flex justify-center items-center py-4
      ${isMobile ? "px-2" : "px-4"}
      ${className}
    `}
    >
      {containerId ? (
        <div
          id={containerId}
          className={`
            ${isMobile ? "max-w-[320px] min-h-[50px]" : "max-w-[468px] min-h-[60px]"}
            w-full flex justify-center items-center
            bg-gray-50 border border-gray-200 rounded-lg
          `}
        />
      ) : (
        <div
          className={`
            ${isMobile ? "max-w-[320px] min-h-[50px]" : "max-w-[468px] min-h-[60px]"}
            w-full flex justify-center items-center
            bg-gray-50 border border-gray-200 rounded-lg
          `}
        >
          <span className="text-xs text-gray-400">Advertisement</span>
        </div>
      )}
    </div>
  )
}
