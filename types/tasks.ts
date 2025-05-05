import type { LucideIcon } from "lucide-react"
import type { Status } from "./common"

/**
 * List item interface for task lists
 */
export interface ListItem {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  iconStyle: string
  date: string
  time?: string
  amount?: string
  status: Status
  progress?: number
}

/**
 * Props for List03 component
 */
export interface FinancialGoalListProps {
  items?: ListItem[]
  className?: string
}

/**
 * Icon styles configuration
 */
export interface IconStylesConfig {
  [key: string]: string
}

/**
 * Status configuration mapping
 */
export interface StatusConfigMap {
  [key in Status]: {
    icon: LucideIcon
    class: string
    bg: string
  }
}
