import type React from "react"
import { poppins, lexend } from "@/lib/fonts"
import "./globals.css"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Finley Dashboard",
  description: "A modern sports analytics dashboard",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Finley Dashboard",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(poppins.variable, lexend.variable)}>
      <head>
        <meta name="application-name" content="Finley Dashboard" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Finley Dashboard" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={cn("bg-background text-foreground font-sans")}>{children}</body>
    </html>
  )
}
