import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
const ListView = ({ products }) => {
  function string_between_strings(startStr, endStr, str) {
    let pos = str.indexOf(startStr) + startStr.length;
    return str.substring(pos, str.indexOf(endStr, pos));
  }
  console.log(products)
  return (
    <Wrapper>
      {products.map((product) => {

        // console.log(product)
        const { _id, images, name, price, description } = product
        const listViewimages=images.map((image) => {
          // console.log(image.url, "image.url")
          let img_id = image.url;
          img_id = string_between_strings("/d/", "/view?", img_id);
          return { ...image, url: `https://drive.google.com/uc?export=view&id=${img_id}` }
        })
        console.log(listViewimages)
        const id = _id

        return (
          <article key={id}>
            <img src={listViewimages[0].url} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5 className='price'>{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link to={`/product/${id}`} className='btn'>
                Details
              </Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView
