"use client"

import { useState } from "react"
import { MuxVideoPlayer } from "./mux-video-player"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function MuxVideoPlayerExample() {
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Example playback ID - replace with your actual Mux playback ID
  const playbackId = "DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"

  // Handle playback rate change
  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate)
  }

  // Handle time update
  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time)
  }

  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <MuxVideoPlayer
        playbackId={playbackId}
        title="Vertical Mux Video"
        playbackRate={playbackRate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onReady={() => console.log("Video is ready to play")}
        className="rounded-lg overflow-hidden shadow-lg"
        aspectRatio="9/16" // Vertical aspect ratio (9:16)
      />

      <div className="flex flex-col space-y-2">
        <div className="text-sm font-medium text-center">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <Slider value={[currentTime]} max={duration} step={0.1} aria-label="Seek time" className="w-full" />

        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePlaybackRateChange(0.5)}
            className={playbackRate === 0.5 ? "bg-primary text-primary-foreground" : ""}
          >
            0.5x
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePlaybackRateChange(1)}
            className={playbackRate === 1 ? "bg-primary text-primary-foreground" : ""}
          >
            1x
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePlaybackRateChange(1.5)}
            className={playbackRate === 1.5 ? "bg-primary text-primary-foreground" : ""}
          >
            1.5x
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePlaybackRateChange(2)}
            className={playbackRate === 2 ? "bg-primary text-primary-foreground" : ""}
          >
            2x
          </Button>
        </div>
      </div>
    </div>
  )
}
