self.addEventListener('push', function (event) {
  if (!event.data) return;
  let data;
  try { data = event.data.json(); } catch { return; }
  event.waitUntil(
    self.registration.showNotification(data.title || 'Mikrotrening', {
      body: data.body || '',
      icon: '/icon-192.png',
    })
  );
});
