import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import desktop_carousel_1 from "../assets/carouselImg/Preorder_Desktop_1.webp";
import desktop_carousel_2 from "../assets/carouselImg/Preorder_Desktop_2.webp";
import mobile_carousel_1 from "../assets/carouselImg/Preorder_Mobile_1.webp";
import mobile_carousel_2 from "../assets/carouselImg/Preorder_Mobile_2.webp";

let slides = [];
// const TextAnimation = keyframes`
// 0% {
//     bottom: 30%;
//     opacity: 0;
// }
// 100% {
//     bottom: 35%;
//     opacity: 1;
// }
// `;
const ImageAnimation = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;
const StyledCarouselContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImageContainer = styled.div`
  width: auto;
  height: auto;
  animation: ${ImageAnimation} 1s ease;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// const StyledTextContainer = styled.div`
//   width: 30%;
//   height: 30%;
//   left: 15%;
//   bottom: 35%;
//   position: absolute;
//   animation: ${TextAnimation} 1s ease-out;
//   h2 {
//     font-size: 2.5rem;
//     font-weight: 700;
//   }
//   p {
//     margin-top: 2rem;
//   }
//   .btn {
//     margin-top: 1rem;
//     padding: 0.8rem 1.5rem;
//   }
// `;

const StyledIndicatorContainer = styled.div`
  width: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 5%;
`;

const StyledIndicator = styled.div`
  height: 13px;
  width: 13px;
  border-radius: 50%;
  background-color: black;
  background-color: ${(props) => props.bgColor}};
  z-index: 1;
  border: 2px solid ${(props) => props.bgBorder}};
`;

const Carousel = () => {
  if (window.innerWidth < 790) {
    slides = [
      {
        name: "Product 3",
        url: "https://drive.google.com/file/d/1mfdlPgDbdmIsbGCHwuci-FzxYrk1M5Q9/view?usp=share_link",
        discription:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae asperiores illo, aspernatur officia atque voluptatibus temporibus.",
        img: mobile_carousel_1,
      },
      {
        name: "Product 4",
        url: "https://drive.google.com/file/d/1mfdlPgDbdmIsbGCHwuci-FzxYrk1M5Q9/view?usp=share_link",
        discription:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae asperiores illo, aspernatur officia atque voluptatibus temporibus.",
        img: mobile_carousel_2,
      },
    ];
  } else {
    slides = [
      {
        name: "Pre Order Now...",
        url: "https://drive.google.com/file/d/14wQLMFP32zvdIlC3TYaHFasLnhEBQTC2/view?usp=sharing",
        discription:
          "Buy from our table lamp series and get a chance to win this",
        img: desktop_carousel_1,
      },
      {
        name: "Product 2",
        url: "https://drive.google.com/file/d/1mfdlPgDbdmIsbGCHwuci-FzxYrk1M5Q9/view?usp=share_link",
        discription:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae asperiores illo, aspernatur officia atque voluptatibus temporibus.",
        img: desktop_carousel_2,
      },
    ];
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    // setTimeout(() => {
    //   setCurrentIndex(currentIndex => {
    //     const newIndex = currentIndex + 1;
    //     return newIndex > slides.length - 1 ? 0 : newIndex;
    //   });
    // }, 2000);
    setCurrentImage(slides[currentIndex].img);
  }, [currentIndex]);

  const setSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <StyledCarouselContainer>
      {currentImage === slides[currentIndex].img && (
        <StyledImageContainer>
          <StyledImage src={currentImage} />
        </StyledImageContainer>
      )}
      {/* {currentImage === slides[currentIndex].img && (
        <StyledTextContainer>
          <h2>{slides[currentIndex].name}</h2>
          <p>{slides[currentIndex].discription}</p>
          <Link to="/products" className="btn hero-btn">
            Discover Now
          </Link>
        </StyledTextContainer>
      )} */}

      <StyledIndicatorContainer>
        {slides.map((img, index) => (
          <StyledIndicator
            key={index}
            onClick={() => setSlide(index)}
            bgColor={index === currentIndex ? "#fff" : "#c2c2c2"}
            bgBorder={
              index === currentIndex ? "var(--clr-text-brown)" : "#c2c2c2"
            }
          />
        ))}
      </StyledIndicatorContainer>
    </StyledCarouselContainer>
  );
};

export default Carousel;
