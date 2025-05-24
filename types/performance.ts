/**
 * Performance data interface
 */
export interface PerformanceData {
  kategorie: string
  uebung: string
  name: string
  ergebnis: number | string
}

/**
 * Performance difference calculation result
 */
export interface PerformanceDifference {
  percentDifference: number
  isImprovement: boolean
  rawDifference: number
}

/**
 * Extended performance data with comparison
 */
export interface PerformanceComparison extends PerformanceData {
  difference: PerformanceDifference
  referenceValue: number | string
}

/**
 * Props for performance ranking components
 */
export interface PerformanceRankingProps {
  title: string // Key used for data lookups (e.g., "10m Sprint")
  displayTitle?: string // Optional title for display purposes in the header
  data: PerformanceData[]
  className?: string
  unit?: string
  sortAscending?: boolean
  initialCollapsed?: boolean // Whether the component should start collapsed
}

/**
 * Exercise category type
 */
export type ExerciseCategory = "Schnelligkeit" | "Beweglichkeit" | "Technik" | "Ausdauer"

/**
 * Exercise type
 */
export type Exercise =
  | "10m Sprint"
  | "20m Sprint"
  | "Gewandtheit"
  | "Dribbling"
  | "Ballkontrolle"
  | "Balljonglieren"
  | "YoYo IR1"
