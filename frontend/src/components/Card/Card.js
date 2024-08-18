import React from 'react';
import './Card.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Card = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className="card">
          <h3>Tests</h3>
          <div className='card-icon1'><i className='bi bi-question-circle'></i></div>
          <div className="icon1-header">
          <h1>29</h1>
          <p>+25% from last week</p>
          </div>
          <div className='right-circle'>
            <i className="bi bi-arrow-right-circle"></i>
          </div>
        </div>
        <div className="card">
          <h3>Virtual Users</h3>
          <div className='card-icon'><i className='bi bi-question-circle'></i></div>
          <h1>32/50</h1>
          <div className='progress-container'>
            <ProgressBar now={60} />
          </div>
          <div className='right-circle'>
            <i className="bi bi-arrow-right-circle"></i>
          </div>
        </div>
        <div className="card">
          <h3>Minutes Used</h3>
          <div className='card-icon'><i className='bi bi-question-circle'></i></div>
          <h1>30/50</h1>
          <div className='progress-container'>
            <ProgressBar now={60} />
          </div>
          <div className='right-circle'>
            <i className="bi bi-arrow-right-circle"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
