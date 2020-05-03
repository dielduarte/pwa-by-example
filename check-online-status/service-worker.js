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
    { url: '/index.html', revision: '2' },
    { url: '/style.css', revision: '2' },
  ]);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
