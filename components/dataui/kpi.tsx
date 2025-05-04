"use client"

import Layout from "./layout"
import { cn } from "@/lib/utils"
import { getExerciseData } from "@/lib/data"
import { useState } from "react"

// Update the getBestResult function to filter out DFB benchmark results
function getBestResult(exerciseName: string) {
  const data = getExerciseData(exerciseName)
  // Filter out DFB benchmark results
  const playerData = data.filter((item) => !item.name.startsWith("DFB"))

  if (!playerData.length) return { name: "N/A", result: "N/A", unit: "" }

  // Sort data based on exercise (some are better with higher values, others with lower)
  const sortAscending = !["Balljonglieren", "YoYo IR1"].includes(exerciseName)

  const sorted = [...playerData].sort((a, b) => {
    const aResult = typeof a.ergebnis === "string" ? Number.parseFloat(a.ergebnis) : a.ergebnis
    const bResult = typeof b.ergebnis === "string" ? Number.parseFloat(b.ergebnis) : b.ergebnis
    return sortAscending ? aResult - bResult : bResult - aResult
  })

  const best = sorted[0]
  const unit = ["Balljonglieren", "YoYo IR1"].includes(exerciseName) ? "" : "s"

  return {
    name: best.name,
    result: best.ergebnis,
    unit,
  }
}

// Card data for the 6 KPI cards
const kpiCards = [
  {
    title: "10m Sprint",
    category: "Schnelligkeit",
    hoverImage: "https://i.giphy.com/media/3o7abuqxszgO6pFb3i/giphy.gif",
    ...getBestResult("10m Sprint"),
  },
  {
    title: "20m Sprint",
    category: "Schnelligkeit",
    hoverImage: "https://i.giphy.com/media/l41lVsYDBC0UVQJCE/giphy.gif",
    ...getBestResult("20m Sprint"),
  },
  {
    title: "Gewandtheit",
    category: "Beweglichkeit",
    hoverImage: "https://i.giphy.com/media/3oEduOXu3DBfTazzaw/giphy.gif",
    ...getBestResult("Gewandtheit"),
  },
  {
    title: "Dribbling",
    category: "Technik",
    hoverImage: "https://i.giphy.com/media/l4FGtHYMx5oq0SBOw/giphy.gif",
    ...getBestResult("Dribbling"),
  },
  {
    title: "Ballkontrolle",
    category: "Technik",
    hoverImage: "https://i.giphy.com/media/3o7btNUB3OTaSNX63C/giphy.gif",
    ...getBestResult("Ballkontrolle"),
  },
  {
    title: "Balljonglieren",
    category: "Technik",
    hoverImage: "https://i.giphy.com/media/xT9DPldJHzZKtOnEn6/giphy.gif",
    ...getBestResult("Balljonglieren"),
  },
]

// Update the KPICard component to use inline styles for dynamic images
function KPICard({
  title,
  category,
  name,
  result,
  unit,
  hoverImage,
}: {
  title: string
  category: string
  name: string
  result: string | number
  unit: string
  hoverImage: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="w-full">
      <div
        className={cn(
          "w-full cursor-pointer overflow-hidden relative card aspect-square rounded-xl shadow-sm flex flex-col justify-between p-6",
          "bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800",
          "transition-all duration-500",
        )}
        style={{
          backgroundImage: isHovered ? `url(${hoverImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dark overlay when hovered */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-0"></div>
        )}

        {/* Content when not hovered */}
        <div className={cn("transition-opacity duration-300 z-10 relative", isHovered ? "opacity-0" : "opacity-100")}>
          <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 inline-flex">
            <span className="text-sm font-medium">{category}</span>
          </div>
        </div>

        <div
          className={cn(
            "transition-opacity duration-300 z-10 relative text-center",
            isHovered ? "opacity-0" : "opacity-100",
          )}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{title}</h2>
          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              {result}
              {unit}
            </span>
            <span className="text-base text-zinc-600 dark:text-zinc-400">{name}</span>
          </div>
        </div>

        {/* Content when hovered */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="text-center p-4">
            <h1 className="font-bold text-xl md:text-2xl text-white">{title}</h1>
            <p className="font-normal text-sm text-white mt-2">View detailed performance metrics</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function KPI() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Key Performance Indicators</h1>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpiCards.map((card, index) => (
              <KPICard
                key={index}
                title={card.title}
                category={card.category}
                name={card.name}
                result={card.result}
                unit={card.unit}
                hoverImage={card.hoverImage}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
