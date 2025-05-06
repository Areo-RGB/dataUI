"use client"

import { formatDateForDisplay } from "@/lib/data"

interface VideoSelectionControlsProps {
  allAthletes: string[]
  selectedAthlete: string
  onAthleteChange: (value: string) => void

  testTypesForAthlete: string[]
  selectedTestType: string
  onTestTypeChange: (value: string) => void

  availableDates: string[]
  selectedDate: string | undefined
  onDateChange: (value: string | undefined) => void

  isLoading?: boolean
}

export default function VideoSelectionControls({
  allAthletes,
  selectedAthlete,
  onAthleteChange,
  testTypesForAthlete,
  selectedTestType,
  onTestTypeChange,
  availableDates,
  selectedDate,
  onDateChange,
  isLoading = false,
}: VideoSelectionControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Athlete Selector */}
      <div>
        <label htmlFor="athlete-select" className="block text-sm font-medium text-foreground mb-2">
          Select Athlete
        </label>
        <select
          id="athlete-select"
          value={selectedAthlete}
          onChange={(e) => onAthleteChange(e.target.value)}
          className="block w-full rounded-md border border-input bg-background py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary text-sm"
          disabled={isLoading}
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
        <label htmlFor="test-type" className="block text-sm font-medium text-foreground mb-2">
          Select Test Type
        </label>
        <select
          id="test-type"
          value={selectedTestType}
          onChange={(e) => onTestTypeChange(e.target.value)}
          className="block w-full rounded-md border border-input bg-background py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary text-sm"
          disabled={testTypesForAthlete.length === 0 || isLoading}
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
        <label htmlFor="date-select" className="block text-sm font-medium text-foreground mb-2">
          Select Date
        </label>
        <select
          id="date-select"
          value={selectedDate || ""}
          onChange={(e) => onDateChange(e.target.value || undefined)}
          className="block w-full rounded-md border border-input bg-background py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary text-sm"
          disabled={availableDates.length === 0 || isLoading}
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
  )
}
