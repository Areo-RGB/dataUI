import { Calendar, Timer, AlertCircle, CheckCircle2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Layout from "@/components/layout"

export default function Task() {
  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tasks</h1>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 md:p-6 border border-gray-200 dark:border-[#1F1F23]">
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
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
