import React, {useEffect} from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import logo from "../assets/logo.png";

const AboutPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <PageHero title='about' />
      <Wrapper className='page section section-center'>
        <img src={logo} alt='kline decor logo' />
        <article>
          <div className='title'>
            <h2>our story</h2>
            <div className='underline'></div>
          </div>
          <p>
            Kline Decor is a Home Decor and Premium Glassware company that specializes in creating elegant and sophisticated pieces to enhance the beauty of any living space. The company offers a wide range of products including glassware, vases, candle holders, decorative bowls, and other home accessories.

            We takes great pride in the quality of their products, using only the finest materials and craftsmanship to create pieces that are both functional and visually stunning. Our glassware is particularly noteworthy, with a focus on creating intricate and delicate designs that showcase the beauty of glass as a material.

            In addition to our high-quality products, Kline Decor also offers exceptional customer service, with a commitment to ensuring that every customer is completely satisfied with their purchase.
            Overall, Kline Decor is a company that is dedicated to providing customers with premium home decor and glassware that is both functional and aesthetically pleasing.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
