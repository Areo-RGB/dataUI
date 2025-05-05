import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "@/components/performance/performance-ranking" // Maintain absolute import path

export default function BallkontrolleRanking({ className }: { className?: string }) {
  const data = getExerciseData("Ballkontrolle")

  return (
    <PerformanceRanking
      title="Ballkontrolle" // Key for data lookup
      displayTitle="Ballkontrolle Rankings" // Display title for UI
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
    />
  )
}
