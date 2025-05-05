"use client"

import Layout from "@/components/layout/layout"
import VideoPlayer from "@/components/videos/video-player"
import { Film, Clock, Calendar, User } from "lucide-react"
import {
  getExerciseData,
  getAvailableAthletes,
  getTestTypesForAthlete,
  getVideoByAthleteTestAndDate,
  getDatesForAthleteAndTest,
  formatDateForDisplay,
} from "@/lib/data"
import { useState, useEffect } from "react"
import { getAnnotationsForVideo } from "@/lib/annotations"

export default function VideosPage() {
  // Get all available athletes
  const allAthletes = getAvailableAthletes()

  // State for selections
  const [selectedAthlete, setSelectedAthlete] = useState(allAthletes[0] || "")
  const [selectedTestType, setSelectedTestType] = useState("")
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined)

  // Get test types available for the selected athlete
  const testTypesForAthlete = getTestTypesForAthlete(selectedAthlete)

  // Get dates available for the selected athlete and test type
  const availableDates =
    selectedAthlete && selectedTestType ? getDatesForAthleteAndTest(selectedAthlete, selectedTestType) : []

  // Initialize test type when athlete changes
  useEffect(() => {
    if (selectedAthlete && testTypesForAthlete.length > 0) {
      setSelectedTestType(testTypesForAthlete[0])
      setSelectedDate(undefined) // Reset date when athlete changes
    }
  }, [selectedAthlete, testTypesForAthlete])

  // Reset date when test type changes
  useEffect(() => {
    setSelectedDate(undefined)
  }, [selectedTestType])

  // Get video data for the selected athlete, test type, and date
  const athleteVideo =
    selectedAthlete && selectedTestType
      ? getVideoByAthleteTestAndDate(selectedAthlete, selectedTestType, selectedDate)
      : undefined

  // Get performance data for the selected athlete
  const athleteData = selectedTestType
    ? getExerciseData(selectedTestType).filter((data) => data.name === selectedAthlete || data.name.startsWith("DFB"))
    : []

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Videos</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Training Session Analysis</h2>

              {/* Selection Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Athlete Selector */}
                <div>
                  <label
                    htmlFor="athlete-select"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Select Athlete
                  </label>
                  <select
                    id="athlete-select"
                    value={selectedAthlete}
                    onChange={(e) => setSelectedAthlete(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
                  >
                    {allAthletes.map((athlete) => (
                      <option key={athlete} value={athlete}>
                        {athlete}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Test Type Selector */}
                <div>
                  <label
                    htmlFor="test-type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Select Test Type
                  </label>
                  <select
                    id="test-type"
                    value={selectedTestType}
                    onChange={(e) => setSelectedTestType(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
                    disabled={testTypesForAthlete.length === 0}
                  >
                    {testTypesForAthlete.length > 0 ? (
                      testTypesForAthlete.map((testType) => (
                        <option key={testType} value={testType}>
                          {testType}
                        </option>
                      ))
                    ) : (
                      <option value="">No test types available</option>
                    )}
                  </select>
                </div>

                {/* Date Selector */}
                <div>
                  <label
                    htmlFor="date-select"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Select Date
                  </label>
                  <select
                    id="date-select"
                    value={selectedDate || ""}
                    onChange={(e) => setSelectedDate(e.target.value || undefined)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
                    disabled={availableDates.length === 0}
                  >
                    <option value="">Latest</option>
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {formatDateForDisplay(date)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Video Player */}
              <div className="mt-6">
                {athleteVideo ? (
                  <VideoPlayer
                    src={athleteVideo.url}
                    title={`${selectedAthlete} - ${selectedTestType} Test`}
                    poster="/placeholder.svg?key=2inki"
                  />
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                    <p className="text-zinc-500 dark:text-zinc-400">No video available for this selection</p>
                  </div>
                )}
              </div>

              {/* Video Details */}
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {selectedAthlete} - {selectedTestType} Test
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {athleteVideo?.description ||
                        `Detailed analysis of ${selectedAthlete}'s performance in the ${selectedTestType} test.`}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3">
                      <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        <span>Recorded: {formatDateForDisplay(athleteVideo?.date)}</span>
                      </div>
                      <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        <span>Duration: 2:34</span>
                      </div>
                      <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                        <User className="w-3.5 h-3.5 mr-1.5" />
                        <span>Athlete: {selectedAthlete}</span>
                      </div>
                      <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                        <Film className="w-3.5 h-3.5 mr-1.5" />
                        <span>Category: {selectedTestType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Data */}
                {athleteData.length > 0 && (
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Performance Data</h4>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">Result:</span>
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {athleteData.find((d) => d.name === selectedAthlete)?.ergebnis || "N/A"}
                          {selectedTestType.includes("Sprint") ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Annotations */}
                {athleteVideo && (
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Annotations</h4>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">Available annotations:</span>
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {athleteVideo ? getAnnotationsForVideo(athleteVideo.url).length : 0}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Annotations will appear automatically during video playback
                      </p>
                    </div>
                  </div>
                )}

                {/* Coach Notes */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Coach Notes</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {selectedAthlete} demonstrates good technique with a time of{" "}
                    {athleteData.find((d) => d.name === selectedAthlete)?.ergebnis || "N/A"} in the {selectedTestType}{" "}
                    test. The athlete shows natural fluidity in movement but needs to focus on maintaining better body
                    control during rapid direction changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
