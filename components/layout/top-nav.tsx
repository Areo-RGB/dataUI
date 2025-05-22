"use client"
import { Bell, ChevronRight } from "lucide-react"
import Link from "next/link"
// Remove this line
// import { ThemeToggle } from "@/components/theme/theme-toggle"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function TopNav() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "dataUI", href: "#" },
    { label: "dashboard", href: "#" },
  ]

  return (
    <nav className="px-3 sm:px-6 flex flex-wrap items-center justify-between gap-y-2 bg-background border-b border-border min-h-16 py-2 md:h-full md:py-0">
      <div className="hidden">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          className="hidden p-1.5 sm:p-2 hover:bg-accent rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        </button>

        {/* Remove the ThemeToggle component that was here */}
      </div>
    </nav>
  )
}
