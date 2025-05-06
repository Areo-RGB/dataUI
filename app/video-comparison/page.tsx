"use client"

import { useState } from "react"
import Layout from "@/components/layout/layout"
import VideoPlayer from "@/components/videos/video-player" // Existing player
import NextVideoPlayer from "@/components/videos/next-video-player" // New next-video player

// This would be an imported video asset in a real implementation
// import demoVideo from 'next-video:./demo.mp4'

export default function VideoComparisonPage() {
  const [activeTab, setActiveTab] = useState<"current" | "next">("current")

  // Sample video URL - in a real implementation, you would use your actual video URLs
  const videoUrl = "https://data3.fra1.cdn.digitaloceanspaces.com/sprint1.webm"

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Video Player Comparison</h1>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-card-foreground">Compare Video Players</h2>

            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              <button
                className={`py-2 px-4 font-medium text-sm ${
                  activeTab === "current"
                    ? "text-chart-1 border-b-2 border-chart-1"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("current")}
              >
                Current Player
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${
                  activeTab === "next"
                    ? "text-chart-2 border-b-2 border-chart-2"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("next")}
              >
                Next-Video Player
              </button>
            </div>

            {/* Player Display */}
            <div className="mt-6">
              {activeTab === "current" ? (
                <div className="space-y-4">
                  <VideoPlayer src={videoUrl} title="Current Video Player" poster="/placeholder.svg?key=2inki" />
                  <div className="p-4 bg-chart-1/10 rounded-lg border border-chart-1/20 shadow-sm">
                    <h3 className="text-sm font-medium text-chart-1 mb-2">Current Player Features</h3>
                    <ul className="list-disc pl-5 text-sm text-chart-1/80 space-y-1">
                      <li>Custom controls with play/pause, volume, and fullscreen</li>
                      <li>Frame-by-frame navigation</li>
                      <li>Video annotations support</li>
                      <li>Performance overlay integration</li>
                      <li>Direct DOM access for custom functionality</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <NextVideoPlayer
                    src={videoUrl} // In a real implementation, use: demoVideo
                    title="Next-Video Player with Mux"
                    poster="/placeholder.svg?key=2inki"
                  />
                  <div className="p-4 bg-chart-2/10 rounded-lg border border-chart-2/20 shadow-sm">
                    <h3 className="text-sm font-medium text-chart-2 mb-2">Next-Video Player Features</h3>
                    <ul className="list-disc pl-5 text-sm text-chart-2/80 space-y-1">
                      <li>Automatic video optimization via Mux</li>
                      <li>Adaptive streaming for better performance</li>
                      <li>Automatic thumbnail generation</li>
                      <li>Responsive design across devices</li>
                      <li>Built-in analytics capabilities</li>
                      <li>Simplified video management</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
