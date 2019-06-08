const appCacheFiles = ['/', '/index.html']
// The name of the Cache Storage
const appCache = 'aws-amplify-v1'

/**
 * The install event is fired when the service worker
 * is installed.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
addEventListener('install', (event) => {
  console.log('[Service Worker] Install Event', event)
  event.waitUntil(
    caches.open(appCache).then(function (cache) {
      return cache.addAll(appCacheFiles)
    })
  )
})

/**
 * The activate vent is fired when the  service worker is activated
 * and added to the home screen.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate Event ', event)
})

/**
 * The message will receive messages sent from the application.
 * This can be useful for updating a service worker or messaging
 * other clients (browser restrictions currently exist)
 * https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
 */
addEventListener('message', (event) => {
  console.log('[Service Worker] Message Event: ', event.data)
})

/**
 * Listen for incoming Push events
 */
addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)

  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }

  let data = {}
  if (event.data) {
    data = event.data.json()
  }

  const title = data.title || 'Web Push Notification'
  const message = data.message || 'New Push Notification Received'
  const icon = 'touch/homescreen168.png'
  const badge = 'icon.png'
  const options = {
    body: message,
    icon: icon,
    badge: badge
  }
  confirm.log(options)
  event.waitUntil(self.registration.showNotification(title, options))
})

/**
 * Handle a notification click
 */
addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click: ', event)
  event.notification.close()
//   event.waitUntil(clients.openWindow('https://aws-amplify.github.io/amplify-js'))
})
