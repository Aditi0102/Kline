import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
// import { Link } from "react-router-dom";

import desktop_carousel from "../assets/carouselImg/kline-decor2.webp";
import mobile_carousel from "../assets/carouselImg/kline-decor-mobile.webp";

// import second from "../assets/carouselImg/img2.png";
// import third from "../assets/carouselImg/img3.png";
// import fourth from "../assets/carouselImg/img4.png";
// import fifth from "../assets/carouselImg/img5.png";

// const slides = [
//   {
//     name: "Pre Order Now...",
//     url: "https://drive.google.com/file/d/14wQLMFP32zvdIlC3TYaHFasLnhEBQTC2/view?usp=sharing",
//     discription: "Buy from our table lamp series and get a chance to win this",
//     img: first,
//   },
//   {
//     name: "Product 2",
//     url: "https://drive.google.com/file/d/1mfdlPgDbdmIsbGCHwuci-FzxYrk1M5Q9/view?usp=share_link",
//     discription:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae asperiores illo, aspernatur officia atque voluptatibus temporibus.",
//     img: second,
//   },
//   {
//     name: "Product 3",
//     url: "https://drive.google.com/file/d/1wSEVHvc7voQX3kHrQUehZoE1es7qKP5n/view?usp=share_link",
//     discription:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolores, totam nostrum voluptatum placeat quia culpa officiis?",
//     img: third,
//   },
//   {
//     name: "Product 4",
//     url: "https://drive.google.com/file/d/1HgI4mD-kqjr5CHPk75cZ41iL6M72teHC/view?usp=share_link",
//     discription:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vero suscipit rerum eaque consequatur deleniti quibusdam. Vitae, nihil.",
//     img: fourth,
//   },
//   {
//     name: "Product 5",
//     url: "https://drive.google.com/file/d/1eJCww96Q_q6BqakZnSgQab3VNBo9bXaT/view?usp=share_link",
//     discription:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium beatae a dolorem quod laboriosam quia debitis in sint.",
//     img: fifth,
//   },
// ];
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
// const ImageAnimation = keyframes`
// 0% {
//     opacity: 0;
// }
// 100% {    
//     opacity: 1;
// }
// `;
const StyledCarouselContainer = styled.div`
  width: 100%;
  height: 120vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${mobile_carousel});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: var(--clr-smokewhite);
  background-position: top center;
  @media (min-width: 768px) {
    background-image: url(${desktop_carousel}); 
  }
`;

// const StyledImageContainer = styled.div`
//   width: 25%;
//   height: 60%;
//   position: absolute;
//   right: 17%;
//   animation: ${ImageAnimation} 1s ease-out;
// `;

// const StyledImage = styled.img`
//   width: 100%;
//   height: 100%;
// `;

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
  width: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 20%;
`;

// const StyledIndicator = styled.div`
//   height: 13px;
//   width: 13px;
//   border-radius: 50%;
//   background-color: black;
//   background-color: ${(props) => props.bgColor}};
//   z-index: 1;
//   border: 2px solid ${(props) => props.bgBorder}};
// `;

const Carousel = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [currentImage, setCurrentImage] = useState("");

  // useEffect(() => {
  //   setCurrentImage(slides[currentIndex].img);
  // }, [currentIndex]);

  // const setSlide = (index) => {
  //   console.log(index);
  //   setCurrentIndex(index);
  // };

  return (
    <StyledCarouselContainer>
      {/* {currentImage === slides[currentIndex].img && (
        <StyledImageContainer>
          <StyledImage src={slides[currentIndex].img} />
        </StyledImageContainer>
      )}
      {currentImage === slides[currentIndex].img && (
        <StyledTextContainer>
          <h2>{slides[currentIndex].name}</h2>
          <p>{slides[currentIndex].discription}</p>
          <Link to="/products" className="btn hero-btn">
            Discover Now
          </Link>
        </StyledTextContainer>
      )} */}

      <StyledIndicatorContainer>
        {/* {slides.map((img, index) => (
          <StyledIndicator
            key={index}
            onClick={() => setSlide(index)}
            bgColor={index === currentIndex ? "#fff" : "#c2c2c2"}
            bgBorder={
              index === currentIndex ? "var(--clr-text-brown)" : "#c2c2c2"
            }
          />
        ))} */}
      </StyledIndicatorContainer>
    </StyledCarouselContainer>
  );
};

export default Carousel;
