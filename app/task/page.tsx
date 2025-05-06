import { Calendar, Timer, AlertCircle, CheckCircle2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Layout from "@/components/layout/layout"
import FinancialGoalList from "@/components/tasks/financial-goal-list"

export default function Task() {
  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tasks</h1>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 md:p-6 border border-gray-200 dark:border-[#1F1F23]">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                All Tasks
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Pending
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                In Progress
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6 space-y-4">
              <FinancialGoalList />
            </TabsContent>

            <TabsContent value="pending" className="mt-6 space-y-4">
              <FinancialGoalList
                items={[
                  {
                    id: "2",
                    title: "Stock Portfolio",
                    subtitle: "Tech sector investment plan",
                    icon: Timer,
                    iconStyle: "investment",
                    date: "Target: Jun 2024",
                    amount: "$50,000",
                    status: "pending",
                    progress: 30,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="in-progress" className="mt-6 space-y-4">
              <FinancialGoalList
                items={[
                  {
                    id: "1",
                    title: "Emergency Fund",
                    subtitle: "3 months of expenses saved",
                    icon: AlertCircle,
                    iconStyle: "savings",
                    date: "Target: Dec 2024",
                    amount: "$15,000",
                    status: "in-progress",
                    progress: 65,
                  },
                  {
                    id: "3",
                    title: "Debt Repayment",
                    subtitle: "Student loan payoff plan",
                    icon: AlertCircle,
                    iconStyle: "debt",
                    date: "Target: Mar 2025",
                    amount: "$25,000",
                    status: "in-progress",
                    progress: 45,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="completed" className="mt-6 space-y-4">
              <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">No completed tasks yet</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
