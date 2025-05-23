"use client"

import Layout from "@/components/layout/layout"
import VideoPlayer from "@/components/videos/video-player"
import { Film, Clock, Calendar, User } from "lucide-react"
import { formatDateForDisplay } from "@/lib/data"
import { useVideoSelection } from "@/hooks/use-video-selection"
import VideoSelectionControls from "@/components/videos/video-selection-controls"

export default function VideosPage() {
  const {
    selectedAthlete,
    setSelectedAthlete,
    selectedTestType,
    setSelectedTestType,
    selectedDate,
    setSelectedDate,
    allAthletes,
    testTypesForAthlete,
    availableDates,
    athleteVideo,
    athleteData,
    annotationCount,
    isLoading,
  } = useVideoSelection()

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6 bg-gradient-to-b from-accent-4/20 to-transparent">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Videos</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-sm">
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-card-foreground">Training Session Analysis</h2>

              {/* Selection Controls Component */}
              <VideoSelectionControls
                allAthletes={allAthletes}
                selectedAthlete={selectedAthlete}
                onAthleteChange={setSelectedAthlete}
                testTypesForAthlete={testTypesForAthlete}
                selectedTestType={selectedTestType}
                onTestTypeChange={setSelectedTestType}
                availableDates={availableDates}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                isLoading={isLoading}
              />

              {/* Video Player */}
              <div className="mt-6">
                {isLoading ? (
                  <div className="aspect-video flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                  </div>
                ) : athleteVideo ? (
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

              {/* Video Details Section */}
              {!isLoading && (
                <div className="mt-4 space-y-4">
                  {/* Video Details */}
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-card-foreground">
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
                      <h4 className="text-sm font-semibold text-card-foreground mb-2">Performance Data</h4>
                      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">Result:</span>
                          <span className="text-sm font-medium text-card-foreground">
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
                      <h4 className="text-sm font-semibold text-card-foreground mb-2">Annotations</h4>
                      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">Available annotations:</span>
                          <span className="text-sm font-medium text-card-foreground">{annotationCount}</span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          Annotations will appear automatically during video playback
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Coach Notes */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-sm font-semibold text-card-foreground mb-2">Coach Notes</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {selectedAthlete} demonstrates good technique with a time of{" "}
                      {athleteData.find((d) => d.name === selectedAthlete)?.ergebnis || "N/A"} in the {selectedTestType}{" "}
                      test. The athlete shows natural fluidity in movement but needs to focus on maintaining better body
                      control during rapid direction changes.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
