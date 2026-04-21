importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener('push', function (event) {
  if (!event.data) return;
  let data;
  try { data = event.data.json(); } catch { return; }
  if (data._isOneSignal) return;
  event.waitUntil(
    self.registration.showNotification(data.title || 'Mikrotrening', {
      body: data.body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
    })
  );
});
