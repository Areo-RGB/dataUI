"use client"

import { useEffect } from "react"

export function PWARegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.workbox !== undefined) {
      const wb = window.workbox

      // Add event listeners to handle PWA lifecycle events
      wb.addEventListener("installed", (event) => {
        console.log(`PWA installed: ${event.type}`)
      })

      wb.addEventListener("controlling", (event) => {
        console.log(`PWA controlling: ${event.type}`)
      })

      wb.addEventListener("activated", (event) => {
        console.log(`PWA activated: ${event.type}`)
      })

      // Send a message to the service worker to update the offline page
      // when the user navigates to a new page
      const refreshOffline = () => {
        if (navigator.onLine) {
          const event = new Event("refreshOffline")
          navigator.serviceWorker.controller?.postMessage({ type: "REFRESH_OFFLINE" })
          dispatchEvent(event)
        }
      }

      // Add event listener for page navigation
      window.addEventListener("load", refreshOffline)
    }
  }, [])

  return null
}
