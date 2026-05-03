/// <reference lib="webworker" />

/**
 * Service Worker for Next.js 15 Portfolio
 * Features:
 * - Cache First for Next.js static assets (immutable)
 * - Cache First for Images (Sanity CDN, etc.)
 * - Stale-While-Revalidate for general assets
 * - Network First for navigations (Exact match or Offline page)
 */

const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME = "portfolio-v8";
const STATIC_CACHE = "static-assets-v1";
const IMAGE_CACHE = "images-v1";

const URLS_TO_PRECACHE = [
  "/",
  "/offline.html",
  "/manifest.webmanifest",
  "/icon",
  "/apple-icon",
];

// Hosts that we want to cache specifically
const IMAGE_HOSTS = ["cdn.sanity.io", "media.licdn.com", "avatars.githubusercontent.com"];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

sw.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_PRECACHE))
  );
  sw.skipWaiting();
});

sw.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => ![CACHE_NAME, STATIC_CACHE, IMAGE_CACHE].includes(n))
          .map((n) => caches.delete(n))
      )
    )
  );
  sw.clients.claim();
});

sw.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. SKIP: Non-GET requests and non-http protocols
  if (request.method !== "GET" || !url.protocol.startsWith("http")) return;

  // 2. SKIP: Sanity API and Live Events
  if (url.hostname.includes("api.sanity.io")) return;

  // 3. SKIP: Development/HMR requests
  if (
    url.pathname.includes("_next/webpack-hmr") || 
    url.pathname.includes("hot-update") ||
    url.pathname.includes("__nextjs_launch-editor")
  ) return;

  // 4. Next.js Static Assets (Immutable) -> Cache First
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(handleCacheFirst(request, STATIC_CACHE));
    return;
  }

  // 5. Images (Sanity, Socials, Next Optimized) -> Cache First
  if (isImageUrl(url) || IMAGE_HOSTS.some((host) => url.hostname.includes(host))) {
    event.respondWith(handleCacheFirst(request, IMAGE_CACHE));
    return;
  }

  // 6. Navigation Requests (Pages, Projects) -> Network First
  if (request.mode === "navigate") {
    event.respondWith(handleNetworkFirst(request));
    return;
  }

  // 7. External Fonts & APIs -> Stale-While-Revalidate
  if (FONT_HOSTS.some((host) => url.hostname.includes(host))) {
    event.respondWith(handleSWR(request, CACHE_NAME));
    return;
  }

  // 8. Default (includes Next.js RSC data) -> Stale-While-Revalidate
  event.respondWith(handleSWR(request, CACHE_NAME));
});

/**
 * STRATEGIES
 */

// Cache First: Check cache, then network.
async function handleCacheFirst(request: Request, cacheName: string) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response("Offline", { status: 503 });
  }
}

// Network First: Try network, fallback to exact cached page, then offline page.
async function handleNetworkFirst(request: Request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Try to find the exact page in cache
    const cached = await cache.match(request);
    if (cached) return cached;
    
    // If not in cache, show the dedicated offline page
    const offline = await caches.match("/offline.html");
    return offline ?? new Response("Offline", { status: 503 });
  }
}

// Stale-While-Revalidate
async function handleSWR(request: Request, cacheName: string) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        // Special handling for Next.js RSC data to ensure it's cached correctly
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => {
      return cached || new Response("Offline", { status: 503 });
    });

  return cached || fetchPromise;
}

/**
 * UTILS
 */
function isImageUrl(url: URL) {
  return (
    url.pathname.match(/\.(png|jpe?g|gif|svg|webp|avif)$/i) ||
    url.pathname.startsWith("/_next/image") ||
    url.hostname.includes("sanity.io")
  );
}
