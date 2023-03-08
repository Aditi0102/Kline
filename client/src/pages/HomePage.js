import React from 'react'
import styled from 'styled-components'
import { FeaturedProducts, Hero, Services, Contact } from '../components'
import Carousel from '../components/Carousel'


const StyledContainer = styled.div`
  position: relative;
  overflow: hidden;
`
const HomePage = () => {
  return (
    <main>
      {/* <Hero /> */}

      <StyledContainer>
        <Carousel/>     
      </StyledContainer>

      <FeaturedProducts /> 

      <Contact />
    </main>
  )
}

export default HomePage
