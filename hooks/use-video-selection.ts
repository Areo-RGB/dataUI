"use client"

import { useState, useEffect } from "react"
import {
  getAvailableAthletes,
  getTestTypesForAthlete,
  getDatesForAthleteAndTest,
  getVideoByAthleteTestAndDate,
  getExerciseData,
} from "@/lib/data"
import { getAnnotationsForVideo } from "@/lib/annotations"

export function useVideoSelection() {
  // Get all available athletes (only needs to run once)
  const allAthletes = getAvailableAthletes()

  // State for selections
  const [selectedAthlete, setSelectedAthlete] = useState(allAthletes[0] || "")
  const [selectedTestType, setSelectedTestType] = useState("")
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  // Get derived data based on selections
  const testTypesForAthlete = getTestTypesForAthlete(selectedAthlete)
  const availableDates =
    selectedAthlete && selectedTestType ? getDatesForAthleteAndTest(selectedAthlete, selectedTestType) : []

  // Get video and performance data
  const athleteVideo =
    selectedAthlete && selectedTestType
      ? getVideoByAthleteTestAndDate(selectedAthlete, selectedTestType, selectedDate)
      : undefined

  const athleteData = selectedTestType
    ? getExerciseData(selectedTestType).filter((data) => data.name === selectedAthlete || data.name.startsWith("DFB"))
    : []

  const annotationCount = athleteVideo ? getAnnotationsForVideo(athleteVideo.url).length : 0

  // Initialize test type when athlete changes
  useEffect(() => {
    if (selectedAthlete && testTypesForAthlete.length > 0) {
      setIsLoading(true)
      // Only set if current selection is invalid or not set
      if (!testTypesForAthlete.includes(selectedTestType)) {
        setSelectedTestType(testTypesForAthlete[0])
        setSelectedDate(undefined)
      }
      setIsLoading(false)
    }
  }, [selectedAthlete, testTypesForAthlete, selectedTestType])

  // Reset date when test type changes
  useEffect(() => {
    if (selectedTestType) {
      setIsLoading(true)
      setSelectedDate(undefined)
      setIsLoading(false)
    }
  }, [selectedTestType])

  return {
    // Selection state
    selectedAthlete,
    setSelectedAthlete,
    selectedTestType,
    setSelectedTestType,
    selectedDate,
    setSelectedDate,

    // Data
    allAthletes,
    testTypesForAthlete,
    availableDates,
    athleteVideo,
    athleteData,
    annotationCount,

    // UI state
    isLoading,
  }
}
