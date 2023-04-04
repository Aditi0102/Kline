import React from "react";
import { useFilterContext} from "../context/filter_context";
import { useProductsContext } from "../context/products_context";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./layout/Loader";
import Product from "./Product";

const FeaturedProducts = ({title, start, end}) => {
  const {
    products_loading: loading,
    products_error: error,
  } = useProductsContext();

  const { filtered_products: featured} = useFilterContext()

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
          return <Product key={product._id} {...product} />;
        })}
      </div>
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
