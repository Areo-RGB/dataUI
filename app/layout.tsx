import type React from "react"
import { Inter, Open_Sans } from "next/font/google"
import "./globals.css"
import "./theme.css"
import { ThemeProvider } from "@/components/theme/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

// Update the metadata title
export const metadata = {
  title: "Finley Dashboard",
  description: "A modern sports analytics dashboard with theme switching",
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
      <body className={`${inter.variable} ${openSans.variable} font-sans`}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
