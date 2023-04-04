import React, { useEffect } from "react";
import styled from "styled-components";
import { PageHero } from "../components";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <PageHero title="Terms And Conditions" />
      <Wrapper className="page section section-center">
        {/* <img src={logo} alt='kline decor logo' /> */}
        <article>
          <div className="title">
            <h2>Terms and Conditions</h2>
            <div className="underline"></div>
          </div>
          <p>
            Thank you for considering to pre-order our product and receive a
            free smartwatch. Please read the following terms and conditions
            carefully before making your purchase:<br></br>
            1. Eligibility: This offer is only available to customers who
            pre-order the specified product during the promotional period.
            <br></br>
            2. Availability: This offer is available only while supplies last.
            We reserve the right to end this promotion at any time without prior
            notice.<br></br>
            3. Delivery: The pre-ordered product will be shipped after the offer
            is over i.e. from 15th April, 2023. The free smartwatch will be
            shipped with the pre-ordered product. Delivery times may vary
            depending on your location.<br></br>
            4. Payment: Full payment is required at the time of pre-order.
            <br></br>
            5. Cancellation: Pre-orders can be cancelled at any time before the
            pre-ordered product is shipped. Once the product has been shipped,
            the order cannot be cancelled.<br></br>
            6. Exchange and Returns: Exchange or returns for the pre-ordered
            product are subject to our standard return policy. The free
            smartwatch cannot be returned or exchanged unless it is damaged or
            defective.<br></br>
            7. Warranty: The free smartwatch comes with its respective warranty
            as outlined in the product manuals.<br></br>
            8. Changes to the Promotion: We reserve the right to modify or
            cancel this promotion at any time without prior notice.<br></br>
            9. Governing Law: These terms and conditions are governed by the
            laws of the jurisdiction in which you reside.<br></br>
            If you have any questions about this promotion or your pre-order,
            please contact our customer service team. Thank you for choosing our
            product.<br></br>
          </p>
        </article>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.section`
  display: grid;
  justify-content: center;
  h2 {
    width: 100%;
    align: center;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-size: 1.15rem;
    font-weight: 200;
    max-width: 35rem;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0rem;
  }
  @media (min-width: 992px) {
    display: block;
    overflow: hidden;
    h2 {
      margin-left: 26rem;
    }
    p {
      width: 100%;
      max-width: 100%;
    }
    .underline {
      margin-left: 35rem;
    }
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
