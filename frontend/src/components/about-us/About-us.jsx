import React from 'react'
import './About-us.css'

const About = () => {
  return (
<div className="about">
    <h2>About-Us</h2>
    <div className="about-page">
    <div className="about-left">
<img src="./images/about.jpg" alt="img"/>
    </div>
    <div className="about-right">
<p className='para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, esse? Adipisci explicabo, quidem voluptas sed consectetur, eveniet soluta aspernatur mollitia autem modi est recusandae minima illum ad, suscipit amet consequatur?
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequatur ipsa nesciunt voluptas eum reiciendis, numquam iure quos hic, sapiente error accusamus a! Tenetur, repudiandae! Labore id mollitia enim velit.
</p>
<div className="icons">
<div className="icon">
    <div className="ion_1">
    <i class="fa-solid fa-truck"></i>
    <p>Fast Delivery</p>
    </div>
    <div className="ion_1">
    <i class="fa-solid fa-tag"></i>
    <p>Genuine Price</p>
    </div>
    </div>
    <div className="icon">
    <div className="ion_1">
    <i class="fa-solid fa-star"></i>
    <p>Best Quality</p>
    </div>
    <div className="ion_1">
    <i class="fa-solid fa-headset"></i>
<p>24/7 Support</p> 
   </div>
</div>
</div>
    </div>
    </div>
</div> 
)
}

export default About