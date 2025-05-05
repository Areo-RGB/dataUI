import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "./performance-ranking"

export default function Sprint20mRanking({ className }: { className?: string }) {
  const data = getExerciseData("20m Sprint")

  return (
    <PerformanceRanking
      title="20m Sprint"
      displayTitle="20m Sprint Rankings"
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
    />
  )
}
