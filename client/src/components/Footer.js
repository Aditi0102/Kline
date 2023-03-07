import React from "react";
import styled from "styled-components";
import { TfiLocationPin } from "react-icons/tfi";
import { FiMail, FiPhone } from "react-icons/fi";
const Footer = () => {
  return (
    <>
      <StyledFooterContainer>
        <div className="Container1">
          <h3>Kline Decor</h3>
          <span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste non
            ipsam consequatur veritatis rerum. Explicabo obcaecati repellat
            similique placeat dignissimos!
          </span>
          <br />
          <article>
            {" "}
            <TfiLocationPin /> Address of the company, street, city, state,
            country, zip code
          </article>
          <article>
            {" "}
            <FiPhone /> Phone: +1 234 567 890
          </article>
          <article>
            {" "}
            <FiMail /> Email: dummy@gmail.com.
          </article>
        </div>
        <div className="Container2">
          <h5>Customer Service</h5>
          <ul>
            <li>Shipping Policy</li>
            <li>Help & ContactUs</li>
            <li>Returns & Refunds</li>
            <li>Online Stores</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </StyledFooterContainer>

      <StyledFooterContainer4 className="footer-bottom">
        <h5>
          &copy; {new Date().getFullYear()}
          <span> Kline Decor</span>
        </h5>
        <h5>All rights reserved</h5>
      </StyledFooterContainer4>
    </>
  );
};

const StyledFooterContainer = styled.footer`
  @media (min-width: 776px) {
    display: flex;
    background: var(--clr-black);
    padding: 3rem 18%;
    border-bottom: 2px solid #2a2a2a;

    .Container1 {
      width: 50%;
    }
    .Container2 {
      margin-left: 15rem;
    }
    h3 {
      width: 50%;
      color: var(--clr-text-brown);
      letter-spacing: -0.9px;
    }
    span {
      width: 50%;
      color: var(--clr-footer-white);
      font-size: 0.9rem;
      line-height: 1.5;
      padding-bottom: 3rem;
    }
    article {
      color: var(--clr-footer-white);
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }
    .Container2 {
      h5 {
        color: var(--clr-white);
      }
      ul {
        font-size: 0.9rem;
        color: var(--clr-footer-white);
      }
      li {
        margin: 0.5rem 0;
      }
      li:hover {
        border-bottom: 1px solid var(--clr-footer-white);
      }
    }
  }
`;
const StyledFooterContainer4 = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;
  span {
    color: var(--clr-primary-5);
    font-size: 0.9rem;
  }
  h5 {
    color: var(--clr-footer-white);
    margin: 0.1rem;
    font-weight: 100;
    text-transform: none;
    line-height: 1.25;
    font-size: 0.9rem;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;

export default Footer;
