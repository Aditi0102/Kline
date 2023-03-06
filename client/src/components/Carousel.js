import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";

import first from "../assets/carouselImg/img1.png";
import second from "../assets/carouselImg/img2.png";
import third from "../assets/carouselImg/img3.png";
import fourth from "../assets/carouselImg/img4.png";
import fifth from "../assets/carouselImg/img5.png";

const slides = [
  {
    name: "Product 1",
    url: "https://drive.google.com/file/d/14wQLMFP32zvdIlC3TYaHFasLnhEBQTC2/view?usp=sharing",
    discription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe tenetur et ratione voluptatum debitis.",
    img: first,
  },
  {
    name: "Product 2",
    url: "https://drive.google.com/file/d/1mfdlPgDbdmIsbGCHwuci-FzxYrk1M5Q9/view?usp=share_link",
    discription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae asperiores illo, aspernatur officia atque voluptatibus temporibus.",
    img: second,
  },
  {
    name: "Product 3",
    url: "https://drive.google.com/file/d/1wSEVHvc7voQX3kHrQUehZoE1es7qKP5n/view?usp=share_link",
    discription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolores, totam nostrum voluptatum placeat quia culpa officiis?",
    img: third,
  },
  {
    name: "Product 4",
    url: "https://drive.google.com/file/d/1HgI4mD-kqjr5CHPk75cZ41iL6M72teHC/view?usp=share_link",
    discription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vero suscipit rerum eaque consequatur deleniti quibusdam. Vitae, nihil.",
    img: fourth,
  },
  {
    name: "Product 5",
    url: "https://drive.google.com/file/d/1eJCww96Q_q6BqakZnSgQab3VNBo9bXaT/view?usp=share_link",
    discription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium beatae a dolorem quod laboriosam quia debitis in sint.",
    img: fifth,
  },
];
const TextAnimation = keyframes`
0% {
    bottom: 30%;
    opacity: 0;
}
100% {    
    bottom: 35%;
    opacity: 1;
}
`;
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
  height: 120vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const StyledImageContainer = styled.div`
  width: 30%;
  height: 45%;
  position: absolute;
  right: 15%;
  animation: ${ImageAnimation} 1s ease-out;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 4rem;
`;

const StyledTextContainer = styled.div`
  width: 30%;
  height: 30%;
  left: 19%;
  bottom: 35%;
  position: absolute;
  animation: ${TextAnimation} 1s ease-out;
  p {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;

const StyledIndicatorContainer = styled.div`
  width: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 20%;
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const setSlide = (index) => {
    console.log(index);
    setCurrentIndex(index);
  };

  return (
    <StyledCarouselContainer>
      <StyledImageContainer>
        <StyledImage src={slides[currentIndex].img} />
      </StyledImageContainer>
      <StyledTextContainer>
        <h2>{slides[currentIndex].name}</h2>
        <p>{slides[currentIndex].discription}</p>
        <Link to="/products" className="btn hero-btn">
          Discover Now
        </Link>
      </StyledTextContainer>
      <StyledIndicatorContainer>
        {slides.map((img, index) => (
          <StyledIndicator
            key={index}
            onClick={()=>setSlide(index)}
            bgColor={index === currentIndex ? "#fff" : "#c2c2c2"}
            bgBorder={index === currentIndex ? "var(--clr-text-brown)" : "#c2c2c2"}
          />
        ))}
      </StyledIndicatorContainer>
    </StyledCarouselContainer>
  );
};

export default Carousel;
