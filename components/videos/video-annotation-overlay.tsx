"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { getVisibleAnnotations, getPositionStyles } from "@/lib/annotations"
import type { TextAnnotation } from "@/lib/annotations"

interface VideoAnnotationOverlayProps {
  videoUrl: string
  currentTime: number
  className?: string
}

export default function VideoAnnotationOverlay({ videoUrl, currentTime, className }: VideoAnnotationOverlayProps) {
  const [visibleAnnotations, setVisibleAnnotations] = useState<TextAnnotation[]>([])

  // Update visible annotations when the current time changes
  useEffect(() => {
    const annotations = getVisibleAnnotations(videoUrl, currentTime)
    setVisibleAnnotations(annotations)
  }, [videoUrl, currentTime])

  if (visibleAnnotations.length === 0) {
    return null
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none z-10", className)}>
      {visibleAnnotations.map((annotation) => {
        // Get position styles based on the annotation's position
        const positionStyles = getPositionStyles(annotation.position)

        // Merge custom styles with position styles
        const customStyles = annotation.style || {}
        const combinedStyles = {
          ...positionStyles,
          color: customStyles.color || "#ffffff",
          backgroundColor: customStyles.backgroundColor || "rgba(0, 0, 0, 0.7)",
          fontSize: customStyles.fontSize ? `${customStyles.fontSize}px` : "16px",
          fontWeight: customStyles.fontWeight || "normal",
          padding: "8px 12px",
          borderRadius: "4px",
          maxWidth: "80%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }

        return (
          <div key={annotation.id} className="pointer-events-auto" style={combinedStyles} aria-live="polite">
            {annotation.text}
          </div>
        )
      })}
    </div>
  )
}
