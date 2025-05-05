"use client"

import { useState, useMemo } from "react" // Added useMemo
import { cn } from "@/lib/utils"
import { Film } from "lucide-react"
import type { PerformanceRankingProps } from "@/types/performance"
import type { ButtonVideoMapping } from "@/types/videos" // Added ButtonVideoMapping type
import { InCardVideoPlayer } from "@/components/videos/in-card-video-player"
import { getVideoMappingsForExercise } from "@/lib/data" // Only import what we need

/**
 * PerformanceRanking component displays a ranking of performance data
 * and provides video playback functionality for associated videos.
 */
export default function PerformanceRanking({
  title, // Key used for data lookup
  displayTitle, // Optional display title for the UI
  data,
  className,
  unit = "s",
  sortAscending = true,
}: PerformanceRankingProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | undefined>(undefined)

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
      // Note: Visual error handling for video load/playback failures is handled within InCardVideoPlayer
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

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        "relative", // Added for video positioning
        className,
      )}
    >
      <InCardVideoPlayer videoUrl={currentVideoUrl || ""} isPlaying={isPlayingVideo} onClose={handleCloseVideo} />
      {!isPlayingVideo && (
        <>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              {/* Use displayTitle if available, otherwise fall back to title */}
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{displayTitle || title}</h2>
              <div className="flex flex-wrap items-center gap-2 gap-y-1">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full border-2 border-blue-300 dark:border-blue-700/60"></div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Benchmark</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full border-2 border-amber-300 dark:border-amber-700/60"></div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Player</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {sortedData.map((item, index) => {
                const isBenchmark = item.name.startsWith("DFB")
                const percentile = isBenchmark ? item.name.split("-")[1] : null

                return (
                  <div
                    key={`${item.name}-${index}`}
                    className={cn(
                      "group flex items-center gap-3",
                      "p-2 rounded-lg",
                      "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                      "transition-all duration-200",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full",
                        "border-2",
                        isBenchmark
                          ? "border-blue-300 dark:border-blue-700/60"
                          : "border-amber-300 dark:border-amber-700/60",
                        "text-sm font-semibold",
                        "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
                      )}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <div className="space-y-0.5">
                        <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                          {item.name}
                          {isBenchmark && percentile && (
                            <span className="ml-1 text-[10px] text-zinc-500 dark:text-zinc-400">(P{percentile})</span>
                          )}
                        </h3>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                          {isBenchmark ? "DFB Benchmark" : item.kategorie}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 pl-3">
                        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
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
          <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="grid grid-cols-3 gap-2">
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
                        ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
                        : "bg-zinc-100/50 text-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-500 cursor-not-allowed",
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
                  className="w-full h-[31px] rounded-md bg-zinc-100/30 dark:bg-zinc-800/30"
                  aria-hidden="true"
                ></div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
