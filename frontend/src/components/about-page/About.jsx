import React from 'react'
import './About.css'
import Footer from '../footer/Footer'

const About = () => {
  return (
    <div>
        
    <div className="about-head">
    <img src="../images/logo2.jpg" alt="logo img"/> 
    </div>
    <div className="about-header">
        <div className="header-image">
    <img src="../images/about.jpg" alt="shop img"/>
</div>
<div className="header-content-about">
    <h1>SM Crackers</h1>
    <h2>ABOUT US</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Alias expedita facere ri totam ad <br/>
     Alias expedita facere assumenda iste laboriosam ut exceptu S totam ad sequi ni ri totam ad <br/>
     ri totam ad sequi nihil, reprehenderit illo vero consectet optio soluta laborum ri totam ad <br/>
     optio soluta laborum, distinctio eligendi eaque.</p>

     <div className="header-contentimg">
     <img src="../images/wholesale.jpg" alt=" wholesale"/>
     <img src="../images/retail.jpg" alt="Retail"/>
    </div>
    </div>
    </div>
   
     <div className="brand">
     <h2 className='text-center'>Brands we handle</h2> 
     <div className="brand-image">
     <img src="../images/brand1.png" alt="Maruti"/>
     <img src="../images/brand2.png" alt="Moro"/>
    </div>
    </div>
    
      <div className="footeras mt-5">
     <h2 className='text-center'>Our Vision and Mission</h2>
     <p>To maintain quality of crackers in every aspect by offering sale,unique  and environmental-friendly Sparklers
     To be the first className wholesome & retail company,producing safe and compliant crackers with HIGHEST QUALITY at low price enabling you to spread joy and happiness </p>
    </div>
    <Footer/>

    </div>
  )
}

export default About