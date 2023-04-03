import React from "react";
import { useFilterContext} from "../context/filter_context";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = ({title, start, end}) => {
  // const {
  //   products_loading: loading,
  //   products_error: error,
  //   featured_products: featured,
  // } = useProductsContext();
  const { filtered_products: featured , loading , error } = useFilterContext()

  // console.log(featured, "featured products")
  // console.log(title, "featured products props")
  // console.log(start, `featured products ${title} start`)
  // console.log(typeof(start), `featured products ${title} start`)
  // console.log(end, `featured products ${title} end`)

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>{title}</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured.slice(start, end).map((product) => {
          // console.log(product, "featured products")
          return <Product key={product._id} {...product} />;
        })}
      </div>
      {/* <Link to="/products" className="btn">
        all products
      </Link> */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-white);
  
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 330px;
    }
  }
  .btn {
    display: block;
    max-width: 200px;
    margin: 0 auto;
    text-align: center;
    padding: 0.7rem 0;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default FeaturedProducts;
