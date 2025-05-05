import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

/**
 * Common props that many components share
 */
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

/**
 * Props with className helper
 */
export type WithClassName<T = {}> = T & { className?: string }

/**
 * Props with children helper
 */
export type WithChildren<T = {}> = T & { children?: ReactNode }

/**
 * Standard props combining className and children
 */
export type StandardProps<T = {}> = WithChildren<WithClassName<T>>

/**
 * Icon component props
 */
export interface IconProps {
  icon: LucideIcon
  size?: number
  className?: string
}

/**
 * Status types used across the application
 */
export type Status = "pending" | "in-progress" | "completed"

/**
 * Status configuration type
 */
export interface StatusConfig {
  icon: LucideIcon
  class: string
  bg: string
}

/**
 * Sort direction type
 */
export type SortDirection = "asc" | "desc"

/**
 * Sort configuration type
 */
export interface SortConfig<T> {
  key: keyof T | null
  direction: SortDirection
}

/**
 * Theme type
 */
export type Theme = "light" | "dark" | "system"
