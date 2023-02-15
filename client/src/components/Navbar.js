import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'
import { useUserContext } from '../context/user_context'
const Nav = () => {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () =>{
    if(window.scrollY >= 80){
      setColorchange(true);
    }
    else{
      setColorchange(false);
    }
  }
  window.addEventListener('scroll', changeNavbarColor);
  const { openSidebar } = useProductsContext()
  const { myUser } = useUserContext()
  return (
    
    
    <NavContainer >
      <div className={colorChange ? 'navbar-colorChange' : 'navbar'}>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            {/* <img src={logo} alt='Kline Decor' /> */}
            <h2>Kline Decor</h2>
          </Link>
          <button type='button' className='nav-toggle' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          {links.map((link) => {
            const { id, text, url } = link
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            )
          })}
          {myUser && (
            <li>
              <Link to='/checkout'>checkout</Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </div>
      </div>
    </NavContainer>
    
    
  )
}

const NavContainer = styled.nav`
  height: 3.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
  z-index: 9999;
  font: Helvetica;
  .navbar{
    background: transparent;
  } 
  .navbar-colorChange{
    width: 100%;
    background: var(--clr-white);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
    h2{
      padding-top: 30px;
      padding-bottom: 20px;
      font-size: 2.5rem;
      color: rgb(50,50,50); 
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default Nav
