import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "@/components/performance/performance-ranking" // Maintain absolute import path

export default function DribblingRanking({ className }: { className?: string }) {
  const data = getExerciseData("Dribbling")

  return (
    <PerformanceRanking
      title="Dribbling" // Key for data lookup
      displayTitle="Dribbling Rankings" // Display title for UI
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
    />
  )
}
