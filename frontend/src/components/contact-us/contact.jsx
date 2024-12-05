import React from 'react'
import './contact.css'
import Footer from '../footer/Footer'
import MetaData from "../../Pages/Home/MetaData";
const Contact = () => {
  return (
    <div>
       <section>
       </section>
       <MetaData title={"Contact"} />
    <div className="contact-section">
        <div className="contact_head">
            <h1>Get in Touch</h1>
            <p>Send your query about products and other queries | Contact us</p>
        </div>
        <div className="contact_inputs">
            <div className="contact_1">
                <div>
                    <p>FIRST NAME</p>
                    <input type="text" name="" id="" placeholder="Please enter first Name"/>
                </div>
                <div>
                    <p>LAST NAME</p>
                    <input type="text" name="" id="" placeholder="Please enter last Name"/>
                </div>

                <div>
                    <p>EMAIl</p>
                    <input type="email" name="" id="" placeholder="Please enter Email"/>
                </div>
                <div>
                    <p>PHONE NUMBER</p>
                    <input type="text" name="" id="" placeholder="Please enter Phn No"/>
                </div>
            </div>
            <div >
                <p>WRITE YOUR QUERY</p>
                <textarea name="" id="" placeholder="Please enter Query"></textarea>
            </div>

        </div>
        <button>Submit</button>
    </div>
    <Footer/>
    </div>
  )
}

export default Contact