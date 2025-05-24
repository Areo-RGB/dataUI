import { getExerciseData } from "@/lib/data"
import PerformanceRanking from "@/components/performance/performance-ranking" // Maintain absolute import path

export default function Sprint20mRanking({ className, initialCollapsed }: { className?: string, initialCollapsed?: boolean }) {
  const data = getExerciseData("20m Sprint")

  return (
    <PerformanceRanking
      title="20m Sprint" // Key for data lookup
      displayTitle="20m Sprint Rankings" // Display title for UI
      data={data}
      className={className}
      unit="s"
      sortAscending={true}
      initialCollapsed={initialCollapsed}
    />
  )
}
