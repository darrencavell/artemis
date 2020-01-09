workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerRoute(
  /https:\/\/pokeapi\.co\/api\/v2/,
  new workbox.strategies.NetworkFirst({
    cacheName: "pokemon",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 10 * 60 // 10 minutes
      })
    ]
  })
)

// workbox.routing.registerRoute(
//   /https:\/\/raw\.githubusercontent\.com/,
//   new workbox.strategies.NetworkFirst({
//     cacheName: "images",
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxAgeSeconds: 10 * 60 // 10 minutes
//       })
//     ]
//   })
// )

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'static-resources',
  })
)