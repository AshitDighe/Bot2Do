// Import the Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGnzZH10AWeSaaCEIX7K-gMWXrHFskUlA",
  authDomain: "bo2do-fac72.firebaseapp.com",
  projectId: "bo2do-fac72",
  storageBucket: "bo2do-fac72.appspot.com",
  messagingSenderId: "85269353801",
  appId: "1:85269353801:web:5a94a7bf7c9d3ec4e53698",
  measurementId: "G-WSBS0HDE15"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// IndexedDB setup
const dbName = 'notificationsDB';
const storeName = 'notifications';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveNotification = async (notification) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    store.put(notification);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};

// Background message handler
messaging.onBackgroundMessage(async (payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload.notification.title || 'Notification';
  const notificationOptions = {
    body: payload.notification.body || 'You have a new message.',
    icon: payload.notification.image || '/default-icon.png'
  };

  // Create notification object
  const notification = {
    id: new Date().getTime(), // Unique ID based on timestamp
    title: notificationTitle,
    body: notificationOptions.body,
    icon: notificationOptions.icon,
    timestamp: new Date().toISOString() // Add timestamp
  };

  // Save notification in IndexedDB
  await saveNotification(notification);

  // Post message to clients
  self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clientsArr => {
    clientsArr.forEach(client => {
      client.postMessage({
        type: 'notification',
        title: notificationTitle,
        body: notificationOptions.body,
        icon: notificationOptions.icon,
        timestamp: notification.timestamp // Include timestamp
      });
    });
  });
});
