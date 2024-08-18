import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../Contex/NotificationContext';
import './Navbar.css'; 

const Navbar = () => {
  const { notificationOpen, toggleNotification } = useNotification();
  const navigate = useNavigate();

  const handleBellClick = () => {
    toggleNotification(); 

    if (notificationOpen) {
      navigate(-1);
    } else {
      navigate('/notification');
    }
    //event.preventDefault();
  };

  return (
    <nav className='nav'>
      <h3>Home</h3>
      <ul>
        <button className='name-button bi bi-star'>Basic</button>
        <li className='bi bi-bell' onClick={handleBellClick}></li>
        <li className='bi bi-person-circle'></li>
      </ul>
    </nav>
  );
}

export default Navbar;
