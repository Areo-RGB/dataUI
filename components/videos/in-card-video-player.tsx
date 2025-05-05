"use client"

import { useState, useRef, useEffect } from "react"
import { X, AlertCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface InCardVideoPlayerProps {
  videoUrl: string
  isPlaying: boolean
  onClose: () => void
  className?: string
}

export function InCardVideoPlayer({ videoUrl, isPlaying, onClose, className }: InCardVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Try to determine if we should use an MP4 fallback
  const useFallback = videoUrl.endsWith(".webm")
  const fallbackUrl = useFallback ? videoUrl.replace(".webm", ".mp4") : null

  useEffect(() => {
    if (!isPlaying) {
      setError(null)
      setIsLoading(true)
      setRetryCount(0)
      return
    }

    const playVideo = (url: string) => {
      if (videoRef.current) {
        setIsLoading(true)
        setError(null)

        // Set the source and load the video
        videoRef.current.src = url
        videoRef.current.load()

        // Try to play the video
        videoRef.current.play().catch((err) => {
          console.error("Error playing video:", err)

          // If we have a fallback URL and haven't tried it yet, try the fallback
          if (fallbackUrl && url !== fallbackUrl) {
            console.log("Trying fallback URL:", fallbackUrl)
            playVideo(fallbackUrl)
          } else {
            setError("Unable to play this video. The format may not be supported by your browser.")
            setIsLoading(false)
          }
        })
      }
    }

    playVideo(videoUrl)

    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ""
        videoRef.current.load()
      }
    }
  }, [isPlaying, videoUrl, fallbackUrl, retryCount])

  const handleVideoLoaded = () => {
    setIsLoading(false)
    setError(null)
  }

  const handleVideoError = () => {
    if (isPlaying) {
      setIsLoading(false)
      setError("There was an error loading the video. Please try again.")
    }
  }

  const handleVideoEnded = () => {
    onClose()
  }

  const handleCloseClick = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    onClose()
  }

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    setIsLoading(true)
    setError(null)
  }

  if (!isPlaying) return null

  return (
    <div className={cn("absolute inset-0 bg-black flex flex-col items-center justify-center z-10", className)}>
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
          <p className="text-white mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}

      <button
        onClick={handleCloseClick}
        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-20"
        aria-label="Close video"
      >
        <X size={20} />
      </button>

      <video
        ref={videoRef}
        className={cn("w-full h-full object-contain", error ? "hidden" : "")}
        controls
        playsInline
        onLoadedData={handleVideoLoaded}
        onError={handleVideoError}
        onEnded={handleVideoEnded}
      />
    </div>
  )
}
