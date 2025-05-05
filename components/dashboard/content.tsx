import { Zap, Activity, Brain } from "lucide-react"
import Sprint10mRanking from "@/components/performance/sprint-10m-ranking"
import Sprint20mRanking from "@/components/performance/sprint-20m-ranking"
import GewandtheitRanking from "@/components/performance/gewandtheit-ranking"
import DribblingRanking from "@/components/performance/dribbling-ranking"
import BallkontrolleRanking from "@/components/performance/ballkontrolle-ranking"
import BalljonglierenRanking from "@/components/performance/balljonglieren-ranking"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Content() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left">Leistungsdiagnostik</h2>

          <Tabs defaultValue="schnelligkeit" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="schnelligkeit" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Schnelligkeit
              </TabsTrigger>
              <TabsTrigger value="beweglichkeit" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Beweglichkeit
              </TabsTrigger>
              <TabsTrigger value="technik" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Technik
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schnelligkeit" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Sprint10mRanking />
                <Sprint20mRanking />
              </div>
            </TabsContent>

            <TabsContent value="beweglichkeit" className="space-y-6">
              <GewandtheitRanking />
            </TabsContent>

            <TabsContent value="technik" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DribblingRanking />
                <BallkontrolleRanking />
              </div>
              <BalljonglierenRanking />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
