"use client"

import { useState, useEffect, useRef } from "react"
import MuxPlayer from "@mux/mux-player-react"
import { cn } from "@/lib/utils"

export interface MuxVideoPlayerProps {
  /**
   * The Mux playback ID for the video
   */
  playbackId: string

  /**
   * Optional title for the video
   */
  title?: string

  /**
   * Optional poster image URL
   */
  poster?: string

  /**
   * Optional CSS class name
   */
  className?: string

  /**
   * Whether to autoplay the video
   * @default false
   */
  autoPlay?: boolean

  /**
   * Whether to loop the video
   * @default false
   */
  loop?: boolean

  /**
   * Whether to mute the video
   * @default false
   */
  muted?: boolean

  /**
   * Whether to show controls
   * @default true
   */
  controls?: boolean

  /**
   * The starting playback rate
   * @default 1
   */
  playbackRate?: number

  /**
   * Aspect ratio for the video
   * @default "9/16" (vertical)
   */
  aspectRatio?: string

  /**
   * Callback when the video starts playing
   */
  onPlay?: () => void

  /**
   * Callback when the video is paused
   */
  onPause?: () => void

  /**
   * Callback when the video ends
   */
  onEnded?: () => void

  /**
   * Callback when the video time updates
   */
  onTimeUpdate?: (currentTime: number) => void

  /**
   * Callback when the video is ready to play
   */
  onReady?: () => void
}

/**
 * A secondary video player component using Mux with vertical aspect ratio
 */
export function MuxVideoPlayer({
  playbackId,
  title,
  poster,
  className,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  playbackRate = 1,
  aspectRatio = "9/16", // Default to vertical ratio
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onReady,
}: MuxVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef<HTMLVideoElement>(null)

  // Handle playback rate changes
  useEffect(() => {
    if (playerRef.current && isReady) {
      playerRef.current.playbackRate = playbackRate
    }
  }, [playbackRate, isReady])

  // Handle play/pause events
  const handlePlay = () => {
    setIsPlaying(true)
    onPlay?.()
  }

  const handlePause = () => {
    setIsPlaying(false)
    onPause?.()
  }

  // Handle time updates
  const handleTimeUpdate = () => {
    if (playerRef.current) {
      const newTime = playerRef.current.currentTime
      setCurrentTime(newTime)
      onTimeUpdate?.(newTime)
    }
  }

  // Handle video ended
  const handleEnded = () => {
    setIsPlaying(false)
    onEnded?.()
  }

  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration)
      setIsReady(true)
      onReady?.()
    }
  }

  return (
    <div
      className={cn("relative w-full mx-auto", className)}
      style={{ aspectRatio, maxWidth: "calc(100vh * 9/16)" }} // Set max-width based on height for vertical videos
    >
      <MuxPlayer
        ref={playerRef}
        playbackId={playbackId}
        streamType="on-demand"
        title={title}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full h-full"
        style={{ aspectRatio }}
        metadata={{
          video_title: title || "Mux Video",
          player_name: "Vertical Mux Player",
        }}
      />

      {/* Optional overlay for custom controls can be added here */}
    </div>
  )
}
