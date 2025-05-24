"use client"

import type React from "react"
import type { LucideIcon } from "lucide-react"
import { Home, Menu, ClipboardList, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: LucideIcon
    children: React.ReactNode
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="group flex items-center px-3 py-2.5 text-sm rounded-md transition-all duration-200 text-sidebar-foreground/90 hover:text-sidebar-primary hover:bg-sidebar-accent relative overflow-hidden"
      >
        <span className="absolute left-0 top-0 h-full w-0.5 bg-primary/0 group-hover:bg-primary/70 transition-all duration-200"></span>
        <Icon className="h-4 w-4 mr-3 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
        <span className="flex-1">{children}</span>
        <ChevronRight className="h-3.5 w-3.5 text-sidebar-foreground/30 group-hover:text-sidebar-foreground/70 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-sidebar shadow-md hover:bg-sidebar-accent transition-colors duration-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>
      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] w-64 bg-sidebar transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:w-64 border-r border-sidebar-border shadow-xl
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 flex items-center border-b border-sidebar-border bg-gradient-to-r from-sidebar-accent/20 to-transparent">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex-shrink-0 relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10033-jR3tFDqOJWyEt8gIXb69i6DKZk5mWM.png"
                  alt="Finley Logo"
                  width={32}
                  height={32}
                  className="flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
              <span className="text-lg font-semibold text-sidebar-foreground">Finley</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-8">
              <div>
                <div className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60 flex items-center">
                  <span className="flex-1">Overview</span>
                  <span className="h-px flex-1 bg-sidebar-border/50"></span>
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t border-sidebar-border bg-gradient-to-t from-sidebar-accent/10 to-transparent">
            <div className="flex items-center">
              <span className="text-sm font-medium text-sidebar-foreground/70">Finley Dashboard</span>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-base-1000 bg-opacity-50 backdrop-blur-sm z-[65] lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
