import type React from "react"
import type { SortDirection } from "./common"

/**
 * Result of the useSortableData hook
 */
export interface UseSortableDataResult<T> {
  items: T[]
  requestSort: (key: keyof T) => void
  sortConfig: {
    key: keyof T | null
    direction: SortDirection
  }
}

/**
 * Hook for mobile detection
 */
export interface UseMobileResult {
  isMobile: boolean
}

/**
 * Toast hook types
 */
export interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success"
}

export interface ToastActionElement {
  altText?: string
  onClick?: () => void
  children?: React.ReactNode
}
