import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import pageHeroimg from '../assets/PageHeroimg.png'
const PageHero = ({ title, product }) => {
  return (
    <Wrapper>
      <div className='section-center'>
        <h3>{title}</h3>
        <span>
          <Link to='/'>Home </Link>
          {product && <Link to='/products'>/ Products</Link>}/ {title}
        </span>
        
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-white);
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-text-black);

  background-image: url(${pageHeroimg});
  background-width: screen.width;

  a {
    color: var(--clr-text-black);
    // padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-text-brown);
  }
`

export default PageHero
