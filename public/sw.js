importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js"
);

if (workbox) {
  console.log("✅ Workbox loaded");

  /* ---------------- APP SHELL (HTML, CSS, JS) ---------------- */
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "document" ||
      request.destination === "script" ||
      request.destination === "style",
    new workbox.strategies.CacheFirst({
      cacheName: "app-shell",
    })
  );

  /* ---------------- API CACHE (NEWS) ---------------- */
  workbox.routing.registerRoute(
    ({ url }) =>
      url.hostname === "api.spaceflightnewsapi.net",
    new workbox.strategies.NetworkFirst({
      cacheName: "news-api",
      networkTimeoutSeconds: 5,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 10 * 60, // 10 minutes
        }),
      ],
    })
  );

  /* ---------------- IMAGES ---------------- */
  workbox.routing.registerRoute(
    ({ request }) => request.destination === "image",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "images",
    })
  );

  /* ---------------- OFFLINE FALLBACK ---------------- */
  self.addEventListener("fetch", event => {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(
          JSON.stringify({
            message: "You are offline. Showing cached news.",
          }),
          { headers: { "Content-Type": "application/json" } }
        )
      )
    );
  });

} else {
  console.log("❌ Workbox failed to load");
}