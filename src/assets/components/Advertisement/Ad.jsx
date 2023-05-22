import React from "react";
import Carousel from "react-bootstrap/Carousel";
import './Ad.css'
import obey from '../../pictures/AdObey.png'
import korv from '../../pictures/AdKorv.png'
import food from '../../pictures/AdFood.png'

const adPhotos = [
  obey,
  korv,
  food,
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
  "image9.jpg",
];

const AdCarousel = () => {
  return (
    <Carousel style={{ margin: "25px" }}>
      {adPhotos.map((photo, index) => (
        <Carousel.Item key={index}>
          <img src={photo} alt={`Ad Photo ${index + 1}`} className="img" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AdCarousel;
