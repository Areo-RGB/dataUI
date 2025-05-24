// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

const CACHE = "finley-dashboard-offline"

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("[PWA] Cached offline page during install")
      return cache.addAll([
        "/offline",
        "/",
        "/dashboard",
        "/comparison",
        "/videos",
        "/icons/icon-192x192.png",
        "/icons/icon-384x384.png",
        "/icons/icon-512x512.png",
      ])
    }),
  )
})

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If request was successful, add result to cache
        event.waitUntil(updateCache(event.request, response.clone()))
        return response
      })
      .catch((error) => {
        // If network request failed, try to get it from cache
        return fromCache(event.request)
      }),
  )
})

function fromCache(request) {
  // Check to see if you have it in the cache
  return caches.open(CACHE).then((cache) =>
    cache.match(request).then((matching) => {
      if (!matching || matching.status === 404) {
        // If we don't have it in the cache, look for the offline page
        return Promise.reject("no-match")
      }

      return matching
    }),
  )
}

function updateCache(request, response) {
  return caches.open(CACHE).then((cache) => cache.put(request, response))
}

// This is an event that can be fired from your page to tell the SW to update the offline page
self.addEventListener("refreshOffline", (response) =>
  caches.open(CACHE).then((cache) => {
    console.log("[PWA] Offline page updated from refreshOffline event")
    return cache.addAll(["/offline", "/", "/dashboard", "/comparison", "/videos"])
  }),
)
