"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Film } from "lucide-react"
import type { PerformanceRankingProps } from "@/types/performance"
import type { ButtonVideoMapping } from "@/types/videos"
import {
  getVideoMappingsForExercise,
  estimatePlayerPercentile,
  getPerformanceCategory,
  getGradientColor,
  getGradientTextColor,
} from "@/lib/data"
import VideoJsPlayer from "@/components/videos/VideoJsPlayer"

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
  // This is memoized to prevent unnecessary recalculations
  const videoMappings: ButtonVideoMapping[] = useMemo(
    () => getVideoMappingsForExercise(title),
    [title], // Re-run only if title changes
  )

  /**
   * Handles playing a video when a button is clicked
   * @param videoUrl The URL of the video to play
   */
  const handlePlayVideo = (videoUrl: string | undefined) => {
    if (videoUrl) {
      setCurrentVideoUrl(videoUrl)
      setIsPlayingVideo(true)
    } else {
      // Log a warning if the URL is missing when the button is clicked
      console.warn(`Attempted to play video but URL was undefined for exercise key: ${title}`)
      // Note: Visual error handling for video load/playback failures is handled within VideoJsPlayer
    }
  }

  const handleCloseVideo = () => {
    setIsPlayingVideo(false)
  }

  // Sort data based on result
  const sortedData = [...data].sort((a, b) => {
    const aResult = typeof a.ergebnis === "string" ? Number.parseFloat(a.ergebnis) : a.ergebnis
    const bResult = typeof b.ergebnis === "string" ? Number.parseFloat(b.ergebnis) : b.ergebnis
    return sortAscending ? aResult - bResult : bResult - aResult
  })

  // Generate gradient legend items with performance categories from the reference table
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
        className,
      )}
    >
      {/* Conditionally render the VideoJsPlayer overlay */}
      {isPlayingVideo && currentVideoUrl && (
        <VideoJsPlayer
          src={currentVideoUrl}
          isPlaying={isPlayingVideo} // Pass the playing state
          onClose={handleCloseVideo} // Pass the close handler
          // poster="/placeholder-poster.jpg" // Optional: Add poster if available
          className="rounded-xl" // Apply rounded corners to the overlay container
        />
      )}

      {/* Original Card Content - RENDERED UNCONDITIONALLY */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          {/* Use displayTitle if available, otherwise fall back to title */}
          <h2 className="text-sm font-semibold text-card-foreground">{displayTitle || title}</h2>
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
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {showCategoryLegend ? "Hide" : "Show"} Gradient
            </button>
          </div>
        </div>

        {/* Gradient Legend with performance categories */}
        {showCategoryLegend && (
          <div className="mb-3 p-2 bg-muted rounded-lg text-xs">
            <div className="font-medium mb-1 text-card-foreground">Leistungskategorien:</div>
            <div className="flex items-center mb-2">
              <div className="h-4 flex-1 bg-gradient-to-r from-red-600/60 via-orange-500/60 to-green-600/60 rounded-sm"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-1">
              {gradientLegendItems.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div className={`w-2 h-4 rounded-sm ${item.color}`}></div>
                  <span className="text-muted-foreground">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-1">
          {sortedData.map((item, index) => {
            const isBenchmark = item.name.startsWith("DFB")
            const percentile = isBenchmark
              ? Number.parseInt(item.name.split("-")[1] || "0", 10)
              : estimatePlayerPercentile(item.ergebnis, title)

            // Get category for display
            const category = getPerformanceCategory(percentile)

            // Get gradient colors (now more muted)
            const indicatorColor = getGradientColor(percentile)
            const textColor = getGradientTextColor(percentile)

            return (
              <div
                key={`${item.name}-${index}`}
                className={cn(
                  "group flex items-center gap-3",
                  "p-2 rounded-lg",
                  "hover:bg-muted/50",
                  "transition-all duration-200",
                  "relative", // Added for absolute positioning of category indicator
                )}
              >
                {/* Gradient Indicator with muted colors */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${indicatorColor} rounded-l-lg`}
                  title={`${percentile}% - ${category}`}
                ></div>

                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    "border-2",
                    isBenchmark ? "border-muted-foreground" : "border-chart-2",
                    "text-sm font-semibold",
                    "bg-muted text-card-foreground",
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

      {/* Video buttons section - dynamically generated based on available mappings */}
      <div className="p-2 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {videoMappings.map((mapping) => {
            const hasVideo = !!mapping.videoUrl
            const buttonLabel = mapping.label || "Video"
            const accessibilityLabel = `Play video for ${buttonLabel} in ${displayTitle || title} exercise`

            return (
              <button
                key={mapping.videoUrl || mapping.label} // Use URL or label as key
                type="button"
                aria-label={accessibilityLabel} // Added aria-label for accessibility
                className={cn(
                  "w-full flex items-center justify-center",
                  "text-xs font-medium",
                  "rounded-md px-2 py-1.5",
                  hasVideo
                    ? "bg-muted text-card-foreground hover:bg-muted/80"
                    : "bg-muted/50 text-muted-foreground cursor-not-allowed",
                )}
                onClick={() => hasVideo && handlePlayVideo(mapping.videoUrl)} // Pass URL directly
                disabled={!hasVideo}
              >
                <Film className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" /> {/* Hide icon from screen reader */}
                <span>{buttonLabel}</span>
              </button>
            )
          })}
          {/* Render empty placeholders if less than 3 videos to maintain grid layout */}
          {Array.from({ length: Math.max(0, 3 - videoMappings.length) }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="w-full h-[31px] rounded-md bg-muted/30"
              aria-hidden="true"
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
