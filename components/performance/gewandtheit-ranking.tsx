import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "@/components/performance/performance-ranking"

export default function GewandtheitRanking({ className }: { className?: string }) {
  const data = getExerciseData("Gewandtheit")

  return (
    <PerformanceRanking title="Gewandtheit Rankings" data={data} className={className} unit="s" sortAscending={true} />
  )
}
