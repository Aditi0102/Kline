import React from "react";
import styled from "styled-components";
const Contact = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <div className="title">
          <h2>Get Discount Info</h2>
        </div>
        <div className="content">
          <p>
            Subscribe to the Kline Decor's mailing list to receive updates on
            new arrivals, special offers and other discount information.
          </p>
        </div>
        <form className="email-form">
          <input
            type="email"
            className="form-input"
            placeholder="Subscribe to our mailing list.."
          />
        </form>
          <button type="submit" className="btn">
            subscribe
          </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin: 4rem auto;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-11);
    text-align: center;
    margin-top: 1rem;
  }
  .content {
    display: flex;
    margin: 1rem auto;
    justify-content: center;
  }
  .email-form {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    max-width: 500px;
  }
  .btn {
    display: block;
    max-width: 200px;
    margin: 0 auto;
    margin-top: 2rem;
    text-align: center;
    padding: 0.9rem 2rem;
  }
  .form-input{
    border: none;
    border-bottom: 1px solid var(--clr-grey-11);
    font-size: 1rem;
    padding: 0.5rem 1rem;
    text-align: center;
    width: 100%;
  }
  .form-input::placeholder {
    color: var(--clr-grey-11);
    text-transform: capitalize;
    text-align: center;
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1280px) {
    // padding: 15rem 0;
  }
`;

export default Contact;
