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
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card rounded-xl p-5 md:p-7 flex flex-col border border-border shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/5 to-transparent -z-10 rounded-bl-full"></div>

          <h2 className="text-xl font-bold text-card-foreground mb-5 text-left flex items-center">
            <span className="mr-2 inline-block w-1 h-6 bg-chart-1 rounded-full"></span>
            Leistungsdiagnostik
          </h2>

          <Tabs defaultValue="schnelligkeit" className="w-full">
            <TabsList className="mb-6 p-1 bg-muted/50 rounded-lg">
              <TabsTrigger
                value="schnelligkeit"
                className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                <Zap className="w-4 h-4 text-chart-1" />
                Schnelligkeit
              </TabsTrigger>
              <TabsTrigger
                value="beweglichkeit"
                className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                <Activity className="w-4 h-4 text-chart-2" />
                Beweglichkeit
              </TabsTrigger>
              <TabsTrigger
                value="technik"
                className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
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
