import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
// import indvProduct from "../assets/products/products_indv.json";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
const SingleProductPage = () => {
  const { productid } = useParams();
  const id = productid;
  // console.log(url);
  // console.log(`ye useParam ke baad wali hai ${id}`);
  const navigate = useNavigate();

  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  console.log(`${url}${id}`, "single product url in single product page");

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);
  console.log(product, "single product");
  const single_product = { ...product.product };
  const {
    name,
    price,
    description,
    stock,
    rating: stars,
    reviews,
    _id: sku,
    images,
  } = single_product;

  const Wrapper = styled.main`
    .product-center {
      display: grid;
      gap: 4rem;
      margin-top: 2rem;
    }
    .price {
      color: var(--clr-primary-5);
    }
    .desc {
      line-height: 2;
      max-width: 45em;
      color: var(--clr-grey-3);
    }
    .info {
      text-transform: capitalize;
      width: 300px;
      display: grid;
      grid-template-columns: 125px 1fr;
      color: var(--clr-grey-3);
      span {
        font-weight: 700;
      }
    }

    @media (min-width: 992px) {
      .product-center {
        grid-template-columns: 1fr 1fr;
        align-items: center;
      }
      .price {
        font-size: 1.25rem;
      }
    }
  `;

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        {/* <Link to="/products" className="btn">
          back to products
        </Link> */}
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            {/* <Stars stars={stars} reviews={reviews} /> */}
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU :</span>
              {sku}
            </p>
            {/* <p className="info">
              <span>Brand :</span>
              {company}
            </p> */}
            <hr />
            {stock > 0 && <AddToCart product={single_product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleProductPage;
