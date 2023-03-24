import React from "react";
import styled from "styled-components";
import { TfiLocationPin } from "react-icons/tfi";
import { FiMail, FiPhone } from "react-icons/fi";
import { BsPinterest, BsLinkedin, BsInstagram } from "react-icons/bs";
import { FaSnapchat } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <StyledFooterContainer>
        <div className="Container1">
          <h3>Kline Decor</h3>
          <span>
          Kline Decor is a Home Decor and Premium Glassware company that specializes in creating elegant and sophisticated pieces to enhance the beauty of any living space.
          </span>
          <br />
          {/* <article>
            {" "}
            <TfiLocationPin /> Address of the company, street, city, state,
            country, zip code
          </article>
          <article>
            {" "}
            <FiPhone /> Phone: +1 234 567 890
          </article> */}
          <article>
            {" "}
            <FiMail /> Email: support@klinedecor.com.
          </article>
        </div>
        <div className="Container2">
          <h5>Customer Service</h5>
          <ul>
            <li><Link to="/" style={{color: `var(--clr-footer-white)`}}>Shipping Policy</Link></li>
            <li>
              <Link to="/" style={{color: `var(--clr-footer-white)`}}>Returns & Refunds</Link>
            </li>
            <li>
              <Link to="/terms" style={{color: `var(--clr-footer-white)`}}>Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </StyledFooterContainer>

      <StyledFooterContainer4 className="footer-bottom">
        <div>
          <h5>
            &copy; {new Date().getFullYear()}
            <span> Kline Decor </span>
          All rights reserved</h5>
        </div>
        <div className="social-media-handles">
          <a href="https://twitter.com/KlineDecor" target="blank">
            <AiFillTwitterCircle></AiFillTwitterCircle>
          </a>
          <a href="https://www.instagram.com/klinedecor/" target="blank">
            <BsInstagram></BsInstagram>
          </a>
          <a href="https://in.pinterest.com/klinedecor/" target="blank">
            <BsPinterest></BsPinterest>
          </a>
          <a href="https://www.snapchat.com/add/klinedecor.us" target="blank">
            <FaSnapchat></FaSnapchat>
          </a>
          <a href="https://www.linkedin.com/company/klinedecor/" target="blank">
            <BsLinkedin></BsLinkedin>
          </a>
        </div>
      </StyledFooterContainer4>
    </>
  );
};

const StyledFooterContainer = styled.footer`
background: var(--clr-black);
padding: 3rem 18%;
border-bottom: 2px solid #2a2a2a;
  
  h3 {
    width: 100%;
    color: var(--clr-text-brown);
    letter-spacing: -0.9px;
  }
  span {
    width: 50%;
    color: var(--clr-footer-white);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 3rem;
  }
  article {
    color: var(--clr-footer-white);
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  .Container2 {
    margin-top: 2rem;
    Link {
      color: var(--clr-footer-white);
    }
    h5 {
      width: 100%;
      color: var(--clr-white);
    }
    ul {
      font-size: 0.9rem;
      color: var(--clr-footer-white);
    }
    li {
      color: var(--clr-footer-white);
      margin: 0.5rem 0;
    }
    
    li:hover { 
      border-bottom: 1px solid var(--clr-footer-white);
    }
  }

  @media (min-width: 776px) {
    display: flex;
    background: var(--clr-black);
    padding: 3rem 18%;
    border-bottom: 2px solid #2a2a2a;

    .Container1 {
      width: 60%;
    }
    
    h3 {
      width: 100%;
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
      margin-left: 10rem;
      width: 40%;
      // border: 1px solid var(--clr-footer-white);
      display: flex;
      flex-direction: column;
      h5 {
        width: 100%;
        color: var(--clr-white);
        margin-left: 20%;
      }
      ul {
        font-size: 0.9rem;
        color: var(--clr-footer-white);
        margin-left: 20%;
      }
      li {
        width: 100%;
        margin: 0.5rem 0;
        color: var(--clr-footer-white);
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
  justify-content: space-around;
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
  a{
    margin-left:1.5rem;
    color: var(--clr-footer-white);
    font-size: 1.2em;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;

export default Footer;
