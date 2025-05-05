import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "./performance-ranking"

export default function DribblingRanking({ className }: { className?: string }) {
  const data = getExerciseData("Dribbling")

  return (
    <PerformanceRanking
      title="Dribbling"
      displayTitle="Dribbling Rankings"
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
    />
  )
}
