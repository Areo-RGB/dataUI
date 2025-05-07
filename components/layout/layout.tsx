"use client"

import Sidebar from "@/components/layout/sidebar"
import type { LayoutProps } from "@/types/layout"

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background bg-gradient-to-br from-background to-background/90">
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
