import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "./performance-ranking"

export default function GewandtheitRanking({ className }: { className?: string }) {
  const data = getExerciseData("Gewandtheit")

  return (
    <PerformanceRanking
      title="Gewandtheit"
      displayTitle="Gewandtheit Rankings"
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
    />
  )
}
