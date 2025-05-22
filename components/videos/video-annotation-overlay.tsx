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
          color: customStyles.color || 'hsl(var(--primary-foreground))',
          backgroundColor: customStyles.backgroundColor || 'hsla(var(--background), 0.7)',
          fontSize: customStyles.fontSize ? `${customStyles.fontSize}px` : "16px",
          fontWeight: customStyles.fontWeight || "normal",
          padding: "8px 12px", // Kept as inline style for consistency
          borderRadius: "calc(var(--radius) - 4px)", // Equivalent to rounded-sm
          maxWidth: "80%",
          boxShadow: 'var(--shadow-sm)', // Using theme shadow variable
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
