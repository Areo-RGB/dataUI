"use client"

import Layout from "@/components/layout/layout"
import VideoPlayer from "@/components/videos/video-player"
import EnhancedVideoComparison from "@/components/videos/enhanced-video-comparison"
import { Film, Clock, Calendar, User, BarChart2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getExerciseData, getAvailableTestTypes, getAthletesForTestType, getVideoForTestAndAthlete } from "@/lib/data"
import { useState } from "react"

// Sample performance metrics data for time-series visualization
// const sprintMetrics = [
//   {
//     id: "speed",
//     name: "Speed",
//     data: [
//       { time: 0, value: 0 },
//       { time: 0.5, value: 5 },
//       { time: 1, value: 12 },
//       { time: 1.5, value: 18 },
//       { time: 2, value: 22 },
//       { time: 2.5, value: 25 },
//       { time: 3, value: 27 },
//       { time: 3.5, value: 28 },
//       { time: 4, value: 28.5 },
//       { time: 4.5, value: 28 },
//       { time: 5, value: 27 },
//       { time: 5.5, value: 26 },
//       { time: 6, value: 25 },
//     ],
//   },
//   {
//     id: "heartRate",
//     name: "Heart Rate",
//     data: [
//       { time: 0, value: 80 },
//       { time: 1, value: 100 },
//       { time: 2, value: 120 },
//       { time: 3, value: 150 },
//       { time: 4, value: 170 },
//       { time: 5, value: 175 },
//       { time: 6, value: 180 },
//     ],
//   },
//   {
//     id: "distance",
//     name: "Distance",
//     data: [
//       { time: 0, value: 0 },
//       { time: 1, value: 5 },
//       { time: 2, value: 15 },
//       { time: 3, value: 30 },
//       { time: 4, value: 45 },
//       { time: 5, value: 60 },
//       { time: 6, value: 75 },
//     ],
//   },
// ]

export default function VideosPage() {
  // Get all available test types from videos
  const availableTestTypes = getAvailableTestTypes()

  // Default to the first available test type, or "Gewandtheit" if none
  const [selectedTestType, setSelectedTestType] = useState(availableTestTypes[0] || "Gewandtheit")

  // Get athletes that have videos for the selected test type
  const availableAthletes = getAthletesForTestType(selectedTestType)

  // Default to the first two athletes with videos for this test
  const athlete1 = availableAthletes[0] || "Finley"
  const athlete2 = availableAthletes[1] || "Bent"

  // Get performance data for the selected athletes
  const athlete1Data = getExerciseData(selectedTestType).filter(
    (data) => data.name === athlete1 || data.name.startsWith("DFB"),
  )

  const athlete2Data = getExerciseData(selectedTestType).filter(
    (data) => data.name === athlete2 || data.name.startsWith("DFB"),
  )

  // Get video data for the selected test type and athletes
  const athlete1Video = getVideoForTestAndAthlete(selectedTestType, athlete1)
  const athlete2Video = getVideoForTestAndAthlete(selectedTestType, athlete2)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Videos</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            {/* Test Type Selector */}
            <div className="mb-6">
              <label htmlFor="test-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Test Type
              </label>
              <select
                id="test-type"
                value={selectedTestType}
                onChange={(e) => setSelectedTestType(e.target.value)}
                className="block w-full max-w-xs rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 py-2 px-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
              >
                {availableTestTypes.map((testType) => (
                  <option key={testType} value={testType}>
                    {testType}
                  </option>
                ))}
              </select>
            </div>
            <Tabs defaultValue="single" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Training Session Analysis</h2>
                <TabsList>
                  <TabsTrigger value="single" className="flex items-center gap-2">
                    <Film className="w-4 h-4" />
                    Single View
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" />
                    Comparison
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="single" className="space-y-4">
                <VideoPlayer
                  src={athlete1Video?.url || ""}
                  title={`${athlete1} - ${selectedTestType} Test`}
                  poster="/placeholder.svg?key=2inki"
                />

                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {athlete1} - {selectedTestType} Test
                      </h3>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {athlete1Video?.description ||
                          `Detailed analysis of ${athlete1}'s performance in the ${selectedTestType} test.`}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-3">
                        <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                          <Calendar className="w-3.5 h-3.5 mr-1.5" />
                          <span>Recorded: {athlete1Video?.date || "N/A"}</span>
                        </div>
                        <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                          <Clock className="w-3.5 h-3.5 mr-1.5" />
                          <span>Duration: 2:34</span>
                        </div>
                        <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                          <User className="w-3.5 h-3.5 mr-1.5" />
                          <span>Athlete: {athlete1}</span>
                        </div>
                        <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                          <Film className="w-3.5 h-3.5 mr-1.5" />
                          <span>Category: {selectedTestType}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Coach Notes</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Finley demonstrates good agility with a time of 7.81 seconds in the Gewandtheit test. The athlete
                      shows natural fluidity in movement but needs to focus on maintaining better body control during
                      rapid direction changes. The transitions between cones could be more efficient with improved
                      anticipation and body positioning.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <EnhancedVideoComparison
                  leftVideo={{
                    src: athlete1Video?.url || "",
                    title: `${athlete1} - ${selectedTestType}`,
                  }}
                  rightVideo={{
                    src: athlete2Video?.url || "",
                    title: `${athlete2} - ${selectedTestType}`,
                  }}
                  leftPerformanceData={athlete1Data}
                  rightPerformanceData={athlete2Data}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{athlete1}'s Technique</h3>
                    <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                      <User className="w-3.5 h-3.5 mr-1.5" />
                      <span>
                        {selectedTestType}: {athlete1Data.find((d) => d.name === athlete1)?.ergebnis || "N/A"}s
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {athlete1Video?.description ||
                        `Analysis of ${athlete1}'s performance in the ${selectedTestType} test.`}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{athlete2}'s Technique</h3>
                    <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                      <User className="w-3.5 h-3.5 mr-1.5" />
                      <span>
                        {selectedTestType}: {athlete2Data.find((d) => d.name === athlete2)?.ergebnis || "N/A"}s
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {athlete2Video?.description ||
                        `Analysis of ${athlete2}'s performance in the ${selectedTestType} test.`}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Comparison Analysis</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    The side-by-side comparison reveals significant technique differences. Note the improved arm drive
                    in Alex's technique compared to Finley's. Body angle during acceleration phase shows better forward
                    lean in Alex's form, contributing to the improved 10m split times. The transition to upright running
                    position is smoother in Alex's technique and happens at the optimal point in the sprint.
                  </p>
                  <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      <strong>Pro Tip:</strong> Toggle the metrics overlay to see performance data for both athletes.
                      Use the frame-by-frame navigation (arrow buttons) to analyze specific technique differences at key
                      moments.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  )
}
