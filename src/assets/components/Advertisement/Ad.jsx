import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import './Ad.css'
import obey from '../../pictures/AdObey.png'
import korv from '../../pictures/AdKorv.png'
import food from '../../pictures/AdFood.png'
import breadButterAd from '../../pictures/breadButterAd.jpg'
import foody from '../../pictures/foody.jpg'

// window.innerWidth < 720 ? setadList(adMobilePhotos) : setadList(adPhotos)
 const adPhotos = [
   hamb
 ]

 const adMobilePhotos = [
  obey,
  korv,
  food,
  breadButterAd,
  foody,
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
  "image9.jpg",
];

const AdCarousel = () => {
  const[isMobile, setisMobile] = useState(window.innerWidth < 720)


  const updateMedia = () => {
    setisMobile(window.innerWidth < 730);
  };

useEffect(() => {
  window.addEventListener("resize", updateMedia);
  return () => window.removeEventListener("resize", updateMedia)
}, [isMobile]);

if(isMobile)
{
  return (
    <Carousel style={{ margin: "25px" }}>
      {adMobilePhotos.map((photo, index) => (
        <Carousel.Item key={index}>
          <img src={photo} alt={`Ad Photo ${index + 1}`} className="img" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
      }
  else{
    return(
    <Carousel style={{ margin: "25px" }}>
      {adPhotos.map((photo, index) => (
        <Carousel.Item key={index}>
          <img src={photo} alt={`Ad Photo ${index + 1}`} className="img" />
        </Carousel.Item>
      ))}
    </Carousel> 
    );
    }
  
}


export default AdCarousel;
