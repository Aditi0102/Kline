import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FeaturedProducts, Contact } from '../components'
import Carousel from '../components/Carousel'


const StyledContainer = styled.div`
  position: relative;
  overflow: hidden;
`
const HomePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <main>
      {/* <Hero /> */}

      <StyledContainer>
        <Carousel/>     
      </StyledContainer>

      <FeaturedProducts  title='TABLE LAMP SERIES' start = {3} end = {6}/> 
      
      <FeaturedProducts  title='WHISKEY GLASS SERIES' start = {0} end = {3}/> 
      

      <Contact />
    </main>
  )
}

export default HomePage
