import React from 'react'
import { FeaturedProducts, Hero, Services, Contact } from '../components'
import Carousel from '../components/Carousel'
const HomePage = () => {
  return (
    <main>
      <Hero />
      
      <FeaturedProducts /> 
      {/* <Carousel/>      */}
      <Contact />
    </main>
  )
}

export default HomePage
