/**
 * Mux video metadata interface
 */
export interface MuxVideoMetadata {
  id: string
  title: string
  description?: string
  playbackId: string
  duration: number
  aspectRatio: string
  createdAt: string
  thumbnailUrl?: string
  tags?: string[]
}

/**
 * Mux player event types
 */
export type MuxPlayerEvent =
  | "play"
  | "pause"
  | "ended"
  | "timeupdate"
  | "seeking"
  | "seeked"
  | "ratechange"
  | "volumechange"
  | "loadstart"
  | "loadedmetadata"
  | "loadeddata"
  | "error"

/**
 * Mux player state
 */
export interface MuxPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  buffered: number
  playbackRate: number
  volume: number
  isMuted: boolean
  isFullscreen: boolean
  isLoading: boolean
  isReady: boolean
  hasError: boolean
  errorMessage?: string
}
