import React from 'react'
import Card from '../Card/Card'
import Tablehead from '../Tablehead/Tablehead'
import Table from '../Table/Table'
import Navbar from '../Navbar/Navbar'
import './Home.css'

const Home = () => {
  return (
    <div className='bg'>
      <Navbar/>
      <Card/>
      <Tablehead/>
      <Table/>
    </div>
    
  )
}

export default Home
