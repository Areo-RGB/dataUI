import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "./performance-ranking"

export default function Sprint10mRanking({ className }: { className?: string }) {
  const data = getExerciseData("10m Sprint")

  return (
    <PerformanceRanking
      title="10m Sprint"
      displayTitle="10m Sprint Rankings"
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
    />
  )
}
