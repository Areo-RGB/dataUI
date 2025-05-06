"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { addAnnotation, updateAnnotation, deleteAnnotation, getAnnotationsForVideo } from "@/lib/annotations"
import type { TextAnnotation, AnnotationPosition } from "@/types/videos"

interface AnnotationEditorProps {
  videoUrl: string
  onSave?: () => void
  className?: string
}

export default function AnnotationEditor({ videoUrl, onSave, className }: AnnotationEditorProps) {
  const [annotations, setAnnotations] = useState<TextAnnotation[]>([])
  const [selectedAnnotation, setSelectedAnnotation] = useState<TextAnnotation | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // Form state
  const [text, setText] = useState("")
  const [startTime, setStartTime] = useState(0)
  const [duration, setDuration] = useState(5)
  const [position, setPosition] = useState<AnnotationPosition>("bottom-left")
  const [textColor, setTextColor] = useState("#ffffff")
  const [bgColor, setBgColor] = useState("rgba(0, 0, 0, 0.7)")
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState("normal")

  // Load annotations for the video
  useEffect(() => {
    if (videoUrl) {
      const videoAnnotations = getAnnotationsForVideo(videoUrl)
      setAnnotations(videoAnnotations)
    }
  }, [videoUrl])

  // Reset form when selected annotation changes
  useEffect(() => {
    if (selectedAnnotation) {
      setText(selectedAnnotation.text)
      setStartTime(selectedAnnotation.startTime)
      setDuration(selectedAnnotation.duration)
      setPosition(selectedAnnotation.position)
      setTextColor(selectedAnnotation.style?.color || "#ffffff")
      setBgColor(selectedAnnotation.style?.backgroundColor || "rgba(0, 0, 0, 0.7)")
      setFontSize(selectedAnnotation.style?.fontSize || 16)
      setFontWeight(selectedAnnotation.style?.fontWeight || "normal")
    } else {
      resetForm()
    }
  }, [selectedAnnotation])

  // Reset form to defaults
  const resetForm = () => {
    setText("")
    setStartTime(0)
    setDuration(5)
    setPosition("bottom-left")
    setTextColor("#ffffff")
    setBgColor("rgba(0, 0, 0, 0.7)")
    setFontSize(16)
    setFontWeight("normal")
  }

  // Start adding a new annotation
  const handleAddNew = () => {
    setSelectedAnnotation(null)
    resetForm()
    setIsAdding(true)
    setIsEditing(true)
  }

  // Start editing an existing annotation
  const handleEdit = (annotation: TextAnnotation) => {
    setSelectedAnnotation(annotation)
    setIsAdding(false)
    setIsEditing(true)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const annotationData = {
      videoUrl,
      text,
      startTime,
      duration,
      position,
      style: {
        color: textColor,
        backgroundColor: bgColor,
        fontSize,
        fontWeight,
      },
    }

    if (isAdding) {
      // Add new annotation
      const newAnnotation = addAnnotation(annotationData)
      setAnnotations([...annotations, newAnnotation])
    } else if (selectedAnnotation) {
      // Update existing annotation
      const updatedAnnotation = updateAnnotation(selectedAnnotation.id, annotationData)
      if (updatedAnnotation) {
        setAnnotations(annotations.map((a) => (a.id === selectedAnnotation.id ? updatedAnnotation : a)))
      }
    }

    // Reset state
    setIsEditing(false)
    setIsAdding(false)
    setSelectedAnnotation(null)

    // Call onSave callback if provided
    if (onSave) {
      onSave()
    }
  }

  // Handle annotation deletion
  const handleDelete = (id: string) => {
    const success = deleteAnnotation(id)
    if (success) {
      setAnnotations(annotations.filter((a) => a.id !== id))
      if (selectedAnnotation?.id === id) {
        setSelectedAnnotation(null)
        setIsEditing(false)
      }
    }
  }

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false)
    setIsAdding(false)
    setSelectedAnnotation(null)
  }

  // Available positions for the dropdown
  const positions: AnnotationPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "middle-left",
    "middle-center",
    "middle-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]

  return (
    <div className={cn("bg-card rounded-lg border border-border", className)}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-card-foreground">Video Annotations</h3>
          <button
            onClick={handleAddNew}
            className="px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
            disabled={isEditing}
          >
            Add New
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-foreground mb-1">
                Annotation Text
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-foreground mb-1">
                  Start Time (seconds)
                </label>
                <input
                  type="number"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(Number(e.target.value))}
                  min={0}
                  step={0.1}
                  className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-foreground mb-1">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min={0.5}
                  step={0.5}
                  className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-foreground mb-1">
                Position
              </label>
              <select
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value as AnnotationPosition)}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
              >
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos.replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="textColor" className="block text-sm font-medium text-foreground mb-1">
                  Text Color
                </label>
                <input
                  type="color"
                  id="textColor"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="bgColor" className="block text-sm font-medium text-foreground mb-1">
                  Background Color
                </label>
                <input
                  type="text"
                  id="bgColor"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  placeholder="rgba(0, 0, 0, 0.7)"
                  className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fontSize" className="block text-sm font-medium text-foreground mb-1">
                  Font Size (px)
                </label>
                <input
                  type="number"
                  id="fontSize"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  min={10}
                  max={32}
                  className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                />
              </div>

              <div>
                <label htmlFor="fontWeight" className="block text-sm font-medium text-foreground mb-1">
                  Font Weight
                </label>
                <select
                  id="fontWeight"
                  value={fontWeight}
                  onChange={(e) => setFontWeight(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-muted-foreground bg-muted rounded-md hover:bg-muted/80"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
              >
                {isAdding ? "Add Annotation" : "Update Annotation"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-4">
          <ul className="divide-y divide-border">
            {annotations.map((annotation) => (
              <li key={annotation.id} className="py-3">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{annotation.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {annotation.startTime}s - {annotation.startTime + annotation.duration}s | {annotation.position}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(annotation)}
                      className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded hover:bg-primary/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(annotation.id)}
                      className="px-2 py-1 text-xs font-medium text-destructive bg-destructive/10 rounded hover:bg-destructive/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">No annotations for this video yet.</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Click "Add New" to create your first annotation.</p>
          </div>
        </div>
      )}
    </div>
  )
}
