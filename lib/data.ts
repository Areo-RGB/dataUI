export interface PerformanceData {
  kategorie: string
  uebung: string
  name: string
  ergebnis: number | string
}

export const performanceData: PerformanceData[] = [
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-3", ergebnis: 2.39 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-10", ergebnis: 2.33 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-20", ergebnis: 2.28 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-30", ergebnis: 2.24 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-40", ergebnis: 2.21 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-50", ergebnis: 2.18 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-60", ergebnis: 2.16 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-70", ergebnis: 2.13 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-80", ergebnis: 2.1 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-90", ergebnis: 2.05 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-97", ergebnis: 1.99 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-3", ergebnis: 4.14 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-10", ergebnis: 4.01 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-20", ergebnis: "3.93*" },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-30", ergebnis: 3.87 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-40", ergebnis: 3.82 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-50", ergebnis: 3.78 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-60", ergebnis: 3.74 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-70", ergebnis: 3.69 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-80", ergebnis: 3.64 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-90", ergebnis: 3.57 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-97", ergebnis: 3.47 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-3", ergebnis: 9.66 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-10", ergebnis: 9.33 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-20", ergebnis: 9.07 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-30", ergebnis: 8.9 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-40", ergebnis: 8.77 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-50", ergebnis: 8.66 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-60", ergebnis: 8.54 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-70", ergebnis: 8.42 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-80", ergebnis: 8.28 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-90", ergebnis: 8.11 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-97", ergebnis: 7.91 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-3", ergebnis: 14.37 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-10", ergebnis: 13.42 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-20", ergebnis: 12.84 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-30", ergebnis: 12.5 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-40", ergebnis: 12.15 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-50", ergebnis: 11.9 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-60", ergebnis: 11.68 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-70", ergebnis: 11.44 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-80", ergebnis: 11.16 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-90", ergebnis: 10.84 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-97", ergebnis: 10.43 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-3", ergebnis: 15.29 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-10", ergebnis: 13.81 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-20", ergebnis: 12.86 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-30", ergebnis: 12.28 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-40", ergebnis: 11.78 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-50", ergebnis: 11.36 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-60", ergebnis: 10.99 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-70", ergebnis: 10.59 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-80", ergebnis: 10.18 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-90", ergebnis: 9.66 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-97", ergebnis: 9.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB", ergebnis: 1.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB", ergebnis: 1.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB", ergebnis: 1.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB", ergebnis: 1.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB-80", ergebnis: 2.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB-90", ergebnis: 3.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB-97", ergebnis: 6.0 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "Finley", ergebnis: 2.0 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "Finley", ergebnis: 3.59 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "Finley", ergebnis: 7.81 },
  { kategorie: "Technik", uebung: "Dribbling", name: "Finley", ergebnis: 10.27 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "Finley", ergebnis: 0.0 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "Finley", ergebnis: 10.82 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "Finley", ergebnis: 640 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "Alex", ergebnis: 7.39 },
  { kategorie: "Technik", uebung: "Dribbling", name: "Alex", ergebnis: 10.0 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "Alex", ergebnis: 2.16 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "Alex", ergebnis: 3.78 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "Alex", ergebnis: 1720 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "Bent", ergebnis: 2.19 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "Bent", ergebnis: 3.82 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "Bent", ergebnis: 8.14 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "Bent", ergebnis: 8.95 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "Bent", ergebnis: 3 },
  { kategorie: "Gewandtheit", uebung: "Dribbling", name: "Bent", ergebnis: 10.28 },
]

// Helper functions to work with the data

// Get unique categories
export function getCategories(): string[] {
  return [...new Set(performanceData.map((item) => item.kategorie))]
}

// Get unique exercises
export function getExercises(): string[] {
  return [...new Set(performanceData.map((item) => item.uebung))]
}

// Get unique player names
export function getPlayerNames(): string[] {
  return [...new Set(performanceData.map((item) => item.name))]
}

// Get data for a specific player
export function getPlayerData(playerName: string): PerformanceData[] {
  return performanceData.filter((item) => item.name === playerName)
}

// Get data for a specific exercise
export function getExerciseData(exercise: string): PerformanceData[] {
  return performanceData.filter((item) => item.uebung === exercise)
}

// Get data for a specific category
export function getCategoryData(category: string): PerformanceData[] {
  return performanceData.filter((item) => item.kategorie === category)
}

// Get benchmark data (DFB percentiles)
export function getBenchmarkData(exercise: string): PerformanceData[] {
  return performanceData.filter((item) => item.uebung === exercise && item.name.startsWith("DFB"))
}

// Helper to convert string results to numbers
function parseResult(result: number | string): number {
  if (typeof result === "string") {
    // Remove any non-numeric characters except decimal point
    return Number.parseFloat(result.replace(/[^\d.]/g, ""))
  }
  return result
}

// Define exercises where higher values are better
const higherIsBetter = ["Balljonglieren", "YoYo IR1"]

/**
 * Calculate percentage difference between two performance data points
 * @param value1 First performance data point
 * @param value2 Second performance data point (reference value)
 * @param exercise Exercise name (used to determine if higher or lower is better)
 * @returns Object containing percentage difference and improvement status
 */
export interface PerformanceDifference {
  percentDifference: number // Percentage difference (positive means improvement)
  isImprovement: boolean // Whether the difference represents an improvement
  rawDifference: number // Raw numerical difference
}

export function calculatePerformanceDifference(
  value1: number | string,
  value2: number | string,
  exercise: string,
): PerformanceDifference {
  const num1 = parseResult(value1)
  const num2 = parseResult(value2)

  // Prevent division by zero
  if (num2 === 0) {
    return {
      percentDifference: 0,
      isImprovement: false,
      rawDifference: num1 - num2,
    }
  }

  const rawDifference = num1 - num2
  const percentDifference = (rawDifference / num2) * 100

  // Determine if this is an improvement based on the exercise type
  const better = higherIsBetter.includes(exercise)
    ? percentDifference > 0 // For exercises where higher is better
    : percentDifference < 0 // For exercises where lower is better

  return {
    // For exercises where lower is better, we return the negative of the percentage
    // to make improvements positive and declines negative
    percentDifference: better ? Math.abs(percentDifference) : -Math.abs(percentDifference),
    isImprovement: better,
    rawDifference,
  }
}

/**
 * Compare two performance data sets and calculate differences
 * @param data1 First performance data set
 * @param data2 Second performance data set (reference)
 * @returns Array of performance data with difference calculations
 */
export interface PerformanceComparison extends PerformanceData {
  difference: PerformanceDifference
  referenceValue: number | string
}

export function comparePerformanceData(data1: PerformanceData[], data2: PerformanceData[]): PerformanceComparison[] {
  const result: PerformanceComparison[] = []

  // Group data2 by exercise for easy lookup
  const referenceData: Record<string, PerformanceData> = {}
  data2.forEach((item) => {
    referenceData[item.uebung] = item
  })

  // Compare each item in data1 with corresponding item in data2
  data1.forEach((item) => {
    const reference = referenceData[item.uebung]

    if (reference) {
      result.push({
        ...item,
        difference: calculatePerformanceDifference(item.ergebnis, reference.ergebnis, item.uebung),
        referenceValue: reference.ergebnis,
      })
    }
  })

  return result
}

/**
 * Compare a player's performance with a specific benchmark percentile
 * @param playerName Name of the player
 * @param benchmarkPercentile Percentile to compare with (e.g., "50" for DFB-50)
 * @returns Array of performance comparisons
 */
export function comparePlayerWithBenchmark(playerName: string, benchmarkPercentile: string): PerformanceComparison[] {
  const playerData = getPlayerData(playerName)

  // Get benchmark data for each exercise the player has data for
  const benchmarkData: PerformanceData[] = []

  playerData.forEach((item) => {
    const benchmarks = getBenchmarkData(item.uebung)
    const benchmark = benchmarks.find((b) => b.name === `DFB-${benchmarkPercentile}`)

    if (benchmark) {
      benchmarkData.push(benchmark)
    }
  })

  return comparePerformanceData(playerData, benchmarkData)
}

/**
 * Compare two players' performance data
 * @param player1 First player name
 * @param player2 Second player name (reference)
 * @returns Array of performance comparisons
 */
export function comparePlayerWithPlayer(player1: string, player2: string): PerformanceComparison[] {
  const player1Data = getPlayerData(player1)
  const player2Data = getPlayerData(player2)

  return comparePerformanceData(player1Data, player2Data)
}
