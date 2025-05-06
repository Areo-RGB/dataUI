import type React from "react"
import "./globals.css"
import { cn } from "@/lib/utils"
import { geistSans, geistMono, serif } from "@/lib/fonts"

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
    <html lang="en" className={cn(geistSans.variable, geistMono.variable, serif.variable)}>
      <body className={cn("bg-background text-foreground font-sans")}>{children}</body>
    </html>
  )
}
