import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/ExploreMenu/exploremenu'

import MetaData from './MetaData'
import Crackerdisplay from '../../components/cracker/Crackerdisplay'
import Footer from '../../components/footer/Footer'
import About from '../../components/about-us/About-us'



const Home = () => {
  return (
 
    <div>
   <MetaData title={`Buy Best Products`}/>
  <Header/>
<Exploremenu/>
<Crackerdisplay/>
<About/>
<Footer/>
  </div>


  )
}

export default Home