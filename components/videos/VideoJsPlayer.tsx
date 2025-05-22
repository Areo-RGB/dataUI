"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { X, Loader2, AlertCircle } from "lucide-react"

export interface VideoJsPlayerProps {
  src: string
  poster?: string
  className?: string
  onClose?: () => void
  isPlaying: boolean
}

const VideoJsPlayer: React.FC<VideoJsPlayerProps> = ({ src, poster, className, onClose, isPlaying }) => {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [videoJsLoaded, setVideoJsLoaded] = useState(false)
  const [fallbackMode, setFallbackMode] = useState(false)

  // Try to load video.js dynamically
  useEffect(() => {
    if (!isPlaying) return

    let isMounted = true
    const loadVideoJs = async () => {
      try {
        // Dynamic import of video.js
        const videoJsModule = await import("video.js")
        if (isMounted) {
          setVideoJsLoaded(true)
        }
      } catch (err) {
        console.error("Failed to load video.js:", err)
        if (isMounted) {
          setFallbackMode(true)
          setIsLoading(false)
        }
      }
    }

    loadVideoJs()

    return () => {
      isMounted = false
    }
  }, [isPlaying])

  // Initialize video.js if loaded successfully
  useEffect(() => {
    if (!isPlaying || !videoJsLoaded || !videoContainerRef.current) return

    let playerInstance: any = null

    const initializeVideoJs = async () => {
      try {
        const videojs = (await import("video.js")).default

        // Create video-js element
        const videoElement = document.createElement("video-js")
        videoElement.classList.add("vjs-fill")
        videoElement.classList.add("vjs-big-play-centered")
        videoContainerRef.current?.appendChild(videoElement)

        const playerOptions = {
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [{ src: src, type: determineVideoType(src) }],
          poster: poster,
        }

        playerInstance = videojs(videoElement, playerOptions, function onPlayerReady() {
          console.log("Video.js Player is ready.")
          setIsLoading(false)

          this.on("ended", () => {
            console.log("Video ended")
            if (onClose) {
              onClose()
            }
          })

          this.on("error", () => {
            const errorMsg = this.error()?.message || "Unknown video error"
            console.error("Video.js Player Error:", errorMsg)
            setError(`Failed to load video. ${errorMsg}`)
            setIsLoading(false)
            setFallbackMode(true) // Switch to fallback mode on error
          })

          this.play().catch((playError: any) => {
            console.warn("Autoplay was prevented:", playError)
            setIsLoading(false)
          })
        })
      } catch (err) {
        console.error("Error initializing video.js:", err)
        setFallbackMode(true)
        setIsLoading(false)
      }
    }

    initializeVideoJs()

    return () => {
      if (playerInstance && typeof playerInstance.dispose === "function") {
        playerInstance.dispose()
      }
      if (videoContainerRef.current) {
        videoContainerRef.current.innerHTML = ""
      }
    }
  }, [isPlaying, videoJsLoaded, src, poster, onClose])

  // Fallback native video player implementation
  useEffect(() => {
    if (!isPlaying || !fallbackMode || !videoRef.current) return

    const video = videoRef.current

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handleError = () => {
      setError("Failed to load video. Please try again later.")
      setIsLoading(false)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    // Try to play the video
    video.play().catch((err) => {
      console.warn("Autoplay prevented in fallback mode:", err)
      setIsLoading(false)
    })

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
      video.pause()
      video.src = ""
    }
  }, [isPlaying, fallbackMode])

  // Helper to guess video type
  const determineVideoType = (url: string): string => {
    if (url.endsWith(".mp4")) return "video/mp4"
    if (url.endsWith(".webm")) return "video/webm"
    if (url.endsWith(".m3u8")) return "application/x-mpegURL"
    return "video/mp4"
  }

  if (!isPlaying) {
    return null
  }

  return (
    <div
      className={cn(
        "absolute inset-0 bg-background/90 flex items-center justify-center z-20 p-2 rounded-xl overflow-hidden", // bg-black/90 -> bg-background/90
        className,
      )}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1.5 bg-background/60 text-primary-foreground rounded-full hover:bg-background/80 transition-colors z-30" // bg-black/60 -> bg-background/60, text-white -> text-primary-foreground, hover:bg-black/80 -> hover:bg-background/80
        aria-label="Close video"
      >
        <X size={20} />
      </button>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground z-10"> {/* text-white -> text-primary-foreground */}
          <Loader2 className="w-10 h-10 animate-spin mb-3" />
          <p className="text-sm">Loading video...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-primary-foreground p-4 z-10"> {/* text-white -> text-primary-foreground */}
          <AlertCircle className="w-12 h-12 text-destructive mb-3" /> {/* text-red-500 -> text-destructive */}
          <p className="mb-4 text-sm font-medium">Could not load video</p>
          <p className="text-xs text-primary-foreground/80 max-w-xs">{error}</p> {/* text-gray-300 -> text-primary-foreground/80 */}
        </div>
      )}

      {/* Container for video.js - only shown when not in fallback mode */}
      {!fallbackMode && (
        <div
          ref={videoContainerRef}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            isLoading || error ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
          data-vjs-player
        />
      )}

      {/* Fallback native video player */}
      {fallbackMode && (
        <div className="w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            playsInline
            className={cn("max-w-full max-h-full rounded", isLoading ? "opacity-0" : "opacity-100")}
          />
        </div>
      )}
    </div>
  )
}

export default VideoJsPlayer
