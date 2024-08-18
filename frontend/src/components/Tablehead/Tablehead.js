import React from 'react'
import './Tablehead.css'

const Form = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-content'>
        <div className='navbar-left'>
          <h4>Load</h4>
          <h4>Security</h4>
          <h4>Architecture</h4>
        </div>
        <div className='navbar-right'>
        <div className="search-form">
        <input
          type="text"
          placeholder="Search here what are you looking for"
        />
      </div>
          <button className='name-button bi bi-cloud-download'>Download All</button>
          <button className='name-button bi bi-funnel'>More Filters</button>
          <button className='name-button bi bi-sliders2-vertical'>Sort By</button>
        </div>
      </div>
    </nav>
  )
}

export default Form
