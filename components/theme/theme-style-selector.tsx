"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useThemeStyle } from "./theme-provider"

export function ThemeStyleSelector() {
  const { themeStyle, setThemeStyle } = useThemeStyle()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Palette className="h-5 w-5" />
          <span className="sr-only">Select theme style</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setThemeStyle("default")}
          className={themeStyle === "default" ? "bg-accent text-accent-foreground" : ""}
        >
          Default
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setThemeStyle("vercel")}
          className={themeStyle === "vercel" ? "bg-accent text-accent-foreground" : ""}
        >
          Vercel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
