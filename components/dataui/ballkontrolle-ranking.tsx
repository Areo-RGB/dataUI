import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "./performance-ranking"

export default function BallkontrolleRanking({ className }: { className?: string }) {
  const data = getExerciseData("Ballkontrolle")

  return (
    <PerformanceRanking
      title="Ballkontrolle Rankings"
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
    />
  )
}
