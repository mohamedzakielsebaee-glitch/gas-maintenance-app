importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js', 'https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyCnCxBurG8x82dgCLIbps-3yUk9P7FgK6k", authDomain: "gas-maintenance-app.firebaseapp.com",
  projectId: "gas-maintenance-app", storageBucket: "gas-maintenance-app.firebasestorage.app",
  messagingSenderId: "712614942966", appId: "1:712614942966:web:5160b841b594d605a974d7"
});
firebase.messaging().onBackgroundMessage(p => {
  const d = p.data || {};
  self.registration.showNotification(d.title || 'Gas Maintenance', {
    body: d.body || '', tag: d.tag, dir: 'rtl', lang: 'ar',
    vibrate: [300, 100, 300, 100, 300], requireInteraction: d.urgent === '1', data: { url: './' }
  });
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => {
    for (const c of l) if ('focus' in c) return c.focus();
    return clients.openWindow('./');
  }));
});
