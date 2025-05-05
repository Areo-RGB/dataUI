"use client"

import { useState, useCallback, useMemo } from "react"
import type { UseSortableDataResult } from "@/types/hooks"
import type { SortDirection } from "@/types/common"

/**
 * Hook for sorting data
 * @param data The data to sort
 * @param defaultSortKey The default key to sort by
 * @param defaultDirection The default sort direction
 * @returns Object with sorted items, sort request function, and current sort config
 */
export function useSortableData<T>(
  data: T[],
  defaultSortKey?: keyof T,
  defaultDirection: SortDirection = "asc",
): UseSortableDataResult<T> {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null
    direction: SortDirection
  }>({
    key: defaultSortKey || null,
    direction: defaultDirection,
  })

  const sortedItems = useMemo(() => {
    const sortableItems = [...data]
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key!]
        const bValue = b[sortConfig.key!]

        // Handle string/number comparison
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        // Convert to numbers for comparison if needed
        const aNum = typeof aValue === "string" ? Number.parseFloat(aValue) : Number(aValue)
        const bNum = typeof bValue === "string" ? Number.parseFloat(bValue) : Number(bValue)

        return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum
      })
    }
    return sortableItems
  }, [data, sortConfig])

  const requestSort = useCallback((key: keyof T) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }, [])

  return {
    items: sortedItems,
    requestSort,
    sortConfig,
  }
}
