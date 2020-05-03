importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

if (workbox) {
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // integrating with webpack we can use :
  // workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
  // instead. due that webpack and workbox plugin creates the precache-manifest.js file
  // or we can also mannualy create the file in order to keep the code smaller
  // if revision id code doesn't change the file never gets cached again
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '5' },
    { url: '/style.css', revision: '5' },
    { url: '/icon.png', revision: '5' },
  ]);

  self.addEventListener('push', (event) => {
    console.log(event.data.text());
    event.waitUntil(
      self.registration.showNotification('push from devtools', {
        icon: '/icon.png',
        body: event.data.text(),
      })
    );
  });
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
