"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Info, ChevronDown, ChevronUp, X, MinusSquare, PlusSquare } from "lucide-react"
import type { PerformanceRankingProps } from "@/types/performance"
import { estimatePlayerPercentile, getPerformanceCategory, getGradientColor, getGradientTextColor } from "@/lib/data"

/**
 * PerformanceRanking component displays a ranking of performance data.
 * Tapping the card toggles between rankings and an image view.
 */
export default function PerformanceRanking({
  title,
  displayTitle,
  data,
  className,
  unit = "s",
  sortAscending = true,
  initialCollapsed = false,
}: PerformanceRankingProps) {
  const [showCategoryLegend, setShowCategoryLegend] = useState(false)
  const [isShowingImage, setIsShowingImage] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed)

  // Update collapsed state if prop changes
  useEffect(() => {
    setIsCollapsed(initialCollapsed)
  }, [initialCollapsed])

  // Toggle image display when card is clicked
  const toggleImageDisplay = () => {
    if (!isCollapsed) {
      setIsShowingImage(!isShowingImage)
    }
  }

  // Toggle collapse state
  const toggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCollapsed(!isCollapsed)
    if (isShowingImage) {
      setIsShowingImage(false)
    }
  }

  // Sort data based on result
  const sortedData = [...data].sort((a, b) => {
    const aResult = typeof a.ergebnis === "string" ? Number.parseFloat(a.ergebnis) : a.ergebnis
    const bResult = typeof b.ergebnis === "string" ? Number.parseFloat(b.ergebnis) : b.ergebnis
    return sortAscending ? aResult - bResult : bResult - aResult
  })

  // Generate gradient legend items with performance categories
  const gradientLegendItems = [
    { category: "unterdurchschnittlich", color: "bg-red-600/60", percentileRange: "3-30%" },
    { category: "durchschnittlich", color: "bg-orange-500/60", percentileRange: "31-70%" },
    { category: "gut", color: "bg-yellow-500/60", percentileRange: "71-80%" },
    { category: "sehr gut", color: "bg-green-500/60", percentileRange: "81-90%" },
    { category: "ausgezeichnet", color: "bg-green-600/60", percentileRange: "91-97%" },
  ]

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "card-enhanced",
        "relative",
        "overflow-hidden",
        "transition-all duration-300",
        isCollapsed ? "cursor-pointer" : "cursor-default",
        className,
      )}
      onClick={isCollapsed ? toggleCollapse : undefined}
    >
      {/* Background Gradient - only shown when not displaying image */}
      {!isShowingImage && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/5 to-transparent -z-10 rounded-bl-full"></div>
      )}

      {/* Header with collapse toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <h2 className="text-sm font-semibold text-card-foreground flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-chart-2 mr-2"></span>
          {displayTitle || title}
        </h2>
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleImageDisplay()
              }}
              className="p-1 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground"
              aria-label={isShowingImage ? "Show rankings" : "Show technique image"}
            >
              {isShowingImage ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground"
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? "Expand card" : "Collapse card"}
          >
            {isCollapsed ? <PlusSquare className="w-4 h-4" /> : <MinusSquare className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Conditional rendering based on collapse state */}
      {!isCollapsed && (
        <>
          {/* Conditional rendering based on image display state */}
          {isShowingImage ? (
            <div className="relative w-full h-full min-h-[300px] animate-in fade-in duration-300">
              {/* Image that fills the entire card */}
              <Image
                src={`/abstract-geometric-shapes.png?height=400&width=600&query=${encodeURIComponent(`${title} performance technique`)}`}
                alt={`${title} performance technique`}
                fill
                className="object-cover"
              />

              {/* Image caption overlay at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-base-1000/70 to-transparent z-10">
                <p className="text-base-100 text-sm font-medium">{title} Technique Demonstration</p>
                <p className="text-base-100/80 text-xs mt-1">Tap icon to view rankings</p>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap items-center gap-2 gap-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full border-2 border-muted-foreground"></div>
                    <span className="text-xs text-muted-foreground">Benchmark</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full border-2 border-chart-2"></div>
                    <span className="text-xs text-muted-foreground">Player</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowCategoryLegend(!showCategoryLegend)
                    }}
                    className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Info className="w-3 h-3" />
                    {showCategoryLegend ? "Hide" : "Show"}
                    {showCategoryLegend ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Gradient Legend */}
              {showCategoryLegend && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg text-xs border border-border/50 animate-in slide-in-from-top duration-300">
                  <div className="font-medium mb-2 text-card-foreground">Leistungskategorien:</div>
                  <div className="flex items-center mb-3">
                    <div className="h-4 flex-1 bg-gradient-to-r from-red-600/60 via-orange-500/60 to-green-600/60 rounded-sm"></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2">
                    {gradientLegendItems.map((item) => (
                      <div key={item.category} className="flex items-center gap-2">
                        <div className={`w-2 h-4 rounded-sm ${item.color}`}></div>
                        <span className="text-muted-foreground">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Data List */}
              <div className="space-y-2">
                {sortedData.map((item, index) => {
                  const isBenchmark = item.name.startsWith("DFB")
                  const percentile = isBenchmark
                    ? Number.parseInt(item.name.split("-")[1] || "0", 10)
                    : estimatePlayerPercentile(item.ergebnis, title)

                  // Get category for display
                  const category = getPerformanceCategory(percentile)

                  // Get gradient colors
                  const indicatorColor = getGradientColor(percentile)
                  const textColor = getGradientTextColor(percentile)

                  // Determine border color based on percentile
                  let borderColorClass = "border-muted-foreground/40"
                  if (!isBenchmark && percentile !== null) {
                    if (percentile < 31) borderColorClass = "border-destructive/60"
                    else if (percentile < 71) borderColorClass = "border-orange-500/60"
                    else if (percentile < 81) borderColorClass = "border-yellow-500/60"
                    else if (percentile < 91) borderColorClass = "border-green-500/60"
                    else borderColorClass = "border-green-600/60"
                  }

                  return (
                    <div
                      key={`${item.name}-${index}`}
                      className={cn(
                        "group flex items-center gap-3",
                        "p-2.5 rounded-lg",
                        "hover:bg-muted/50",
                        "transition-all duration-200",
                        "relative",
                        index === 0 ? "bg-muted/30" : "",
                      )}
                    >
                      {/* Gradient Indicator - only for player entries */}
                      {!isBenchmark && (
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 ${indicatorColor} rounded-l-lg`}
                          title={`${percentile}% - ${category}`}
                        ></div>
                      )}

                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full",
                          "border-2",
                          borderColorClass,
                          isBenchmark ? "bg-muted/50 text-muted-foreground" : "bg-muted text-card-foreground",
                          "text-sm font-semibold",
                          "transition-transform duration-200 group-hover:scale-105",
                        )}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <div className="space-y-0.5">
                          <h3 className="text-xs font-medium text-card-foreground font-display">
                            {item.name}
                            {isBenchmark && percentile && (
                              <span className="ml-1 text-[10px] text-muted-foreground">(P{percentile})</span>
                            )}
                            {!isBenchmark && percentile && (
                              <span className={`ml-1 text-[10px] ${textColor}`}>
                                (P{percentile} - {category})
                              </span>
                            )}
                          </h3>
                          <p className="text-[11px] text-muted-foreground">
                            {isBenchmark ? "DFB Benchmark" : item.kategorie}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 pl-3">
                          <span className={`text-xs font-medium ${!isBenchmark ? textColor : "text-card-foreground"}`}>
                            {item.ergebnis}
                            {unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Message shown when collapsed */}
      {isCollapsed && (
        <div className="py-3 text-center text-xs text-muted-foreground">
          Click to view {displayTitle || title}
        </div>
      )}
    </div>
  )
}
