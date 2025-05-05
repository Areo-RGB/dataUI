import type React from "react"
/**
 * Dashboard content props
 */
export interface ContentProps {
  className?: string
}

/**
 * Dashboard component props
 */
export interface DashboardProps {
  className?: string
}

/**
 * Tab data interface
 */
export interface TabData {
  value: string
  label: string
  icon: React.ReactNode
}
