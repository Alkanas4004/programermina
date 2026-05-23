/**
 * Service Worker for PWA
 */

const CACHE_NAME = 'mina-portfolio-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/pages/projects.html',
    '/pages/project-details.html',
    '/pages/dashboard.html',
    '/pages/login.html',
    '/pages/add-project.html',
    '/css/main.css',
    '/css/components/navbar.css',
    '/css/components/buttons.css',
    '/css/components/cards.css',
    '/css/components/forms.css',
    '/css/pages/home.css',
    '/css/pages/projects.css',
    '/css/pages/dashboard.css',
    '/css/pages/auth.css',
    '/css/themes/dark-theme.css',
    '/css/themes/neon-theme.css',
    '/css/animations/effects.css',
    '/js/app.js',
    '/js/config/constants.js',
    '/js/config/firebase-config.js',
    '/js/utils/helpers.js',
    '/js/utils/validators.js',
    '/js/utils/crypto.js',
    '/js/components/toast.js',
    '/js/components/loader.js',
    '/js/components/navbar.js',
    '/js/components/modal.js',
    '/js/components/slider.js',
    '/js/services/auth-service.js',
    '/js/services/projects-service.js',
    '/js/services/messages-service.js',
    '/js/services/storage-service.js',
    '/js/pages/home.js',
    '/js/pages/projects.js',
    '/js/pages/dashboard.js',
    '/js/pages/login.js',
    '/js/pages/project-details.js',
    '/js/pages/add-project.js',
    '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch with cache first strategy
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if(response) {
                    return response;
                }
                return fetch(event.request).then(
                    response => {
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});

// Activate and clean old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
