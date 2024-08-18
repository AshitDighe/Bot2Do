import React, { useEffect,useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Routing from './components/Router/Routers';
 
import './App.css';
import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';
 
const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    async function requestPermission() {
      try {
        const permission = await window.Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging,{vapidKey:"BIjBSO6qM0NVaQJu39wZvb2sN_IuBh_nQKrZXAEsPlSxbH_eIIMw1UhQ5ezBhYUp9QPIhJ2paxOMjUbf8jKBhT8"})

          console.log("Token granted.",token);
        } else if (permission === "denied") {
          alert("You denied notifications.");
        }
      } catch (error) {
        console.error("Error requesting notification permission", error);
      }
    }

    requestPermission();
  }, []);

  return (
    <div className="app">
      {isMobile && (
        <div className="mobile-message">
          Please use the desktop version to view this content.
        </div>
      )}
      {!isMobile && (
          <Sidebar />
        )}
          <div className={`main-content ${isMobile ? '' : 'has-sidebar'}`}>
          <Routing />
          </div>
    </div>
  );
}

export default App;
