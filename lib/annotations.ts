import type React from "react"

// Define the position types for annotations
export type AnnotationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "middle-center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

// Define the TextAnnotation interface
export interface TextAnnotation {
  id: string // Unique identifier for the annotation
  videoUrl: string // URL of the video this annotation belongs to
  text: string // The text content to display

  // Timing
  startTime: number // When to start showing the annotation (in seconds)
  duration: number // How long to show the annotation (in seconds)

  // Positioning - simplified to predefined positions
  position: AnnotationPosition

  // Optional styling
  style?: {
    color?: string // Text color (CSS color value)
    backgroundColor?: string // Background color with opacity (CSS color value)
    fontSize?: number // Font size in pixels
    fontWeight?: string // Font weight (normal, bold, etc.)
  }
}

// Define a test annotation that starts at the beginning of any video
export const testAnnotation: TextAnnotation = {
  id: "test-annotation",
  videoUrl: "*", // Special value to match any video
  text: "TEST",
  startTime: 0,
  duration: 10,
  position: "top-right",
  style: {
    color: "#ffffff",
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    fontSize: 18,
    fontWeight: "bold",
  },
}

// Sample annotations for specific videos
export const sampleAnnotations: TextAnnotation[] = [
  {
    id: "annotation-1",
    videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/sprint1.webm",
    text: "Notice the proper form",
    startTime: 2.5,
    duration: 4.0,
    position: "bottom-left",
    style: {
      color: "#ffffff",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  {
    id: "annotation-2",
    videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/sprint1.webm",
    text: "Excellent acceleration phase",
    startTime: 8.0,
    duration: 5.0,
    position: "top-center",
    style: {
      color: "#ffffff",
      backgroundColor: "rgba(0, 100, 0, 0.7)",
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  {
    id: "annotation-3",
    videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/dribble1.webm",
    text: "Good ball control",
    startTime: 3.0,
    duration: 4.0,
    position: "bottom-right",
    style: {
      color: "#ffffff",
      backgroundColor: "rgba(0, 0, 100, 0.7)",
      fontSize: 16,
      fontWeight: "bold",
    },
  },
]

// Combine test annotation with sample annotations
export const allAnnotations: TextAnnotation[] = [testAnnotation, ...sampleAnnotations]

/**
 * Get all annotations for a specific video
 * @param videoUrl URL of the video
 * @returns Array of annotations for the video
 */
export function getAnnotationsForVideo(videoUrl: string): TextAnnotation[] {
  return allAnnotations.filter((annotation) => annotation.videoUrl === videoUrl || annotation.videoUrl === "*")
}

/**
 * Get annotations visible at a specific time for a video
 * @param videoUrl URL of the video
 * @param currentTime Current playback time in seconds
 * @returns Array of visible annotations
 */
export function getVisibleAnnotations(videoUrl: string, currentTime: number): TextAnnotation[] {
  const annotations = getAnnotationsForVideo(videoUrl)
  return annotations.filter(
    (annotation) => currentTime >= annotation.startTime && currentTime < annotation.startTime + annotation.duration,
  )
}

/**
 * Add a new annotation
 * @param annotation The annotation to add
 * @returns The added annotation with a generated ID
 */
export function addAnnotation(annotation: Omit<TextAnnotation, "id">): TextAnnotation {
  const newAnnotation = {
    ...annotation,
    id: `annotation-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  }

  // In a real application, you would persist this to a database
  // For now, we'll just return the new annotation
  return newAnnotation
}

/**
 * Update an existing annotation
 * @param id ID of the annotation to update
 * @param updatedData Updated annotation data
 * @returns The updated annotation or undefined if not found
 */
export function updateAnnotation(
  id: string,
  updatedData: Partial<Omit<TextAnnotation, "id">>,
): TextAnnotation | undefined {
  // In a real application, you would update this in a database
  // For now, we'll just simulate the update
  const annotation = allAnnotations.find((a) => a.id === id)

  if (!annotation) {
    return undefined
  }

  const updatedAnnotation = {
    ...annotation,
    ...updatedData,
  }

  return updatedAnnotation
}

/**
 * Delete an annotation
 * @param id ID of the annotation to delete
 * @returns Boolean indicating success
 */
export function deleteAnnotation(id: string): boolean {
  // In a real application, you would delete this from a database
  // For now, we'll just simulate the deletion
  const index = allAnnotations.findIndex((a) => a.id === id)

  if (index === -1) {
    return false
  }

  // In a real implementation, you would remove the item from the array
  // allAnnotations.splice(index, 1);

  return true
}

/**
 * Get CSS styles for a position
 * @param position The annotation position
 * @returns CSS position properties
 */
export function getPositionStyles(position: AnnotationPosition): React.CSSProperties {
  const baseStyles: React.CSSProperties = {
    position: "absolute",
    maxWidth: "80%",
  }

  switch (position) {
    case "top-left":
      return { ...baseStyles, top: 16, left: 16 }
    case "top-center":
      return { ...baseStyles, top: 16, left: "50%", transform: "translateX(-50%)" }
    case "top-right":
      return { ...baseStyles, top: 16, right: 16 }
    case "middle-left":
      return { ...baseStyles, top: "50%", left: 16, transform: "translateY(-50%)" }
    case "middle-center":
      return { ...baseStyles, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
    case "middle-right":
      return { ...baseStyles, top: "50%", right: 16, transform: "translateY(-50%)" }
    case "bottom-left":
      return { ...baseStyles, bottom: 16, left: 16 }
    case "bottom-center":
      return { ...baseStyles, bottom: 16, left: "50%", transform: "translateX(-50%)" }
    case "bottom-right":
      return { ...baseStyles, bottom: 16, right: 16 }
    default:
      return baseStyles
  }
}
