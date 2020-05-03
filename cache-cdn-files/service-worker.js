importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

if (workbox) {
  // integrating with webpack we can use :
  // workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
  // instead. due that webpack and workbox plugin creates the precache-manifest.js file
  // or we can also mannualy create the file in order to keep the code smaller
  // if revision id code doesn't change the file never gets cached again
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '4' },
    { url: '/style.css', revision: '4' },
  ]);

  // to cache cdn files we just need to add a new route for e.g:
  // workbox.routing.registerRoute(
  //   'https://cdn.boostrap.com/bootstrap.css',
  //   new workbox.strategies.staleWhileRevalidate({ cacheName: 'cdn-cache' })
  // )
  // we can also use a regex pattern in order to register just one route for that. e.g:
  workbox.routing.registerRoute(
    new RegExp('https:.*min.(css|js)'),
    new workbox.strategies.StaleWhileRevalidate({ cacheName: 'cdn-cache' })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
