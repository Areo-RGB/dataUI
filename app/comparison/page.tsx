import Layout from "@/components/layout/layout"
import ComparisonView from "@/components/comparison/comparison-view"

export default function ComparisonPage() {
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 md:px-6 bg-gradient-to-b from-accent-4/20 to-transparent">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Vergleich</h1>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-sm">
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-card-foreground">Athlete Comparison</h2>
                <ComparisonView />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
