"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

type ThemeStyle = "default" | "vercel"

type ThemeContextType = {
  themeStyle: ThemeStyle
  setThemeStyle: (style: ThemeStyle) => void
}

const ThemeStyleContext = createContext<ThemeContextType | undefined>(undefined)

export function useThemeStyle() {
  const context = useContext(ThemeStyleContext)
  if (!context) {
    throw new Error("useThemeStyle must be used within a ThemeStyleProvider")
  }
  return context
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [themeStyle, setThemeStyle] = useState<ThemeStyle>("default")
  const [mounted, setMounted] = useState(false)

  // Handle theme style persistence
  useEffect(() => {
    setMounted(true)
    const savedStyle = localStorage.getItem("theme-style") as ThemeStyle | null
    if (savedStyle) {
      setThemeStyle(savedStyle)
    }
  }, [])

  // Save theme style to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme-style", themeStyle)

      // Apply theme style class to html element
      const html = document.documentElement
      html.classList.remove("default", "vercel")
      html.classList.add(themeStyle)
    }
  }, [themeStyle, mounted])

  return (
    <ThemeStyleContext.Provider value={{ themeStyle, setThemeStyle }}>
      <NextThemesProvider
        {...props}
        attribute="data-theme"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </ThemeStyleContext.Provider>
  )
}
