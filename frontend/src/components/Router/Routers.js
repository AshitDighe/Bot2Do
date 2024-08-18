import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Notification from '../Notification/Notification';
import Home from '../Home/Home';
import { NotificationProvider } from '../Contex/NotificationContext';

const Routing = () => {
  return (
    <NotificationProvider>
    <Router>
      <div className="content">
        <Routes>
          <Route path="/nav" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/notification" element={<Notification/>} />
        </Routes>
      </div>
    </Router>
    </NotificationProvider>
  );
};

export default Routing;
