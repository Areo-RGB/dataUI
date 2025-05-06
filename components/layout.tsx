"use client"

import type { ReactNode } from "react"

export interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <div>{children}</div>
}
