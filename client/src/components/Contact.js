import React from "react";
import styled from "styled-components";
import iphone from "../assets/carouselImg/iphone14.webp";
import smartwatch from "../assets/carouselImg/smartwatch.webp";
const Contact = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <div className="title">
          <h2>Pre Order Now and get...</h2>
        </div>
        <div className="image-box">
          <div className="image-container">
            <img src={smartwatch } alt="watch" />
            <h4>Free Smartwatch <br /></h4>
            <h5>Worth $199*</h5>
          </div>
          <div><h1>+</h1></div>
          <div className="image-container">
            <img src={iphone} alt="iphone14" />
            <h5>A Chance to win</h5>
            <h4> iPhone 14 Pro Max</h4>
          </div>
        </div>
        <div className="content">
          {/* <p>
            Subscribe to the Kline Decor's mailing list to receive updates on
            new arrivals, special offers and other discount information.
          </p> */}
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
  .image-box {
    // margin-top: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem auto;
  }
  .image-container {
    display: block;
    margin: 0 auto;
    text-align: center;
  }
  img {
    width: 300px;
    height: 300px;
    object-fit: contain;
    // border: 1px solid var(--clr-grey-10);
    margin: 1rem auto;
  }
  .title {
    margin-bottom: 4rem;
  }
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
    border: none;
  }
  .btn {
    display: block;
    max-width: 200px;
    margin: 0 auto;
    margin-top: 2rem;
    text-align: center;
    padding: 0.9rem 2.5rem;
  }
  .form-input {
    border: none;
    border-bottom: 1px solid var(--clr-grey-11);
    font-size: 1rem;
    padding: 0.5rem 1rem;
    text-align: center;
    width: 100%;
  }
  .form-input:focus {
    outline: none;
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
