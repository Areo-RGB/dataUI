import type { PerformanceData, PerformanceDifference, PerformanceComparison } from "@/types/performance"
import type { VideoData, MetricData, ButtonVideoMapping } from "@/types/videos"

// Add this new interface at the top of the file with the other type definitions
// export interface VideoData {
//   url: string
//   name: string
//   test: string
//   result: number | string
//   date?: string
//   description?: string
// }

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

// Update the videoData array to include videos for each button in the performance cards
export const videoData: VideoData[] = [
  // Gewandtheit videos
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/3.webm",
    name: "Finley",
    test: "Gewandtheit",
    result: 7.81,
    date: "15-05-2023",
    description: "Technique analysis focusing on agility and movement patterns",
    buttonIndex: 0, // First button
  },
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/6.webm",
    name: "Bent",
    test: "Gewandtheit",
    result: 8.14,
    date: "02-06-2023",
    description: "Follow-up assessment of agility performance",
    buttonIndex: 1, // Second button
  },

  // 10m Sprint videos
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/Dji%2020240705165214%200123%20D%20Thm2%20Amq13%20-%20(4X5).mp4",
    name: "Finley",
    test: "10m Sprint",
    result: 2.0,
    date: "10-05-2023",
    description: "10m sprint acceleration analysis",
    buttonIndex: 0, // First button
  },
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/sprint2.webm",
    name: "Alex",
    test: "10m Sprint",
    result: 2.16,
    date: "10-05-2023",
    description: "10m sprint technique assessment",
    buttonIndex: 1, // Second button
  },
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/999_tvai.mp4",
    name: "Bent",
    test: "10m Sprint",
    result: 2.19,
    date: "15-07-2023",
    description: "10m sprint technique comparison",
    buttonIndex: 2, // Third button
  },

  // Dribbling videos
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/dribble1.webm",
    name: "Finley",
    test: "Dribbling",
    result: 10.27,
    date: "28-04-2023",
    description: "Ball control and dribbling technique analysis",
    buttonIndex: 0, // First button
  },
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/dribble2.webm",
    name: "Bent",
    test: "Dribbling",
    result: 10.28,
    date: "28-04-2023",
    description: "Dribbling speed and precision assessment",
    buttonIndex: 1, // Second button
  },

  // Ballkontrolle videos
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/ballcontrol1.webm",
    name: "Finley",
    test: "Ballkontrolle",
    result: 10.82,
    date: "05-05-2023",
    description: "Ball control under pressure analysis",
    buttonIndex: 0, // First button
  },
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/ballcontrol2.webm",
    name: "Bent",
    test: "Ballkontrolle",
    result: 8.95,
    date: "05-05-2023",
    description: "Technical ball handling assessment",
    buttonIndex: 1, // Second button
  },

  // 20m Sprint videos
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/sprint1.webm",
    name: "Finley",
    test: "20m Sprint",
    result: 3.59,
    date: "10-05-2023",
    description: "20m sprint full analysis",
    buttonIndex: 0, // First button
  },

  // Balljonglieren videos
  {
    url: "https://data3.fra1.cdn.digitaloceanspaces.com/f1.webm",
    name: "Finley",
    test: "Balljonglieren",
    result: 0.0,
    date: "20-05-2023",
    description: "Ball juggling technique assessment",
    buttonIndex: 0, // First button
  },
]

// Define button video mappings for each performance card
export const buttonVideoMappings: Record<string, ButtonVideoMapping[]> = {
  "10m Sprint": [
    {
      buttonIndex: 0,
      videoUrl:
        "https://data3.fra1.cdn.digitaloceanspaces.com/Dji%2020240705165214%200123%20D%20Thm2%20Amq13%20-%20(4X5).mp4",
      label: "Finley",
    },
    {
      buttonIndex: 1,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/sprint2.webm",
      label: "Alex",
    },
    {
      buttonIndex: 2,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/999_tvai.mp4",
      label: "Bent",
    },
  ],
  "20m Sprint": [
    {
      buttonIndex: 0,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/sprint1.webm",
      label: "Finley",
    },
    {
      buttonIndex: 1,
      videoUrl:
        "https://data3.fra1.cdn.digitaloceanspaces.com/Dji%2020240705165214%200123%20D%20Thm2%20Amq13%20-%20(4X5).mp4",
      label: "Technique",
    },
    {
      buttonIndex: 2,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/999_tvai.mp4",
      label: "Analysis",
    },
  ],
  Gewandtheit: [
    {
      buttonIndex: 0,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/3.webm",
      label: "Finley",
    },
    {
      buttonIndex: 1,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/6.webm",
      label: "Bent",
    },
  ],
  Dribbling: [
    {
      buttonIndex: 0,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/dribble1.webm",
      label: "Finley",
    },
    {
      buttonIndex: 1,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/dribble2.webm",
      label: "Bent",
    },
  ],
  Ballkontrolle: [
    {
      buttonIndex: 0,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/ballcontrol1.webm",
      label: "Finley",
    },
    {
      buttonIndex: 1,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/ballcontrol2.webm",
      label: "Bent",
    },
  ],
  Balljonglieren: [
    {
      buttonIndex: 0,
      videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/f1.webm",
      label: "Finley",
    },
  ],
}

// No changes needed - just confirming the structure is correct

// The workflow starts with these two data structures:
// 1. videoData array - contains all video information
// 2. buttonVideoMappings object - maps buttons to videos for each exercise

// For example, for 10m Sprint:
// buttonVideoMappings["10m Sprint"] = [
//   {
//     buttonIndex: 0,
//     videoUrl: "https://data3.fra1.cdn.digitaloceanspaces.com/Dji%2020240705165214%200123%20D%20Thm2%20Amq13%20-%20(4X5).mp4",
//     label: "Finley",
//   },
//   ...
// ]

// And the helper functions that connect the data to the UI:
// - getVideoUrlForButton(exercise, buttonIndex)
// - getLabelForButton(exercise, buttonIndex)
// - hasVideoForButton(exercise, buttonIndex)
// - getVideoMappingsForExercise(exercise)

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

// Add these helper functions at the end of the file

/**
 * Get video data by athlete name
 * @param name Athlete name
 * @returns Array of video data for the specified athlete
 */
export function getVideosByAthlete(name: string): VideoData[] {
  return videoData.filter((video) => video.name === name)
}

/**
 * Get video data by test type
 * @param test Test type
 * @returns Array of video data for the specified test
 */
export function getVideosByTest(test: string): VideoData[] {
  return videoData.filter((video) => video.test === test)
}

/**
 * Get video data by URL
 * @param url Video URL
 * @returns Video data for the specified URL or undefined if not found
 */
export function getVideoByUrl(url: string): VideoData | undefined {
  return videoData.find((video) => video.url === url)
}

/**
 * Get performance data for a specific video
 * @param url Video URL
 * @returns Performance data associated with the video
 */
export function getPerformanceDataForVideo(url: string): PerformanceData[] {
  const video = getVideoByUrl(url)
  if (!video) return []

  // Get all performance data for the athlete and test
  return performanceData.filter((data) => data.name === video.name && data.uebung === video.test)
}

/**
 * Get all available test types that have videos
 * @returns Array of unique test types that have videos
 */
export function getAvailableTestTypes(): string[] {
  return [...new Set(videoData.map((video) => video.test))]
}

/**
 * Get all available athletes that have videos
 * @returns Array of unique athlete names that have videos
 */
export function getAvailableAthletes(): string[] {
  return [...new Set(videoData.map((video) => video.name))]
}

/**
 * Get all available athletes for a specific test type
 * @param testType The test type to filter by
 * @returns Array of unique athlete names that have videos for the specified test
 */
export function getAthletesForTestType(testType: string): string[] {
  return [...new Set(videoData.filter((video) => video.test === testType).map((video) => video.name))]
}

/**
 * Get all available test types for a specific athlete
 * @param athleteName The athlete name to filter by
 * @returns Array of unique test types that have videos for the specified athlete
 */
export function getTestTypesForAthlete(athleteName: string): string[] {
  return [...new Set(videoData.filter((video) => video.name === athleteName).map((video) => video.test))]
}

/**
 * Check if videos exist for a specific test type and athlete combination
 * @param testType The test type to check
 * @param athleteName The athlete name to check
 * @returns Boolean indicating if videos exist for this combination
 */
export function hasVideosForTestAndAthlete(testType: string, athleteName: string): boolean {
  return videoData.some((video) => video.test === testType && video.name === athleteName)
}

/**
 * Get video for a specific test type and athlete
 * @param testType The test type to find
 * @param athleteName The athlete name to find
 * @returns VideoData object or undefined if not found
 */
export function getVideoForTestAndAthlete(testType: string, athleteName: string): VideoData | undefined {
  return videoData.find((video) => video.test === testType && video.name === athleteName)
}

/**
 * Get all available dates for videos
 * @returns Array of unique dates that have videos
 */
export function getAvailableDates(): string[] {
  return [...new Set(videoData.filter((video) => video.date).map((video) => video.date as string))].sort()
}

/**
 * Get all available dates for a specific athlete and test type
 * @param athleteName The athlete name to filter by
 * @param testType The test type to filter by
 * @returns Array of unique dates that have videos for the specified athlete and test
 */
export function getDatesForAthleteAndTest(athleteName: string, testType: string): string[] {
  return [
    ...new Set(
      videoData
        .filter((video) => video.name === athleteName && video.test === testType && video.date)
        .map((video) => video.date as string),
    ),
  ].sort()
}

/**
 * Get video by athlete, test type, and date
 * @param athleteName The athlete name to find
 * @param testType The test type to find
 * @param date The date to find
 * @returns VideoData object or undefined if not found
 */
export function getVideoByAthleteTestAndDate(
  athleteName: string,
  testType: string,
  date?: string,
): VideoData | undefined {
  if (!date) {
    return getVideoForTestAndAthlete(testType, athleteName)
  }
  return videoData.find((video) => video.name === athleteName && video.test === testType && video.date === date)
}

/**
 * Format date for display
 * @param dateString Date string in DD-MM-YYYY format
 * @returns Formatted date string (e.g., "15 May 2023")
 */
export function formatDateForDisplay(dateString?: string): string {
  if (!dateString) return "N/A"

  const [day, month, year] = dateString.split("-")
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return `${Number.parseInt(day)} ${months[Number.parseInt(month) - 1]} ${year}`
}

/**
 * Sample performance metrics data for time-series visualization
 */
export const sampleMetrics: MetricData[] = [
  {
    id: "speed",
    name: "Speed",
    data: Array.from({ length: 100 }, (_, i) => ({
      time: i * 0.1,
      value: 15 + Math.sin(i * 0.3) * 5 + Math.random() * 2,
    })),
  },
  {
    id: "heartRate",
    name: "Heart Rate",
    data: Array.from({ length: 100 }, (_, i) => ({
      time: i * 0.1,
      value: 140 + Math.sin(i * 0.2) * 20 + Math.random() * 5,
    })),
  },
  {
    id: "distance",
    name: "Distance",
    data: Array.from({ length: 100 }, (_, i) => ({
      time: i * 0.1,
      value: i * 0.5,
    })),
  },
  {
    id: "time",
    name: "Elapsed Time",
    data: Array.from({ length: 100 }, (_, i) => ({
      time: i * 0.1,
      value: i * 0.1,
    })),
  },
]

/**
 * Get metrics data for a specific video
 * @param videoUrl The URL of the video
 * @returns Array of metrics data for the video
 */
export function getMetricsForVideo(videoUrl: string): MetricData[] {
  // In a real application, you would fetch metrics specific to the video
  // For now, we'll return the sample metrics
  return sampleMetrics
}

/**
 * Get video URL for a specific button in a performance card
 * @param exercise The exercise name (e.g., "10m Sprint")
 * @param buttonIndex The index of the button (0, 1, or 2)
 * @returns Video URL for the specified button or undefined if not found
 */
export function getVideoUrlForButton(exercise: string, buttonIndex: number): string | undefined {
  const mapping = buttonVideoMappings[exercise]?.find((m) => m.buttonIndex === buttonIndex)
  return mapping?.videoUrl
}

/**
 * Get all video mappings for a specific exercise
 * @param exercise The exercise name (e.g., "10m Sprint")
 * @returns Array of button video mappings for the exercise
 */
export function getVideoMappingsForExercise(exercise: string): ButtonVideoMapping[] {
  return buttonVideoMappings[exercise] || []
}

/**
 * Get label for a specific button in a performance card
 * @param exercise The exercise name (e.g., "10m Sprint")
 * @param buttonIndex The index of the button (0, 1, or 2)
 * @returns Label for the specified button or undefined if not found
 */
export function getLabelForButton(exercise: string, buttonIndex: number): string | undefined {
  const mapping = buttonVideoMappings[exercise]?.find((m) => m.buttonIndex === buttonIndex)
  return mapping?.label
}

/**
 * Check if a button has a video assigned
 * @param exercise The exercise name (e.g., "10m Sprint")
 * @param buttonIndex The index of the button (0, 1, or 2)
 * @returns Boolean indicating if the button has a video assigned
 */
export function hasVideoForButton(exercise: string, buttonIndex: number): boolean {
  return !!getVideoUrlForButton(exercise, buttonIndex)
}
