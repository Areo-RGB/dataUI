"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  RotateCcw,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import VideoAnnotationOverlay from "@/components/videos/video-annotation-overlay"
import type { VideoPlayerProps } from "@/types/videos"

export default function VideoPlayer({ src, title, className, poster, autoPlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isFrameByFrame, setIsFrameByFrame] = useState(false)

  // Initialize video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
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

    const container = videoContainerRef.current
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

  // Play/pause
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
      setIsFrameByFrame(false)
    }
    setIsPlaying(!isPlaying)
  }

  // Mute/unmute
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = Number.parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  // Seek control
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newTime = Number.parseFloat(e.target.value)
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = videoContainerRef.current
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
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
  }

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Restart video
  const restart = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    if (!isPlaying) {
      video.play()
      setIsPlaying(true)
    }
  }

  // Change playback speed
  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = speed
    setPlaybackSpeed(speed)
  }

  // Move one frame forward (assuming 30fps)
  const nextFrame = () => {
    const video = videoRef.current
    if (!video) return

    // Pause video if playing
    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    }

    // Move forward by one frame (approximately 1/30 second)
    const frameTime = 1 / 30
    const newTime = Math.min(video.duration, video.currentTime + frameTime)
    video.currentTime = newTime
    setCurrentTime(newTime)
    setIsFrameByFrame(true)
  }

  // Move one frame backward (assuming 30fps)
  const prevFrame = () => {
    const video = videoRef.current
    if (!video) return

    // Pause video if playing
    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    }

    // Move backward by one frame (approximately 1/30 second)
    const frameTime = 1 / 30
    const newTime = Math.max(0, video.currentTime - frameTime)
    video.currentTime = newTime
    setCurrentTime(newTime)
    setIsFrameByFrame(true)
  }

  return (
    <div
      ref={videoContainerRef}
      className={cn(
        "relative group overflow-hidden rounded-xl bg-base-950",
        isFullscreen ? "fixed inset-0 z-50" : "w-full aspect-video",
        className,
      )}
      onDoubleClick={toggleFullscreen}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        autoPlay={autoPlay}
        playsInline
      />

      {/* Annotation Overlay */}
      <VideoAnnotationOverlay videoUrl={src} currentTime={currentTime} />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-1000/30">
          <div className="w-12 h-12 rounded-full border-4 border-base-300 border-t-base-600 animate-spin"></div>
        </div>
      )}

      {/* Video Title */}
      {title && showControls && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-base-1000/70 to-transparent">
          <h3 className="text-base-100 font-medium truncate">{title}</h3>
        </div>
      )}

      {/* Video Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-1000/70 to-transparent p-4 transition-opacity duration-300",
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
            className="w-full h-1.5 rounded-full bg-base-800 appearance-none cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to right, #f59e0b ${(currentTime / (duration || 1)) * 100}%, #52525b ${
                (currentTime / (duration || 1)) * 100
              }%)`,
            }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-base-100 hover:text-amber-400 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Frame by Frame Controls */}
            <div className="flex items-center space-x-1">
              <button
                onClick={prevFrame}
                className="text-base-100 hover:text-amber-400 transition-colors"
                aria-label="Previous frame"
                title="Previous frame"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextFrame}
                className="text-base-100 hover:text-amber-400 transition-colors"
                aria-label="Next frame"
                title="Next frame"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Restart */}
            <button
              onClick={restart}
              className="text-base-100 hover:text-amber-400 transition-colors"
              aria-label="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Skip Backward */}
            <button
              onClick={() => skip(-10)}
              className="text-base-100 hover:text-amber-400 transition-colors"
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => skip(10)}
              className="text-base-100 hover:text-amber-400 transition-colors"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Playback Speed */}
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
              <button
                onClick={() => changePlaybackSpeed(0.25)}
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded",
                  playbackSpeed === 0.25 ? "bg-amber-500 text-black" : "text-base-100 hover:bg-base-700",
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
                  playbackSpeed === 0.5 ? "bg-amber-500 text-black" : "text-base-100 hover:bg-base-700",
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
                  playbackSpeed === 1 ? "bg-amber-500 text-black" : "text-base-100 hover:bg-base-700",
                )}
                aria-label="1x speed"
                title="1x speed"
              >
                1x
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center space-x-1">
              <button
                onClick={toggleMute}
                className="text-base-100 hover:text-amber-400 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 rounded-full bg-base-800 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, #f59e0b ${volume * 100}%, #52525b ${volume * 100}%)`,
                }}
              />
            </div>

            {/* Time Display */}
            <div className="text-base-100 text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Settings Button */}
            <button className="text-base-100 hover:text-amber-400 transition-colors" aria-label="Settings">
              <Settings className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="text-base-100 hover:text-amber-400 transition-colors"
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
