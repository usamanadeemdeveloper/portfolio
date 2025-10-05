"use strict";
/// <reference lib="webworker" />
const CACHE_NAME = "v3";
const URLS_TO_CACHE = [
    "/",
    "/offline.html",
    "/favicon.ico",
    "/manifest.json",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
    "/apple-touch-icon.png"
];
const sw = self;
sw.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE)));
    sw.skipWaiting();
});
sw.addEventListener("activate", (event) => {
    event.waitUntil(caches.keys().then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))));
    sw.clients.claim();
});
sw.addEventListener("fetch", (event) => {
    const { request } = event;
    // Only handle GET requests
    if (request.method !== "GET")
        return;
    // Handle navigation requests (like visiting "/about", etc.)
    if (request.mode === "navigate") {
        event.respondWith((async () => {
            try {
                const networkResponse = await fetch(request);
                const cache = await caches.open(CACHE_NAME);
                cache.put("/", networkResponse.clone());
                return networkResponse;
            }
            catch {
                const cachedShell = await caches.match("/");
                if (cachedShell)
                    return cachedShell;
                const offline = await caches.match("/offline.html");
                return offline ?? new Response("Offline", { status: 503 });
            }
        })());
        return;
    }
    // For assets like JS, CSS, images, etc.
    event.respondWith((async () => {
        const cached = await caches.match(request);
        if (cached)
            return cached;
        try {
            const response = await fetch(request);
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
            return response;
        }
        catch {
            // Always return a Response (to satisfy TS)
            const fallback = await caches.match("/offline.html");
            return (fallback ?? new Response("Offline", { status: 503, statusText: "Offline" }));
        }
    })());
});
