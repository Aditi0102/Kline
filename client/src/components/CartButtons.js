import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { useSelector } from 'react-redux'
import UserOptions from './UserOptions'
const CartButton = () => {
  const { closeSidebar } = useProductsContext()
  const { total_items, clearCart } = useCartContext()
  const { loginWithRedirect, myUser, logout } = useUserContext()
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
        Cart
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
      {isAuthenticated ? (
        // <button
        //   type='button'
        //   className='auth-btn'
        //   onClick={() => {
        //     clearCart()
        //     localStorage.removeItem('user')
        //     logout({ returnTo: window.location.origin })
        //   }}
        // >
        //   Logout <FaUserMinus />
        // </button>
        <div>
          <UserOptions user={user} />
        </div>
      ) : (
        <button type='button' className='auth-btn'>
          <Link to = "/login">
            Login <FaUserPlus/>
          </Link>
        </button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 200px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.2rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.2rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButton
