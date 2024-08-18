import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleNotification = () => {
    setNotificationOpen(prev => !prev);
  };

  return (
    <NotificationContext.Provider value={{ notificationOpen, toggleNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
