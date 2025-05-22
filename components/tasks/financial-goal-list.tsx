import { cn } from "@/lib/utils"
import { Calendar, ArrowRight, CheckCircle2, Timer, AlertCircle, PiggyBank, TrendingUp, CreditCard } from "lucide-react"
import React from "react"
import type { ListItem, FinancialGoalListProps, IconStylesConfig, StatusConfigMap } from "@/types/tasks"

const iconStyles: IconStylesConfig = {
  savings: "bg-muted text-foreground",
  investment: "bg-muted text-foreground",
  debt: "bg-muted text-foreground",
}

const statusConfig: StatusConfigMap = {
  pending: {
    icon: Timer,
    class: "text-chart-1",
    bg: "bg-chart-1/10",
  },
  "in-progress": {
    icon: AlertCircle,
    class: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  completed: {
    icon: CheckCircle2,
    class: "text-chart-2", // Was text-emerald-500
    bg: "bg-chart-2/10",   // Was bg-emerald-500/10
  },
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Emergency Fund",
    subtitle: "3 months of expenses saved",
    icon: PiggyBank,
    iconStyle: "savings",
    date: "Target: Dec 2024",
    amount: "$15,000",
    status: "in-progress",
    progress: 65,
  },
  {
    id: "2",
    title: "Stock Portfolio",
    subtitle: "Tech sector investment plan",
    icon: TrendingUp,
    iconStyle: "investment",
    date: "Target: Jun 2024",
    amount: "$50,000",
    status: "pending",
    progress: 30,
  },
  {
    id: "3",
    title: "Debt Repayment",
    subtitle: "Student loan payoff plan",
    icon: CreditCard,
    iconStyle: "debt",
    date: "Target: Mar 2025",
    amount: "$25,000",
    status: "in-progress",
    progress: 45,
  },
]

export default function FinancialGoalList({ items = ITEMS, className }: FinancialGoalListProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col gap-3 p-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col",
              "w-full", // Changed from w-[280px] shrink-0 to w-full
              "bg-card",
              "rounded-xl",
              "border border-border",
              "hover:border-border/80",
              "transition-all duration-200",
              "shadow-sm backdrop-blur-xl",
            )}
          >
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-lg", iconStyles[item.iconStyle as keyof typeof iconStyles])}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                    statusConfig[item.status].bg,
                    statusConfig[item.status].class,
                  )}
                >
                  {React.createElement(statusConfig[item.status].icon, { className: "w-3.5 h-3.5" })}
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-card-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.subtitle}</p>
              </div>

              {typeof item.progress === "number" && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-card-foreground">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        item.status === "pending"
                          ? "bg-chart-1"
                          : item.status === "in-progress"
                            ? "bg-chart-2"
                            : "bg-chart-2", // Was bg-emerald-500
                      )}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {item.amount && (
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-card-foreground">{item.amount}</span>
                  <span className="text-xs text-muted-foreground">target</span>
                </div>
              )}

              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>{item.date}</span>
              </div>
            </div>

            <div className="mt-auto border-t border-border">
              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2",
                  "py-2.5 px-3",
                  "text-xs font-medium",
                  "text-muted-foreground",
                  "hover:text-foreground",
                  "hover:bg-muted/80",
                  "transition-colors duration-200",
                )}
              >
                View Details
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
