import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import desktop_carousel_1 from "../assets/carouselImg/Preorder_Desktop_1.webp";
import desktop_carousel_2 from "../assets/carouselImg/Preorder_Desktop_2.webp";
import mobile_carousel_1 from "../assets/carouselImg/Preorder_Mobile_1.webp";
import mobile_carousel_2 from "../assets/carouselImg/Preorder_Mobile_2.webp";

let slides = [];
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

const StyledArrowRight = styled(MdKeyboardArrowRight)`
color: black;
z-index: 1;
position: absolute;
right: 5%;
top : 50%;
width: 50px;
height: 50px;
font-size: 35px;
align-items: center;
cursor: pointer;
:hover {
  background-color: #d9d9d9;
}
`;

const StyledArrowLeft = styled(MdKeyboardArrowLeft)`
  color: white;
  z-index: 1;
  position: absolute;
  left: 5%;
  width: 50px;
  height: 50px;
  font-size: 35px;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #d9d9d9;
  }
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
    setCurrentImage(slides[currentIndex].img);
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex(prevIndex => prevIndex+1);
  }

  const prevImage = () => {
    setCurrentIndex(prevIndex => prevIndex-1);
  }

  const setSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <StyledCarouselContainer>
      {currentIndex !== 0 && 
          <StyledArrowLeft onClick={prevImage}>
            <MdKeyboardArrowLeft/>
          </StyledArrowLeft>
      }
      {currentImage === slides[currentIndex].img && (
        <StyledImageContainer>
          <StyledImage src={currentImage} />
        </StyledImageContainer>
       
      )}
      {currentIndex !== slides.length-1 && 
      <StyledArrowRight onClick={nextImage}>
         <MdKeyboardArrowRight/>
      </StyledArrowRight>  
     }

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
