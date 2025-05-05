"use client"

import { useState, useEffect } from "react"
import EnhancedVideoComparison from "@/components/videos/enhanced-video-comparison"
import { getAvailableAthletes, getAvailableTestTypes, getVideoForTestAndAthlete, getExerciseData } from "@/lib/data"

export default function ComparisonView() {
  // Get all available athletes and test types
  const allAthletes = getAvailableAthletes()
  const allTestTypes = getAvailableTestTypes()

  // State for selections
  const [selectedTestType, setSelectedTestType] = useState(allTestTypes[0] || "")
  const [leftAthlete, setLeftAthlete] = useState("")
  const [rightAthlete, setRightAthlete] = useState("")

  // Initialize athletes when test type changes
  useEffect(() => {
    if (selectedTestType) {
      // Get athletes that have videos for this test type
      const availableAthletes = allAthletes.filter(
        (athlete) => getVideoForTestAndAthlete(selectedTestType, athlete) !== undefined,
      )

      if (availableAthletes.length > 0) {
        setLeftAthlete(availableAthletes[0])

        // Set right athlete to a different athlete if possible
        if (availableAthletes.length > 1) {
          setRightAthlete(availableAthletes[1])
        } else {
          setRightAthlete(availableAthletes[0])
        }
      }
    }
  }, [selectedTestType, allAthletes])

  // Get video data for the selected athletes and test type
  const leftVideo =
    leftAthlete && selectedTestType ? getVideoForTestAndAthlete(selectedTestType, leftAthlete) : undefined

  const rightVideo =
    rightAthlete && selectedTestType ? getVideoForTestAndAthlete(selectedTestType, rightAthlete) : undefined

  // Get performance data for the selected athletes
  const leftPerformanceData = selectedTestType
    ? getExerciseData(selectedTestType).filter((data) => data.name === leftAthlete || data.name.startsWith("DFB"))
    : []

  const rightPerformanceData = selectedTestType
    ? getExerciseData(selectedTestType).filter((data) => data.name === rightAthlete || data.name.startsWith("DFB"))
    : []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Test Type Selector */}
        <div>
          <label htmlFor="test-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Test Type
          </label>
          <select
            id="test-type"
            value={selectedTestType}
            onChange={(e) => setSelectedTestType(e.target.value)}
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
          >
            {allTestTypes.map((testType) => (
              <option key={testType} value={testType}>
                {testType}
              </option>
            ))}
          </select>
        </div>

        {/* Left Athlete Selector */}
        <div>
          <label htmlFor="left-athlete" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Left Athlete
          </label>
          <select
            id="left-athlete"
            value={leftAthlete}
            onChange={(e) => setLeftAthlete(e.target.value)}
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
          >
            {allAthletes
              .filter((athlete) => getVideoForTestAndAthlete(selectedTestType, athlete) !== undefined)
              .map((athlete) => (
                <option key={athlete} value={athlete}>
                  {athlete}
                </option>
              ))}
          </select>
        </div>

        {/* Right Athlete Selector */}
        <div>
          <label htmlFor="right-athlete" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Right Athlete
          </label>
          <select
            id="right-athlete"
            value={rightAthlete}
            onChange={(e) => setRightAthlete(e.target.value)}
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
          >
            {allAthletes
              .filter((athlete) => getVideoForTestAndAthlete(selectedTestType, athlete) !== undefined)
              .map((athlete) => (
                <option key={athlete} value={athlete}>
                  {athlete}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Video Comparison */}
      <div className="mt-6">
        {leftVideo && rightVideo ? (
          <EnhancedVideoComparison
            leftVideo={{
              src: leftVideo.url,
              title: `${leftAthlete} - ${selectedTestType}`,
            }}
            rightVideo={{
              src: rightVideo.url,
              title: `${rightAthlete} - ${selectedTestType}`,
            }}
            leftPerformanceData={leftPerformanceData}
            rightPerformanceData={rightPerformanceData}
            initialSyncState={true}
          />
        ) : (
          <div className="aspect-video flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <p className="text-zinc-500 dark:text-zinc-400">
              {!selectedTestType ? "Please select a test type" : "No videos available for this selection"}
            </p>
          </div>
        )}
      </div>

      {/* Performance Data Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left Athlete Performance */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{leftAthlete} Performance</h3>
          <div className="space-y-2">
            {leftPerformanceData
              .filter((data) => data.name === leftAthlete)
              .map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{data.uebung}:</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {data.ergebnis}
                    {data.uebung.includes("Sprint") ? "s" : ""}
                  </span>
                </div>
              ))}
            {leftPerformanceData.filter((data) => data.name === leftAthlete).length === 0 && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">No performance data available</p>
            )}
          </div>
        </div>

        {/* Right Athlete Performance */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{rightAthlete} Performance</h3>
          <div className="space-y-2">
            {rightPerformanceData
              .filter((data) => data.name === rightAthlete)
              .map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{data.uebung}:</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {data.ergebnis}
                    {data.uebung.includes("Sprint") ? "s" : ""}
                  </span>
                </div>
              ))}
            {rightPerformanceData.filter((data) => data.name === rightAthlete).length === 0 && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">No performance data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
