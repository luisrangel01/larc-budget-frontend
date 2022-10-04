import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div  style={{
      display: "flex",
      justifyContent: "space-around",
  }}>
      <Link to='/'>Home</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/login'>login</Link>
    </div>
  )
}

export default Navbar