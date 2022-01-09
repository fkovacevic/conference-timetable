/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
// import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
	// Return false to exempt requests from being fulfilled by index.html.
	({ request, url }) => {
		// If this isn't a navigation, skip.
		if (request.mode !== 'navigate') {
			return false;
		} // If this is a URL that starts with /_, skip.

		if (url.pathname.startsWith('/_')) {
			return false;
		} // If this looks like a URL for a resource, because it contains // a file extension, skip.

		if (url.pathname.match(fileExtensionRegexp)) {
			return false;
		} // Return true to signal that we want to use the handler.

		return true;
	},
	createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
	({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
	new CacheFirst({
		cacheName: 'images',
	})
);

// cache everything starting with /api/events/
// use network first since it might change often
registerRoute(
	({ url }) => url.pathname.startsWith('/api/events'),
	new NetworkFirst({
		cacheName: 'calendar',
	})
);

//cache all events and user events
//REMEMBER TO CLEAR CACHE AFTER
registerRoute(
	({ url }) => url.pathname.startsWith('/api/Events'),
	new NetworkFirst({
		cacheName: 'eventovi',
	})
);

//cache all events and user events
//REMEMBER TO CLEAR CACHE AFTER
registerRoute(
	({ url }) => url.pathname.startsWith('/api/Users'),
	new NetworkFirst({
		cacheName: 'userEvents',
	})
);

// cache everything starting with /api/sections/
// use network first since it might change often
registerRoute(
	({ url }) => url.pathname.startsWith('/api/sections/'),
	new NetworkFirst({
		cacheName: 'sections',
	})
);


// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

// on receiving of push message, raise notification
self.addEventListener('push', (event) => {
	var options = {
		body: event.data.text(),
		icon: 'images/calendar-64.png',
		vibrate: [100, 50, 100],

	  };
	  event.waitUntil(
		self.registration.showNotification('Notification!', options)
	  );
});

// Any other custom service worker logic can go here.
