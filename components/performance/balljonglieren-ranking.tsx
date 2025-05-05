import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "@/components/performance/performance-ranking"

export default function BalljonglierenRanking({ className }: { className?: string }) {
  const data = getExerciseData("Balljonglieren")

  return (
    <PerformanceRanking
      title="Balljonglieren Rankings"
      data={data}
      className={className}
      unit=""
      sortAscending={false}
    />
  )
}
