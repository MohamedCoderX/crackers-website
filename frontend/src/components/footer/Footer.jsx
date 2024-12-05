import React from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div>
    <div className="footer-full">
 <div className="logoss">
         <div className='logosimg'>
         <img src="../images/Logo.jpeg" alt="SM Crackers logo"/>
         </div>
            <ul className="menu">
            <li onClick={()=>navigate('')}>Home</li>
         | <li onClick={()=>navigate('/products')}>Products</li> |
          <li onClick={()=>navigate('/About')}>About-us</li> |
          <li onClick={()=>navigate('/contact')} > Contact-us</li>
          </ul>
            <h3>SM Crackers @2015</h3>
        </div>
        <div className="contact">
        <h2>Contact us</h2>
            <div className="contact_s1">
                <a href="#"><i class="fa fa-map-marker" aria-hidden="true"></i></a>
                <p>46,balan nagar
                 perali road,virudhunagar </p>
            </div>
            <div className="contact_s1">
                <a href="#"><i class="fa fa-mobile" aria-hidden="true"></i></a>
                <p>+91 6381933039</p>
            </div>
            <div className="contact_s1">
                <a href="#"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
                <p>support@company.com</p>
            </div>
        </div>
        <div className="abtcom">
            <h2>About the company</h2>
            <p>Lorem, ipsum dolor sit amet 
                adipisicing elit. Sequi id
                accusamus saepe maiores
                neque! Aperiam nulla ven
                erat explicabo, maiores a </p>
               
        </div>
<hr />

    </div>
    <div className="copyright">
    &copy; Copyirght 2024 SM Crackers,Sathur , Made with <span className='her' >&hearts;</span> by GOFS
</div>
</div>
  )
}

export default Footer