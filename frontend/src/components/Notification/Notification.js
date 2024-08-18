import React, { useEffect, useState } from 'react';
import './Notification.css';
import Home from '../Home/Home';
import { useNotification } from '../Contex/NotificationContext';
import { timeAgo } from '../utils/timeAgo'; // Import the timeAgo utility
import check from '../../../src/images/check.png';

// IndexedDB setup
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('notificationsDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('notifications')) {
        db.createObjectStore('notifications', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveNotification = async (notification) => {
  try {
    const db = await openDB();
    const transaction = db.transaction('notifications', 'readwrite');
    const store = transaction.objectStore('notifications');
    store.put(notification);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};

const getNotifications = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction('notifications', 'readonly');
    const store = transaction.objectStore('notifications');
    const notifications = [];
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        notifications.push(cursor.value);
        cursor.continue();
      } else {
        console.log('All notifications fetched.');
      }
    };
    return new Promise((resolve) => {
      transaction.oncomplete = () => resolve(notifications);
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

const NotificationPanel = () => {
  const { notificationOpen } = useNotification();
  const [notifications, setNotifications] = useState([]);

  const handleClose = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    removeNotification(id);
  };

  const removeNotification = async (id) => {
    try {
      const db = await openDB();
      const transaction = db.transaction('notifications', 'readwrite');
      const store = transaction.objectStore('notifications');
      store.delete(id);
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error removing notification:', error);
    }
  };

  useEffect(() => {
    const handleNotificationMessage = (event) => {
      if (event.data && event.data.type === 'notification') {
        const newNotification = {
          id: new Date().getTime(),
          title: event.data.title,
          body: event.data.body,
          icon: event.data.icon,
          timestamp: new Date().toISOString() // Add timestamp
        };

        setNotifications(prevNotifications => {
          const updatedNotifications = [...prevNotifications, newNotification];
          saveNotification(newNotification);
          return updatedNotifications;
        });
      }
    };

    const fetchStoredNotifications = async () => {
      try {
        const notifications = await getNotifications();
        setNotifications(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(registration => {
          navigator.serviceWorker.addEventListener('message', handleNotificationMessage);
          fetchStoredNotifications();
        })
        .catch(error => {
          console.error('Service Worker registration failed: ', error);
        });
    }

    return () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleNotificationMessage);
      }
    };
  }, []);

  // Helper function to get the day of the week
  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  return (
    <>
      <div className={`notification-panel ${notificationOpen ? 'visible' : 'hidden'}`}>
  <h3>Notifications</h3>
  {notifications.length === 0 && <p>No notifications</p>}
  {notifications.map(notification => (
    <div key={notification.id} className="notification-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={check} alt="Logo" />
        <div className="notification-content">
          <p>{notification.body}</p>
          <p className="notification-timestamp">
            <span className="notification-date">
              {notification.timestamp ? getDayOfWeek(notification.timestamp) : 'Invalid date'}
            </span>
            <span className="notification-time-ago">
              {notification.timestamp ? ` ${timeAgo(notification.timestamp)}` : ''}
            </span>
          </p>
          <button className="close-button" onClick={() => handleClose(notification.id)}>Remove</button>
        </div>
      </div>
    </div>
  ))}
</div>

      <div className={`overlay ${notificationOpen ? 'visible' : 'hidden'}`}></div>
      {notificationOpen && <Home />}
    </>
  );
};

export default NotificationPanel;
