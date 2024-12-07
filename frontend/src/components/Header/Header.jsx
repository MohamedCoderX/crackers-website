import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
   <div className="header">
    <div className="header-content" >
        <h1>Celebrate Diwali with <span>Spectacular Crackers!</span></h1>
        <p>This Diwali, elevate your celebrations with our wide range of vibrant and exciting crackers! 🎆 Whether you're looking for classic sparklers, stunning flower pots, or breathtaking aerial shots, we have everything you need to make your festivities unforgettable.</p>
        <Link to={'/products'}>
        <button >View menu</button>
        </Link>
    </div>
   </div>
  )
}

export default Header