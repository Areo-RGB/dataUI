import Layout from "@/components/layout/layout"
import ComparisonView from "@/components/comparison/comparison-view"

export default function ComparisonPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Vergleich</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Athlete Comparison</h2>
              <ComparisonView />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
