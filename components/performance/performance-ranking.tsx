"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Film, X, Info, ChevronDown, ChevronUp } from "lucide-react"
import type { PerformanceRankingProps } from "@/types/performance"
import type { ButtonVideoMapping } from "@/types/videos"
import {
  getVideoMappingsForExercise,
  estimatePlayerPercentile,
  getPerformanceCategory,
  getGradientColor,
  getGradientTextColor,
} from "@/lib/data"

/**
 * PerformanceRanking component displays a ranking of performance data
 * and provides video playback functionality for associated videos.
 */
export default function PerformanceRanking({
  title,
  displayTitle,
  data,
  className,
  unit = "s",
  sortAscending = true,
}: PerformanceRankingProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | undefined>(undefined)
  const [showCategoryLegend, setShowCategoryLegend] = useState(false)

  // Get video mappings for this exercise using the title prop as the key
  const videoMappings: ButtonVideoMapping[] = useMemo(() => getVideoMappingsForExercise(title), [title])

  // Handle playing a video
  const handlePlayVideo = (videoUrl: string | undefined) => {
    if (videoUrl) {
      setCurrentVideoUrl(videoUrl)
      setIsPlayingVideo(true)
    }
  }

  // Handle closing the video
  const handleCloseVideo = () => {
    setIsPlayingVideo(false)
    setCurrentVideoUrl(undefined)
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
        "bg-card rounded-xl border border-border",
        "shadow-md",
        "relative",
        "overflow-hidden",
        className,
      )}
    >
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/5 to-transparent -z-10 rounded-bl-full"></div>

      {/* Video Player Overlay */}
      {isPlayingVideo && currentVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              src={currentVideoUrl}
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg shadow-xl border border-white/10"
              onEnded={handleCloseVideo}
            />
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-card-foreground flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-chart-2 mr-2"></span>
            {displayTitle || title}
          </h2>
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
              onClick={() => setShowCategoryLegend(!showCategoryLegend)}
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
            if (!isBenchmark) {
              if (percentile < 31) borderColorClass = "border-red-600/60"
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
                    <h3 className="text-xs font-medium text-card-foreground">
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

      {/* Video Buttons */}
      <div className="p-3 border-t border-border bg-gradient-to-b from-transparent to-muted/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {videoMappings.map((mapping) => {
            const hasVideo = !!mapping.videoUrl
            const buttonLabel = mapping.label || "Video"

            return (
              <button
                key={mapping.videoUrl || mapping.label}
                type="button"
                aria-label={`Play video for ${buttonLabel}`}
                className={cn(
                  "w-full flex items-center justify-center",
                  "text-xs font-medium",
                  "rounded-md px-2.5 py-2",
                  "transition-all duration-200",
                  hasVideo
                    ? "bg-muted text-card-foreground hover:bg-muted/80 hover:shadow-sm"
                    : "bg-muted/50 text-muted-foreground cursor-not-allowed",
                )}
                onClick={() => hasVideo && handlePlayVideo(mapping.videoUrl)}
                disabled={!hasVideo}
              >
                <Film className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                <span>{buttonLabel}</span>
              </button>
            )
          })}

          {/* Empty placeholders for grid layout */}
          {Array.from({ length: Math.max(0, 3 - videoMappings.length) }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="w-full h-[36px] rounded-md bg-muted/30"
              aria-hidden="true"
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
