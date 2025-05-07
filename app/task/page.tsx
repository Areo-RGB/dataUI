"use client"
import Layout from "@/components/layout/layout"
import { Timeline } from "@/components/timeline"
import { Card } from "@/components/ui/card"

export default function Task() {
  const timelineData = [
    {
      title: "Finley Passen+",
      content: (
        <Card className="p-4 md:p-6">
          <div className="relative w-full max-w-[400px] mx-auto aspect-[9/16] mb-4 rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/EZX-tKDc1v4"
              title="YouTube video player"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="mr-2">03.05.2025</span>
            <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs">
              Completed
            </span>
          </div>
        </Card>
      ),
    },
  ]

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6 bg-gradient-to-b from-accent-4/20 to-transparent">
        <Timeline data={timelineData} />
      </div>
    </Layout>
  )
}
