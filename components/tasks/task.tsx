import AppLayout from "@/components/layout"
import FinancialGoalList from "./financial-goal-list"

export default function Task() {
  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tasks</h1>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 md:p-6 border border-gray-200 dark:border-[#1F1F23]">
          <FinancialGoalList />
        </div>
      </div>
    </AppLayout>
  )
}
