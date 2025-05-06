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
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card rounded-xl p-4 md:p-6 flex flex-col border border-border shadow-sm">
          <h2 className="text-lg font-bold text-card-foreground mb-4 text-left">Leistungsdiagnostik</h2>

          <Tabs defaultValue="schnelligkeit" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="schnelligkeit" className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-chart-1" />
                Schnelligkeit
              </TabsTrigger>
              <TabsTrigger value="beweglichkeit" className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-chart-2" />
                Beweglichkeit
              </TabsTrigger>
              <TabsTrigger value="technik" className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-chart-3" />
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
