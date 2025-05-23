"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { calculatePerformanceDifference } from "@/lib/data"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { PerformanceOverlayProps } from "@/types/videos"

export default function PerformanceOverlay({
  videoRef,
  width,
  height,
  className,
  performanceData,
  comparisonData,
  showComparison = false,
}: PerformanceOverlayProps) {
  const [showControls, setShowControls] = useState(true)
  const [benchmarkData, setBenchmarkData] = useState<Record<string, number | string>>({})
  const [athleteComparisons, setAthleteComparisons] = useState<
    Record<
      string,
      {
        difference: number
        isImprovement: boolean
      }
    >
  >({})

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

  // Extract benchmark data (DFB-50) for comparison
  useEffect(() => {
    if (!performanceData || performanceData.length === 0) return

    const benchmarks: Record<string, number | string> = {}

    performanceData.forEach((data) => {
      if (data.name === "DFB-50") {
        benchmarks[data.uebung] = data.ergebnis
      }
    })

    setBenchmarkData(benchmarks)
  }, [performanceData])

  // Calculate comparisons between the two athletes
  useEffect(() => {
    if (!showComparison || !performanceData || !comparisonData) return

    const comparisons: Record<string, { difference: number; isImprovement: boolean }> = {}

    // Get athlete data (non-DFB data)
    const athleteData = performanceData.filter((data) => !data.name.startsWith("DFB"))
    const comparisonAthleteData = comparisonData.filter((data) => !data.name.startsWith("DFB"))

    // Create a map of exercise to result for the comparison athlete
    const comparisonMap: Record<string, number | string> = {}
    comparisonAthleteData.forEach((data) => {
      comparisonMap[data.uebung] = data.ergebnis
    })

    // Calculate differences for each exercise
    athleteData.forEach((data) => {
      if (comparisonMap[data.uebung] !== undefined) {
        const diffResult = calculatePerformanceDifference(data.ergebnis, comparisonMap[data.uebung], data.uebung)

        comparisons[data.uebung] = {
          difference: diffResult.percentDifference,
          isImprovement: diffResult.isImprovement,
        }
      }
    })

    setAthleteComparisons(comparisons)
  }, [performanceData, comparisonData, showComparison])

  // If no performance data, don't render anything
  if (!performanceData || performanceData.length === 0) {
    return null
  }

  // Get athlete names for display
  const athleteName = performanceData.find((data) => !data.name.startsWith("DFB"))?.name || "Athlete"
  const comparisonName = comparisonData?.find((data) => !data.name.startsWith("DFB"))?.name || "Comparison"

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {/* Performance Data Display */}
      <div className="absolute top-4 right-4">
        <div className="bg-base-1000/70 rounded px-3 py-2 backdrop-blur-sm max-w-xs">
          {/* Header with athlete names when in comparison mode */}
          {showComparison && comparisonData && (
            <div className="flex justify-between items-center mb-2 border-b border-base-100/20 pb-1">
              <span className="text-base-100 text-xs font-medium">{athleteName}</span>
              <span className="text-base-100/70 text-xs">vs</span>
              <span className="text-base-100 text-xs font-medium">{comparisonName}</span>
            </div>
          )}

          {performanceData.map((data, index) => {
            // Skip DFB benchmark data for the simplified view
            if (data.name.startsWith("DFB")) return null

            const result = typeof data.ergebnis === "string" ? data.ergebnis : data.ergebnis.toFixed(2)
            const unit = data.uebung.includes("Sprint") ? "s" : ""

            // Get comparison data if available
            const comparison = showComparison && athleteComparisons[data.uebung]

            // Get benchmark comparison if no direct comparison
            let benchmarkDiff = null
            let isBenchmarkImprovement = false

            if (!comparison && benchmarkData[data.uebung]) {
              const diffResult = calculatePerformanceDifference(data.ergebnis, benchmarkData[data.uebung], data.uebung)
              benchmarkDiff = diffResult.percentDifference
              isBenchmarkImprovement = diffResult.isImprovement
            }

            // Find the comparison athlete's result for this exercise
            const comparisonResult = comparisonData?.find(
              (item) => item.uebung === data.uebung && !item.name.startsWith("DFB"),
            )?.ergebnis

            return (
              <div key={index} className="flex items-center justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="text-base-100 text-xs font-medium mb-0.5">{data.uebung}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-amber-400 text-sm font-medium">{result}</span>
                    {unit && <span className="text-base-100/70 text-xs">{unit}</span>}
                  </div>
                </div>

                {/* Show comparison with other athlete if available */}
                {showComparison && comparisonResult !== undefined && (
                  <div className="flex flex-col items-end">
                    <span className="text-base-100/80 text-xs mb-0.5">
                      {typeof comparisonResult === "string" ? comparisonResult : comparisonResult.toFixed(2)}
                      {unit}
                    </span>

                    {comparison && (
                      <div
                        className={cn(
                          "flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium",
                          comparison.isImprovement ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400",
                        )}
                      >
                        {comparison.isImprovement ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        <span>{Math.abs(comparison.difference).toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Show benchmark comparison if no direct comparison */}
                {!showComparison && benchmarkDiff !== null && (
                  <div
                    className={cn(
                      "flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium",
                      isBenchmarkImprovement ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400",
                    )}
                  >
                    {isBenchmarkImprovement ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>{Math.abs(benchmarkDiff).toFixed(1)}%</span>
                  </div>
                )}
              </div>
            )
          })}

          {/* Footer with explanation */}
          <div className="mt-2 pt-1 border-t border-base-100/20 text-[10px] text-base-100/50">
            {showComparison ? `Comparing ${athleteName} to ${comparisonName}` : "Compared to DFB-50 benchmark"}
          </div>
        </div>
      </div>
    </div>
  )
}
