import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "@/components/performance/performance-ranking" // Maintain absolute import path

export default function BalljonglierenRanking({ className }: { className?: string }) {
  const data = getExerciseData("Balljonglieren")

  return (
    <PerformanceRanking
      title="Balljonglieren" // Key for data lookup
      displayTitle="Balljonglieren Rankings" // Display title for UI
      data={data}
      className={className}
      unit="Punkte" // Using appropriate unit for this exercise
      sortAscending={false}
    />
  )
}
