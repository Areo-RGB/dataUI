import DashboardContent from "@/components/dashboard/content"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h1 className="text-2xl font-bold mb-6 font-display">Sports Performance Dashboard</h1>
      <p className="text-muted-foreground mb-8 font-sans">
        View key performance metrics and analysis for athletes and teams.
      </p>
      <DashboardContent />
    </div>
  )
}
