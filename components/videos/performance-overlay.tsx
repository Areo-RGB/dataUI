"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { PerformanceOverlayProps } from "@/types/videos"

export default function PerformanceOverlay({
  videoRef,
  width,
  height,
  className,
  performanceData,
}: PerformanceOverlayProps) {
  const [showControls, setShowControls] = useState(true)

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const resetTimeout = () => {
      clearTimeout(timeout)
      setShowControls(true)

      timeout = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    resetTimeout()

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // If no performance data, don't render anything
  if (!performanceData || performanceData.length === 0) {
    return null
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {/* Performance Data Display */}
      <div className="absolute top-4 right-4">
        <div className="bg-black/70 rounded px-3 py-2 backdrop-blur-sm">
          {performanceData.map((data, index) => {
            // Skip DFB benchmark data for the simplified view
            if (data.name.startsWith("DFB")) return null

            const result = typeof data.ergebnis === "string" ? data.ergebnis : data.ergebnis.toFixed(2)
            const unit = data.uebung.includes("Sprint") ? "s" : ""

            return (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="text-white text-sm font-medium">{data.name}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-amber-400 text-sm font-medium">{result}</span>
                  {unit && <span className="text-white/70 text-xs">{unit}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
