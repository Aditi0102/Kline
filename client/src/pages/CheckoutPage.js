import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";

// extra imports

import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCartContext();

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            {/* ye niche wale link se pehle /products pe ja rha tha abhi ke liye
            home page pe jaata hai */}
            <Link to="/" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    margin-top: 5rem;
    text-align: center;
  }
`;
export default CheckoutPage;
