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
  Pencil,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import VideoAnnotation from "@/components/videos/video-annotation"
import PerformanceOverlay from "@/components/videos/performance-overlay"
import type { EnhancedVideoComparisonProps, Annotation } from "@/types/videos"
import { getExerciseData, sampleMetrics } from "@/lib/data"

export default function EnhancedVideoComparison({
  leftVideo,
  rightVideo,
  className,
  initialSyncState = true,
  metrics = sampleMetrics,
  leftPerformanceData,
  rightPerformanceData,
}: EnhancedVideoComparisonProps) {
  const leftVideoRef = useRef<HTMLVideoElement>(null)
  const rightVideoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isSynced, setIsSynced] = useState(initialSyncState)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSwapped, setIsSwapped] = useState(false)
  const [showAnnotations, setShowAnnotations] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 })
  const [leftAnnotations, setLeftAnnotations] = useState<Annotation[]>([])
  const [rightAnnotations, setRightAnnotations] = useState<Annotation[]>([])
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isFrameByFrame, setIsFrameByFrame] = useState(false)

  // Default performance data if none provided
  const defaultLeftData =
    leftPerformanceData ||
    getExerciseData("10m Sprint").filter((data) => data.name === "Finley" || data.name.startsWith("DFB"))
  const defaultRightData =
    rightPerformanceData ||
    getExerciseData("10m Sprint").filter((data) => data.name === "Alex" || data.name.startsWith("DFB"))

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

      // Set video dimensions for annotations
      if (leftVideo.videoWidth && leftVideo.videoHeight) {
        const containerWidth = leftVideo.clientWidth
        const containerHeight = leftVideo.clientHeight
        setVideoDimensions({ width: containerWidth, height: containerHeight })
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

    const handleResize = () => {
      if (leftVideo) {
        setVideoDimensions({
          width: leftVideo.clientWidth,
          height: leftVideo.clientHeight,
        })
      }
    }

    leftVideo.addEventListener("loadedmetadata", handleLoadedMetadata)
    rightVideo.addEventListener("loadedmetadata", handleLoadedMetadata)
    leftVideo.addEventListener("timeupdate", handleTimeUpdate)
    leftVideo.addEventListener("ended", handleEnded)
    rightVideo.addEventListener("ended", handleEnded)
    window.addEventListener("resize", handleResize)

    return () => {
      leftVideo.removeEventListener("loadedmetadata", handleLoadedMetadata)
      rightVideo.removeEventListener("loadedmetadata", handleLoadedMetadata)
      leftVideo.removeEventListener("timeupdate", handleTimeUpdate)
      leftVideo.removeEventListener("ended", handleEnded)
      rightVideo.removeEventListener("ended", handleEnded)
      window.removeEventListener("resize", handleResize)
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
      setIsFrameByFrame(false)
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

  // Change playback speed
  const changePlaybackSpeed = (speed: number) => {
    const leftVideo = leftVideoRef.current
    const rightVideo = rightVideoRef.current
    if (!leftVideo || !rightVideo) return

    leftVideo.playbackRate = speed
    rightVideo.playbackRate = speed
    setPlaybackSpeed(speed)
  }

  // Move one frame forward (assuming 30fps)
  const nextFrame = () => {
    const leftVideo = leftVideoRef.current
    const rightVideo = rightVideoRef.current
    if (!leftVideo || !rightVideo) return

    // Pause videos if playing
    if (isPlaying) {
      leftVideo.pause()
      rightVideo.pause()
      setIsPlaying(false)
    }

    // Move forward by one frame (approximately 1/30 second)
    const frameTime = 1 / 30
    const newTime = Math.min(duration, leftVideo.currentTime + frameTime)
    leftVideo.currentTime = newTime

    if (isSynced) {
      rightVideo.currentTime = newTime
    }

    setIsFrameByFrame(true)
  }

  // Move one frame backward (assuming 30fps)
  const prevFrame = () => {
    const leftVideo = leftVideoRef.current
    const rightVideo = rightVideoRef.current
    if (!leftVideo || !rightVideo) return

    // Pause videos if playing
    if (isPlaying) {
      leftVideo.pause()
      rightVideo.pause()
      setIsPlaying(false)
    }

    // Move backward by one frame (approximately 1/30 second)
    const frameTime = 1 / 30
    const newTime = Math.max(0, leftVideo.currentTime - frameTime)
    leftVideo.currentTime = newTime

    if (isSynced) {
      rightVideo.currentTime = newTime
    }

    setIsFrameByFrame(true)
  }

  // Save annotations
  const handleSaveLeftAnnotations = (annotations: Annotation[]) => {
    setLeftAnnotations(annotations)
    // In a real app, you would save these to a database
    console.log("Saved left annotations:", annotations)
  }

  const handleSaveRightAnnotations = (annotations: Annotation[]) => {
    setRightAnnotations(annotations)
    // In a real app, you would save these to a database
    console.log("Saved right annotations:", annotations)
  }

  // Get the correct videos and data based on swap state
  const leftSrc = isSwapped ? rightVideo.src : leftVideo.src
  const rightSrc = isSwapped ? leftVideo.src : rightVideo.src
  const leftTitle = isSwapped ? rightVideo.title : leftVideo.title
  const rightTitle = isSwapped ? leftVideo.title : rightVideo.title
  const leftData = isSwapped ? defaultRightData : defaultLeftData
  const rightData = isSwapped ? defaultLeftData : defaultRightData

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

          {/* Left Video Annotations */}
          {showAnnotations && videoDimensions.width > 0 && (
            <VideoAnnotation
              videoRef={leftVideoRef}
              width={videoDimensions.width}
              height={videoDimensions.height}
              onSave={handleSaveLeftAnnotations}
            />
          )}

          {/* Left Video Metrics */}
          {showMetrics && (
            <PerformanceOverlay
              videoRef={leftVideoRef}
              width={videoDimensions.width}
              height={videoDimensions.height}
              performanceData={leftData}
              comparisonData={rightData}
              showComparison={true}
            />
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

          {/* Right Video Annotations */}
          {showAnnotations && videoDimensions.width > 0 && (
            <VideoAnnotation
              videoRef={rightVideoRef}
              width={videoDimensions.width}
              height={videoDimensions.height}
              onSave={handleSaveRightAnnotations}
            />
          )}

          {/* Right Video Metrics */}
          {showMetrics && (
            <PerformanceOverlay
              videoRef={rightVideoRef}
              width={videoDimensions.width}
              height={videoDimensions.height}
              performanceData={rightData}
              comparisonData={leftData}
              showComparison={true}
            />
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

            {/* Frame by Frame Controls */}
            <div className="flex items-center space-x-1">
              <button
                onClick={prevFrame}
                className="text-white hover:text-amber-400 transition-colors"
                aria-label="Previous frame"
                title="Previous frame"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextFrame}
                className="text-white hover:text-amber-400 transition-colors"
                aria-label="Next frame"
                title="Next frame"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

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

            {/* Playback Speed */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => changePlaybackSpeed(0.25)}
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded",
                  playbackSpeed === 0.25 ? "bg-amber-500 text-black" : "text-white hover:bg-zinc-700",
                )}
                aria-label="0.25x speed"
                title="0.25x speed"
              >
                0.25x
              </button>
              <button
                onClick={() => changePlaybackSpeed(0.5)}
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded",
                  playbackSpeed === 0.5 ? "bg-amber-500 text-black" : "text-white hover:bg-zinc-700",
                )}
                aria-label="0.5x speed"
                title="0.5x speed"
              >
                0.5x
              </button>
              <button
                onClick={() => changePlaybackSpeed(1)}
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded",
                  playbackSpeed === 1 ? "bg-amber-500 text-black" : "text-white hover:bg-zinc-700",
                )}
                aria-label="1x speed"
                title="1x speed"
              >
                1x
              </button>
            </div>

            {/* Time Display */}
            <div className="text-white text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Annotations Toggle */}
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={cn(
                "text-white transition-colors",
                showAnnotations ? "text-amber-400 hover:text-white" : "hover:text-amber-400",
              )}
              aria-label={showAnnotations ? "Hide annotations" : "Show annotations"}
              title={showAnnotations ? "Hide annotations" : "Show annotations"}
            >
              <Pencil className="w-4 h-4" />
            </button>

            {/* Metrics Toggle */}
            <button
              onClick={() => setShowMetrics(!showMetrics)}
              className={cn(
                "text-white transition-colors",
                showMetrics ? "text-amber-400 hover:text-white" : "hover:text-amber-400",
              )}
              aria-label={showMetrics ? "Hide metrics" : "Show metrics"}
              title={showMetrics ? "Hide metrics" : "Show metrics"}
            >
              <BarChart2 className="w-4 h-4" />
            </button>

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
