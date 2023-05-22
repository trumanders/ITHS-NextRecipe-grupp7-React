import React from "react";
import Carousel from "react-bootstrap/Carousel";

const adPhotos = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
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
