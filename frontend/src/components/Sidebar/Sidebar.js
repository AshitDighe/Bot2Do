import React, { useState } from 'react';
import './Sidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from "../../../src/images/logo.png"
import chat from "../../../src/images/Chat.png"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className='toggle-icons'>
        <img src={logo} alt="logo" className={`${isCollapsed ? 'right' : 'left'}`} onClick={() => setIsCollapsed(!isCollapsed)}/>
      </div>
      <div className='nav-content'>
        <div className='nav-option'>
          <i className='bi bi-house-door'></i>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Home</h3>
        </div>
        <div className='nav-option'>
          <i className='bi bi-check-all'></i>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Pre-Requisite</h3>
        </div>
        <div className='nav-option'>
          <i className='bi bi-speedometer'></i>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Load Test</h3>
        </div>
        <div className='nav-option'>
          <i className='bi bi-shield-lock'></i>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Security Test</h3>
        </div>
        <div className='nav-option'>
          <i className='bi bi-database'></i>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Architecture</h3>
        </div>
        <div className='nav-option'>
          <i className='bi bi-mortarboard'></i>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Plans</h3>
        </div>
        <div className='nav-option'>
          <i className='bi bi-file-text'></i>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Documents</h3>
        </div>
        <div className='nav-option'>
          <i className='bi bi-headphones'></i>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>Support</h3>
        </div>
        <div className='nav-option2'>
        <i class="bi bi-layout-sidebar"></i>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}></h3>
        </div>
          <div className='chat'>
           <img src={chat} alt="chat" />
           </div>
          <h3 className={`nav-text ${isCollapsed ? 'hidden' : ''}`}></h3>
        </div>
      </div>
  );
}

export default Sidebar;
