import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "@/components/performance/performance-ranking" // Maintain absolute import path

export default function Sprint10mRanking({ className, initialCollapsed }: { className?: string, initialCollapsed?: boolean }) {
  const data = getExerciseData("10m Sprint")

  return (
    <PerformanceRanking
      title="10m Sprint" // Key for data lookup
      displayTitle="10m Sprint Rankings" // Display title for UI
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
      initialCollapsed={initialCollapsed}
    />
  )
}
