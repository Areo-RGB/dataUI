import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "@/components/performance/performance-ranking" // Maintain absolute import path

export default function GewandtheitRanking({ className }: { className?: string }) {
  const data = getExerciseData("Gewandtheit")

  return (
    <PerformanceRanking
      title="Gewandtheit" // Key for data lookup
      displayTitle="Gewandtheit Rankings" // Display title for UI
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
    />
  )
}
