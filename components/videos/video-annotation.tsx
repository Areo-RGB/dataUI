"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Pencil, Circle, ArrowRight, Type, Trash2, Save, Download, Eye, EyeOff, Undo } from "lucide-react"
import type { AnnotationTool, Annotation, VideoAnnotationProps } from "@/types/videos"

export default function VideoAnnotation({ videoRef, width, height, className, onSave }: VideoAnnotationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null)
  const [selectedTool, setSelectedTool] = useState<AnnotationTool>("pencil")
  const [color, setColor] = useState("#FF5722")
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null)
  const [textInput, setTextInput] = useState("")
  const [textPosition, setTextPosition] = useState<{ x: number; y: number } | null>(null)
  const [isAddingText, setIsAddingText] = useState(false)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw all annotations if visible
    if (showAnnotations) {
      drawAnnotations(ctx)
    }
  }, [width, height, annotations, showAnnotations])

  // Draw all saved annotations
  const drawAnnotations = (ctx: CanvasRenderingContext2D) => {
    annotations.forEach((annotation) => {
      ctx.strokeStyle = annotation.color
      ctx.lineWidth = 3
      ctx.beginPath()

      switch (annotation.tool) {
        case "pencil":
          if (annotation.points.length < 2) return
          ctx.moveTo(annotation.points[0].x, annotation.points[0].y)
          annotation.points.forEach((point, i) => {
            if (i > 0) ctx.lineTo(point.x, point.y)
          })
          break

        case "circle":
          if (annotation.points.length < 2) return
          const startPoint = annotation.points[0]
          const endPoint = annotation.points[1]
          const radius = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2))
          ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI)
          break

        case "arrow":
          if (annotation.points.length < 2) return
          drawArrow(ctx, annotation.points[0].x, annotation.points[0].y, annotation.points[1].x, annotation.points[1].y)
          break

        case "text":
          if (!annotation.text || annotation.points.length < 1) return
          ctx.font = "16px Arial"
          ctx.fillStyle = annotation.color
          ctx.fillText(annotation.text, annotation.points[0].x, annotation.points[0].y)
          break
      }

      if (annotation.tool !== "text") {
        ctx.stroke()
      }
    })
  }

  // Draw arrow helper
  const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
    const headLength = 15
    const dx = toX - fromX
    const dy = toY - fromY
    const angle = Math.atan2(dy, dx)

    // Line
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)

    // Arrowhead
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6))
    ctx.moveTo(toX, toY)
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6))
  }

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (selectedTool === "text") {
      setTextPosition({ x, y })
      setIsAddingText(true)
      return
    }

    setIsDrawing(true)
    setStartPoint({ x, y })

    const newAnnotation: Annotation = {
      tool: selectedTool,
      color,
      points: [{ x, y }],
      timestamp: videoRef.current?.currentTime || 0,
    }

    setCurrentAnnotation(newAnnotation)
  }

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAnnotation) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas and redraw all annotations
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawAnnotations(ctx)

    // Draw current annotation
    ctx.strokeStyle = currentAnnotation.color
    ctx.lineWidth = 3
    ctx.beginPath()

    switch (currentAnnotation.tool) {
      case "pencil":
        // For pencil, add the point to the current annotation
        setCurrentAnnotation({
          ...currentAnnotation,
          points: [...currentAnnotation.points, { x, y }],
        })

        // Draw the line
        ctx.moveTo(currentAnnotation.points[0].x, currentAnnotation.points[0].y)
        currentAnnotation.points.forEach((point) => {
          ctx.lineTo(point.x, point.y)
        })
        ctx.lineTo(x, y)
        break

      case "circle":
        if (!startPoint) return
        const radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2))
        ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI)
        break

      case "arrow":
        if (!startPoint) return
        drawArrow(ctx, startPoint.x, startPoint.y, x, y)
        break
    }

    ctx.stroke()
  }

  // Handle mouse up
  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAnnotation || !startPoint) {
      setIsDrawing(false)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    let finalAnnotation: Annotation = { ...currentAnnotation }

    switch (selectedTool) {
      case "pencil":
        // For pencil, we already have all points
        break

      case "circle":
      case "arrow":
        // For circle and arrow, we need start and end points
        finalAnnotation = {
          ...currentAnnotation,
          points: [startPoint, { x, y }],
        }
        break
    }

    setAnnotations([...annotations, finalAnnotation])
    setCurrentAnnotation(null)
    setIsDrawing(false)
    setStartPoint(null)
  }

  // Handle text input
  const handleTextSubmit = () => {
    if (!textPosition || !textInput.trim()) {
      setIsAddingText(false)
      setTextInput("")
      setTextPosition(null)
      return
    }

    const textAnnotation: Annotation = {
      tool: "text",
      color,
      points: [textPosition],
      text: textInput,
      timestamp: videoRef.current?.currentTime || 0,
    }

    setAnnotations([...annotations, textAnnotation])
    setIsAddingText(false)
    setTextInput("")
    setTextPosition(null)
  }

  // Undo last annotation
  const handleUndo = () => {
    if (annotations.length === 0) return
    setAnnotations(annotations.slice(0, -1))
  }

  // Clear all annotations
  const handleClear = () => {
    setAnnotations([])
  }

  // Save annotations
  const handleSave = () => {
    if (onSave) {
      onSave(annotations)
    }
  }

  // Export annotations as PNG
  const handleExport = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create a new canvas with both video and annotations
    const exportCanvas = document.createElement("canvas")
    exportCanvas.width = width
    exportCanvas.height = height
    const exportCtx = exportCanvas.getContext("2d")
    if (!exportCtx) return

    // Draw video frame
    if (videoRef.current) {
      exportCtx.drawImage(videoRef.current, 0, 0, width, height)
    }

    // Draw annotations
    const ctx = canvas.getContext("2d")
    if (ctx) {
      exportCtx.drawImage(canvas, 0, 0)
    }

    // Create download link
    const link = document.createElement("a")
    link.download = `annotation-${new Date().toISOString()}.png`
    link.href = exportCanvas.toDataURL("image/png")
    link.click()
  }

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 z-10 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDrawing(false)
          setCurrentAnnotation(null)
        }}
      />

      {/* Text input overlay */}
      {isAddingText && textPosition && (
        <div className="absolute z-20 bg-black/80 p-2 rounded" style={{ top: textPosition.y, left: textPosition.x }}>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="bg-transparent border border-white/30 text-white px-2 py-1 text-sm rounded"
            placeholder="Enter text..."
            autoFocus
          />
          <div className="flex mt-1 gap-1">
            <button onClick={handleTextSubmit} className="bg-amber-500 text-black px-2 py-0.5 text-xs rounded">
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingText(false)
                setTextInput("")
                setTextPosition(null)
              }}
              className="bg-zinc-600 text-white px-2 py-0.5 text-xs rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Annotation toolbar */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/80 rounded-lg p-1 z-20 flex items-center gap-1">
        <button
          onClick={() => setSelectedTool("pencil")}
          className={cn(
            "p-1.5 rounded",
            selectedTool === "pencil" ? "bg-amber-500 text-black" : "text-white hover:bg-zinc-700",
          )}
          title="Pencil"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSelectedTool("circle")}
          className={cn(
            "p-1.5 rounded",
            selectedTool === "circle" ? "bg-amber-500 text-black" : "text-white hover:bg-zinc-700",
          )}
          title="Circle"
        >
          <Circle className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSelectedTool("arrow")}
          className={cn(
            "p-1.5 rounded",
            selectedTool === "arrow" ? "bg-amber-500 text-black" : "text-white hover:bg-zinc-700",
          )}
          title="Arrow"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSelectedTool("text")}
          className={cn(
            "p-1.5 rounded",
            selectedTool === "text" ? "bg-amber-500 text-black" : "text-white hover:bg-zinc-700",
          )}
          title="Text"
        >
          <Type className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-zinc-600 mx-1" />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-6 h-6 rounded cursor-pointer border-none"
          title="Color"
        />

        <div className="w-px h-6 bg-zinc-600 mx-1" />

        <button
          onClick={handleUndo}
          className="p-1.5 rounded text-white hover:bg-zinc-700"
          title="Undo"
          disabled={annotations.length === 0}
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={handleClear}
          className="p-1.5 rounded text-white hover:bg-zinc-700"
          title="Clear all"
          disabled={annotations.length === 0}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-zinc-600 mx-1" />

        <button
          onClick={() => setShowAnnotations(!showAnnotations)}
          className="p-1.5 rounded text-white hover:bg-zinc-700"
          title={showAnnotations ? "Hide annotations" : "Show annotations"}
        >
          {showAnnotations ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <button onClick={handleSave} className="p-1.5 rounded text-white hover:bg-zinc-700" title="Save annotations">
          <Save className="w-4 h-4" />
        </button>
        <button onClick={handleExport} className="p-1.5 rounded text-white hover:bg-zinc-700" title="Export as image">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
