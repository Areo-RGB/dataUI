import { cn } from "@/lib/utils"
import { Film } from "lucide-react"
import type { PerformanceData } from "@/lib/data"

interface PerformanceRankingProps {
  title: string
  data: PerformanceData[]
  className?: string
  unit?: string
  sortAscending?: boolean
}

export default function PerformanceRanking({
  title,
  data,
  className,
  unit = "s",
  sortAscending = true,
}: PerformanceRankingProps) {
  // Sort data based on result
  const sortedData = [...data].sort((a, b) => {
    const aResult = typeof a.ergebnis === "string" ? Number.parseFloat(a.ergebnis) : a.ergebnis
    const bResult = typeof b.ergebnis === "string" ? Number.parseFloat(b.ergebnis) : b.ergebnis
    return sortAscending ? aResult - bResult : bResult - aResult
  })

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border-2 border-blue-300 dark:border-blue-700/60"></div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">Benchmark</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border-2 border-amber-300 dark:border-amber-700/60"></div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">Player</span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          {sortedData.map((item, index) => {
            const isBenchmark = item.name.startsWith("DFB")
            const percentile = isBenchmark ? item.name.split("-")[1] : null

            return (
              <div
                key={`${item.name}-${index}`}
                className={cn(
                  "group flex items-center gap-3",
                  "p-2 rounded-lg",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                  "transition-all duration-200",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    "border-2",
                    isBenchmark
                      ? "border-blue-300 dark:border-blue-700/60"
                      : "border-amber-300 dark:border-amber-700/60",
                    "text-sm font-semibold",
                    "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
                  )}
                >
                  {index + 1}
                </div>

                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                      {item.name}
                      {isBenchmark && percentile && (
                        <span className="ml-1 text-[10px] text-zinc-500 dark:text-zinc-400">(P{percentile})</span>
                      )}
                    </h3>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                      {isBenchmark ? "DFB Benchmark" : item.kategorie}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 pl-3">
                    <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                      {item.ergebnis}
                      {unit}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-center",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-gradient-to-r from-zinc-900 to-zinc-800",
              "dark:from-zinc-50 dark:to-zinc-200",
              "text-zinc-50 dark:text-zinc-900",
              "hover:from-zinc-800 hover:to-zinc-700",
              "dark:hover:from-zinc-200 dark:hover:to-zinc-300",
              "shadow-sm hover:shadow",
              "transform transition-all duration-200",
              "hover:-translate-y-0.5",
              "active:translate-y-0",
              "focus:outline-none focus:ring-2",
              "focus:ring-zinc-500 dark:focus:ring-zinc-400",
              "focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
            )}
          >
            <Film className="w-4 h-4" />
          </button>
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-center",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-gradient-to-r from-zinc-900 to-zinc-800",
              "dark:from-zinc-50 dark:to-zinc-200",
              "text-zinc-50 dark:text-zinc-900",
              "hover:from-zinc-800 hover:to-zinc-700",
              "dark:hover:from-zinc-200 dark:hover:to-zinc-300",
              "shadow-sm hover:shadow",
              "transform transition-all duration-200",
              "hover:-translate-y-0.5",
              "active:translate-y-0",
              "focus:outline-none focus:ring-2",
              "focus:ring-zinc-500 dark:focus:ring-zinc-400",
              "focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
            )}
          >
            <Film className="w-4 h-4" />
          </button>
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-center",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-gradient-to-r from-zinc-900 to-zinc-800",
              "dark:from-zinc-50 dark:to-zinc-200",
              "text-zinc-50 dark:text-zinc-900",
              "hover:from-zinc-800 hover:to-zinc-700",
              "dark:hover:from-zinc-200 dark:hover:to-zinc-300",
              "shadow-sm hover:shadow",
              "transform transition-all duration-200",
              "hover:-translate-y-0.5",
              "active:translate-y-0",
              "focus:outline-none focus:ring-2",
              "focus:ring-zinc-500 dark:focus:ring-zinc-400",
              "focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
            )}
          >
            <Film className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
