import type { ReactNode } from "react"

/**
 * Layout component props
 */
export interface LayoutProps {
  children: ReactNode
}

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  label: string
  href?: string
}

/**
 * Navigation item interface
 */
export interface NavItem {
  label: string
  href: string
  icon: any // Using 'any' here as it's used in the existing code
  children?: ReactNode
}

/**
 * Sidebar props
 */
export interface SidebarProps {
  className?: string
}

/**
 * TopNav props
 */
export interface TopNavProps {
  breadcrumbs?: BreadcrumbItem[]
}
