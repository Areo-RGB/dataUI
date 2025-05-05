"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Maximize,
  Minimize,
  LinkIcon,
  Link2Off,
  ArrowLeftRight,
} from "lucide-react"
import type { VideoComparisonProps } from "@/types/videos"

export default function VideoComparison({
  leftVideo,
  rightVideo,
  className,
  initialSyncState = true,
}: VideoComparisonProps) {
  const leftVideoRef = useRef<HTMLVideoElement>(null)
  const rightVideoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isSynced, setIsSynced] = useState(initialSyncState)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSwapped, setIsSwapped] = useState(false)

  // Initialize videos
  useEffect(() => {
    const leftVideo = leftVideoRef.current
    const rightVideo = rightVideoRef.current
    if (!leftVideo || !rightVideo) return

    const handleLoadedMetadata = () => {
      // Use the shorter video's duration
      if (leftVideo.duration && rightVideo.duration) {
        setDuration(Math.min(leftVideo.duration, rightVideo.duration))
      }
    }

    const handleTimeUpdate = () => {
      // Only update from the left video to avoid loops
      if (leftVideo) {
        setCurrentTime(leftVideo.currentTime)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    leftVideo.addEventListener("loadedmetadata", handleLoadedMetadata)
    rightVideo.addEventListener("loadedmetadata", handleLoadedMetadata)
    leftVideo.addEventListener("timeupdate", handleTimeUpdate)
    leftVideo.addEventListener("ended", handleEnded)
    rightVideo.addEventListener("ended", handleEnded)

    return () => {
      leftVideo.removeEventListener("loadedmetadata", handleLoadedMetadata)
      rightVideo.removeEventListener("loadedmetadata", handleLoadedMetadata)
      leftVideo.removeEventListener("timeupdate", handleTimeUpdate)
      leftVideo.removeEventListener("ended", handleEnded)
      rightVideo.removeEventListener("ended", handleEnded)
    }
  }, [isSwapped])

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

  // Sync videos if enabled
  useEffect(() => {
    if (!isSynced) return

    const leftVideo = leftVideoRef.current
    const rightVideo = rightVideoRef.current
    if (!leftVideo || !rightVideo) return

    const syncVideos = () => {
      if (Math.abs(leftVideo.currentTime - rightVideo.currentTime) > 0.1) {
        rightVideo.currentTime = leftVideo.currentTime
      }
    }

    leftVideo.addEventListener("timeupdate", syncVideos)
    return () => {
      leftVideo.removeEventListener("timeupdate", syncVideos)
    }
  }, [isSynced])

  // Play/pause both videos
  const togglePlay = () => {
    const leftVideo = leftVideoRef.current
    const rightVideo = rightVideoRef.current
    if (!leftVideo || !rightVideo) return

    if (isPlaying) {
      leftVideo.pause()
      rightVideo.pause()
    } else {
      Promise.all([leftVideo.play(), rightVideo.play()]).catch((error) => {
        console.error("Error playing videos:", error)
      })
    }
    setIsPlaying(!isPlaying)
  }

  // Toggle sync between videos
  const toggleSync = () => {
    setIsSynced(!isSynced)

    // If enabling sync, immediately sync the right video to the left
    if (!isSynced && leftVideoRef.current && rightVideoRef.current) {
      rightVideoRef.current.currentTime = leftVideoRef.current.currentTime
    }
  }

  // Seek control
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const leftVideo = leftVideoRef.current
    const rightVideo = rightVideoRef.current
    if (!leftVideo || !rightVideo) return

    const newTime = Number.parseFloat(e.target.value)
    leftVideo.currentTime = newTime

    if (isSynced) {
      rightVideo.currentTime = newTime
    }

    setCurrentTime(newTime)
  }

  // Skip forward/backward
  const skip = (seconds: number) => {
    const leftVideo = leftVideoRef.current
    const rightVideo = rightVideoRef.current
    if (!leftVideo || !rightVideo) return

    const newTime = Math.max(0, Math.min(duration, leftVideo.currentTime + seconds))
    leftVideo.currentTime = newTime

    if (isSynced) {
      rightVideo.currentTime = newTime
    }
  }

  // Fullscreen toggle
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

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Swap videos
  const swapVideos = () => {
    setIsSwapped(!isSwapped)
  }

  // Get the correct videos based on swap state
  const leftSrc = isSwapped ? rightVideo.src : leftVideo.src
  const rightSrc = isSwapped ? leftVideo.src : rightVideo.src
  const leftTitle = isSwapped ? rightVideo.title : leftVideo.title
  const rightTitle = isSwapped ? leftVideo.title : rightVideo.title

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-zinc-900 rounded-xl overflow-hidden",
        isFullscreen ? "fixed inset-0 z-50" : "w-full",
        className,
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 h-full">
        {/* Left Video */}
        <div className="relative aspect-video md:aspect-auto">
          <video
            ref={leftVideoRef}
            src={leftSrc}
            className="w-full h-full object-contain bg-black"
            onClick={togglePlay}
            playsInline
          />
          {leftTitle && (
            <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/70 to-transparent">
              <h3 className="text-white text-sm font-medium truncate">{leftTitle}</h3>
            </div>
          )}
        </div>

        {/* Right Video */}
        <div className="relative aspect-video md:aspect-auto">
          <video
            ref={rightVideoRef}
            src={rightSrc}
            className="w-full h-full object-contain bg-black"
            onClick={togglePlay}
            playsInline
          />
          {rightTitle && (
            <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/70 to-transparent">
              <h3 className="text-white text-sm font-medium truncate">{rightTitle}</h3>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        {/* Progress Bar */}
        <div className="flex items-center mb-2">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 rounded-full bg-zinc-600 appearance-none cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to right, #f59e0b ${(currentTime / (duration || 1)) * 100}%, #52525b ${
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
              onClick={togglePlay}
              className="text-white hover:text-amber-400 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Skip Backward */}
            <button
              onClick={() => skip(-5)}
              className="text-white hover:text-amber-400 transition-colors"
              aria-label="Skip backward 5 seconds"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => skip(5)}
              className="text-white hover:text-amber-400 transition-colors"
              aria-label="Skip forward 5 seconds"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Time Display */}
            <div className="text-white text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Sync Toggle */}
            <button
              onClick={toggleSync}
              className={cn(
                "text-white transition-colors",
                isSynced ? "text-amber-400 hover:text-white" : "hover:text-amber-400",
              )}
              aria-label={isSynced ? "Unsync videos" : "Sync videos"}
              title={isSynced ? "Unsync videos" : "Sync videos"}
            >
              {isSynced ? <LinkIcon className="w-4 h-4" /> : <Link2Off className="w-4 h-4" />}
            </button>

            {/* Swap Videos */}
            <button
              onClick={swapVideos}
              className="text-white hover:text-amber-400 transition-colors"
              aria-label="Swap videos"
              title="Swap videos"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-amber-400 transition-colors"
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
