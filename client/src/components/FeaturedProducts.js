import React, { useEffect } from "react";
import { useFilterContext} from "../context/filter_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";
import {products_url as url} from "../utils/constants";

const FeaturedProducts = () => {
  // const {
  //   products_loading: loading,
  //   products_error: error,
  //   featured_products: featured,
  // } = useProductsContext();
  const { filtered_products: featured , loading , error } = useFilterContext()

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  console.log(featured, "featured products")

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured.slice(0, 6).map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
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
