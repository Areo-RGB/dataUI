import Layout from "./layout"
import List03 from "./list-03"
import { Calendar, CheckCircle2, Timer, AlertCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent } from "@/components/animate-ui/use-tabs"

export default function Task() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tasks</h1>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
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

            <TabsContents className="mt-6">
              <TabsContent value="all" className="space-y-4">
                <List03 />
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                <List03
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

              <TabsContent value="in-progress" className="space-y-4">
                <List03
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

              <TabsContent value="completed" className="space-y-4">
                <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">No completed tasks yet</div>
              </TabsContent>
            </TabsContents>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
