"use client"

import { ChevronDown, ChevronUp, Minimize, Maximize } from "lucide-react"
import { useState } from "react"
import Sprint10mRanking from "@/components/performance/sprint-10m-ranking"
import Sprint20mRanking from "@/components/performance/sprint-20m-ranking"
import GewandtheitRanking from "@/components/performance/gewandtheit-ranking"
import DribblingRanking from "@/components/performance/dribbling-ranking"
import BallkontrolleRanking from "@/components/performance/ballkontrolle-ranking"
import BalljonglierenRanking from "@/components/performance/balljonglieren-ranking"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Content() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [cardsCollapsed, setCardsCollapsed] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleAllCards = () => {
    setCardsCollapsed(!cardsCollapsed)
  }

  return (
    <div className="space-y-6 md:space-y-8 p-2">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card rounded-xl p-5 md:p-7 flex flex-col border border-border shadow-xl relative overflow-hidden backdrop-blur-sm bg-card/80 mx-2 my-3">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/10 to-transparent -z-10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/5 to-transparent -z-10 rounded-tr-full"></div>
          
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-card-foreground flex items-center">
              <span className="mr-2 inline-block w-1 h-6 bg-chart-1 rounded-full"></span>
              Leistungsdiagnostik
            </h2>
            <div className="flex items-center gap-2">
              {isExpanded && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAllCards}
                  className="text-xs flex items-center gap-1"
                >
                  {cardsCollapsed ? <Maximize className="w-3.5 h-3.5" /> : <Minimize className="w-3.5 h-3.5" />}
                  {cardsCollapsed ? "Expand All" : "Collapse All"}
                </Button>
              )}
              <button 
                onClick={toggleExpanded} 
                className="flex items-center justify-center p-2 rounded-md hover:bg-muted/50 transition-colors"
                aria-expanded={isExpanded}
                aria-label={isExpanded ? "Collapse section" : "Expand section"}
              >
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <div 
            className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden",
              isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Sprint10mRanking initialCollapsed={cardsCollapsed} />
                <Sprint20mRanking initialCollapsed={cardsCollapsed} />
              </div>
              
              <GewandtheitRanking initialCollapsed={cardsCollapsed} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DribblingRanking initialCollapsed={cardsCollapsed} />
                <BallkontrolleRanking initialCollapsed={cardsCollapsed} />
              </div>
              
              <BalljonglierenRanking initialCollapsed={cardsCollapsed} />
            </div>
          </div>
          
          {!isExpanded && (
            <div className="text-center py-2 text-muted-foreground text-sm">
              Click to view performance metrics
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
