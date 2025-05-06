import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Finley Dashboard",
  description: "A modern sports analytics dashboard",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body className={cn("bg-background text-foreground font-sans")}>{children}</body>
    </html>
  )
}
