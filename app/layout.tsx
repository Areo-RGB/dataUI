import type React from "react"
import "./globals.css"

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
