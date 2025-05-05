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
  const [signedUrl, setSignedUrl] = useState<string | null>(null)

  // Try to determine if we should use an MP4 fallback
  const useFallback = videoUrl.endsWith(".webm")
  const fallbackUrl = useFallback ? videoUrl.replace(".webm", ".mp4") : null

  // Get a signed URL for the video
  useEffect(() => {
    if (!isPlaying) return

    const getSignedUrl = async (url: string) => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/video-url?url=${encodeURIComponent(url)}`)

        if (!response.ok) {
          throw new Error("Failed to get signed URL")
        }

        const data = await response.json()
        setSignedUrl(data.url)
      } catch (err) {
        console.error("Error getting signed URL:", err)
        setError("Failed to authenticate video access. Please try again.")
        setIsLoading(false)
      }
    }

    getSignedUrl(videoUrl)
  }, [isPlaying, videoUrl, retryCount])

  // Play the video when we have a signed URL
  useEffect(() => {
    if (!isPlaying || !signedUrl || !videoRef.current) return

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
          if (fallbackUrl && videoUrl !== fallbackUrl) {
            console.log("Trying fallback URL")
            // Reset signed URL and get a new one for the fallback
            setSignedUrl(null)
            const getSignedUrl = async () => {
              try {
                const response = await fetch(`/api/video-url?url=${encodeURIComponent(fallbackUrl)}`)
                if (!response.ok) throw new Error("Failed to get signed URL for fallback")
                const data = await response.json()
                setSignedUrl(data.url)
              } catch (err) {
                console.error("Error getting signed URL for fallback:", err)
                setError("Unable to play this video. The format may not be supported by your browser.")
                setIsLoading(false)
              }
            }
            getSignedUrl()
          } else {
            setError("Unable to play this video. The format may not be supported by your browser.")
            setIsLoading(false)
          }
        })
      }
    }

    playVideo(signedUrl)

    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ""
        videoRef.current.load()
      }
    }
  }, [isPlaying, signedUrl, videoUrl, fallbackUrl])

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
    setSignedUrl(null)
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
