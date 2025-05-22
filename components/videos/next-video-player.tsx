"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Video from "next-video"
import { Play, Pause, Volume2, VolumeX, Settings, Maximize, Minimize, SkipBack, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"

// Helper function to check if a URL is a Mux stream
const isMuxStream = (url: string): boolean => {
  return typeof url === "string" && (url.includes("stream.mux.com") || url.includes(".m3u8"))
}

export interface NextVideoPlayerProps {
  src: string | any // Accepts both string URLs and imported video assets
  title?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  poster?: string
  thumbnailTime?: number
  startTime?: number
  onTimeUpdate?: (currentTime: number) => void
  onEnded?: () => void
  onPlay?: () => void
  onPause?: () => void
}

export default function NextVideoPlayer({
  src,
  title,
  className,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  poster,
  thumbnailTime,
  startTime,
  onTimeUpdate,
  onEnded,
  onPlay,
  onPause,
}: NextVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const resetTimeout = () => {
      clearTimeout(timeout)
      setShowControls(true)

      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", resetTimeout)
      container.addEventListener("mouseenter", resetTimeout)
      container.addEventListener("mouseleave", () => {
        if (isPlaying) {
          setShowControls(false)
        }
      })
    }

    resetTimeout()

    return () => {
      clearTimeout(timeout)
      if (container) {
        container.removeEventListener("mousemove", resetTimeout)
        container.removeEventListener("mouseenter", resetTimeout)
        container.removeEventListener("mouseleave", () => {
          if (isPlaying) {
            setShowControls(false)
          }
        })
      }
    }
  }, [isPlaying])

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds))
    }
  }

  // Handle video events
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    setCurrentTime(video.currentTime)
    if (onTimeUpdate) {
      onTimeUpdate(video.currentTime)
    }
  }

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    setDuration(video.duration)

    // Store the video ref for direct access
    videoRef.current = video
  }

  const handlePlay = () => {
    setIsPlaying(true)
    if (onPlay) onPlay()
  }

  const handlePause = () => {
    setIsPlaying(false)
    if (onPause) onPause()
  }

  const handleEnded = () => {
    setIsPlaying(false)
    if (onEnded) onEnded()
  }

  // Seek control
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = Number.parseFloat(e.target.value)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative group overflow-hidden rounded-xl bg-black",
        isFullscreen ? "fixed inset-0 z-50" : "w-full aspect-video",
        className,
      )}
      onDoubleClick={toggleFullscreen}
    >
      {isMuxStream(typeof src === "string" ? src : "") ? (
        // For Mux streams, use a standard video element with HLS source
        <video
          ref={videoRef}
          src={typeof src === "string" ? src : ""}
          poster={poster}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          playsInline
          onClick={() => (videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause())}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          className="w-full h-full object-contain"
        />
      ) : (
        // For next-video assets, use the Video component
        <Video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          controls={false} // We'll use our custom controls
          startTime={startTime}
          thumbnailTime={thumbnailTime}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          className="w-full h-full object-contain"
        />
      )}

      {/* Video Title */}
      {title && showControls && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-background/70 to-transparent"> {/* from-black/70 -> from-background/70 */}
          <h3 className="text-primary-foreground font-medium truncate">{title}</h3> {/* text-white -> text-primary-foreground */}
        </div>
      )}

      {/* Custom Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/70 to-transparent p-4 transition-opacity duration-300", // from-black/70 -> from-background/70
          showControls ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        {/* Progress Bar */}
        <div className="flex items-center mb-2">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 rounded-full bg-muted appearance-none cursor-pointer" // bg-zinc-600 -> bg-muted
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--chart-5)) ${(currentTime / (duration || 1)) * 100}%, hsl(var(--muted)) ${ // #f59e0b -> hsl(var(--chart-5)), #52525b -> hsl(var(--muted))
                (currentTime / (duration || 1)) * 100
              }%)`,
            }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Play/Pause */}
            <button
              onClick={() => (videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause())}
              className="text-primary-foreground hover:text-chart-5 transition-colors" // text-white -> text-primary-foreground, hover:text-amber-400 -> hover:text-chart-5
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Skip Backward */}
            <button
              onClick={() => skip(-10)}
              className="text-primary-foreground hover:text-chart-5 transition-colors" // text-white -> text-primary-foreground, hover:text-amber-400 -> hover:text-chart-5
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => skip(10)}
              className="text-primary-foreground hover:text-chart-5 transition-colors" // text-white -> text-primary-foreground, hover:text-amber-400 -> hover:text-chart-5
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Volume */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !isMuted
                  setIsMuted(!isMuted)
                }
              }}
              className="text-primary-foreground hover:text-chart-5 transition-colors" // text-white -> text-primary-foreground, hover:text-amber-400 -> hover:text-chart-5
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Time Display */}
            <div className="text-primary-foreground text-xs"> {/* text-white -> text-primary-foreground */}
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Settings Button */}
            <button className="text-primary-foreground hover:text-chart-5 transition-colors" aria-label="Settings"> {/* text-white -> text-primary-foreground, hover:text-amber-400 -> hover:text-chart-5 */}
              <Settings className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="text-primary-foreground hover:text-chart-5 transition-colors" // text-white -> text-primary-foreground, hover:text-amber-400 -> hover:text-chart-5
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
