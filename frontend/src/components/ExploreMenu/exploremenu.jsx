import React from 'react'
import './exploremenu.css'
const Exploremenu = () => {
  return (
    <div className="explore-menu" id='explore-menu'>
        <h2>Explore our menu</h2>
        <p className="explore-menu-text">
        Explore our vibrant collection of Diwali Crackers, designed to light up your celebrations with dazzling displays and festive joy!
        </p>
   
    <div className="explore-menu-list">
        <div className="explore-menu-list-item">
            <img src="./images/nightshots.png" alt="nytshot" width="10%" loading='lazy' />
            <p>Night Shots</p>
        </div>
        <div className="explore-menu-list-item">
            <img src="./images/dayshots.png" alt="dayshot" loading='lazy'/>
            <p>Day Shots</p>
        </div>
        <div className="explore-menu-list-item">
          <img src="./images/kidscrack.png" alt="crack" loading='lazy' />
          <p>Kids Crackers</p>
        </div>
        <div className="explore-menu-list-item">
          <img src="./images/giftbox.png" alt="img" loading='lazy'/>
          <p>Gift Boxes</p>
        </div>
    </div>
    
    </div>
  )
}

export default Exploremenu