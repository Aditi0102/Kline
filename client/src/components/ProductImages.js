import React, { useEffect, useState } from "react";
import styled from "styled-components";
const ProductImages = ({ images = [[]] }) => {
  //STATES

  const [main, setMain] = useState(images[0]);
  //FUNCTIONS

  function string_between_strings(startStr, endStr, str) {
    let pos = str?.indexOf(startStr) + startStr?.length;
    return str?.substring(pos, str.indexOf(endStr, pos));
  }

  const newImages = images.map((image) => {
    // console.log(image.url, "image.url")
    let img_id = image.url;
    img_id = string_between_strings("/d/", "/view?", img_id);
    return {
      ...image,
      url: `https://drive.google.com/uc?export=view&id=${img_id}`,
    };
  });

  //EFFECTS

  useEffect(() => {
    setMain(newImages[0]);
  }, []);
  // console.log(main, "mains");
  // console.log(newImages, "newImages");
  //RENDER


  return (
    <Wrapper>
      <img src={main?.url} alt="" className="main " />
      <div className="gallery">
        {newImages?.map((newImages, index) => {
          return (
            <img
              src={newImages.url}
              alt=""
              key={index}
              className={`${newImages?.url === main?.url ? "active" : null}`}
              onClick={() => {
                setMain(newImages);
              }}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
