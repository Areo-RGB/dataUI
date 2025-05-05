import type React from "react"
/**
 * Menu item interface for user profile
 */
export interface MenuItem {
  label: string
  value?: string
  href: string
  icon?: React.ReactNode
  external?: boolean
}

/**
 * Profile component props
 */
export interface UserProfileCardProps {
  name: string
  role: string
  avatar: string
  subscription?: string
}
