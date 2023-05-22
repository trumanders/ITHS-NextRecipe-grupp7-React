import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import './Ad.css'
import obey from '../../pictures/AdObey.png'
import korv from '../../pictures/AdKorv.png'
import food from '../../pictures/AdFood.png'
import hamb from '../../pictures/adNailSoup.jpg'
import admobile from '../../pictures/adNailSoupMobile.jpg'

// window.innerWidth < 720 ? setadList(adMobilePhotos) : setadList(adPhotos)
 const adPhotos = [
    hamb,
    hamb,
    hamb
 ]

 const adMobilePhotos = [
   admobile,
   admobile,
   admobile
 ]

const AdCarousel = () => {
  const[isMobile, setisMobile] = useState(window.innerWidth < 760)


  const updateMedia = () => {
    setisMobile(window.innerWidth < 760);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia)
  }, [isMobile]);

  return (
    <div className="adContainer">
      {isMobile ? (
        <Carousel style={{ margin: "25px" }}>
          {adMobilePhotos.map((photo, index) => (
            <Carousel.Item key={index}>
              <img src={photo} alt={`Ad Photo ${index + 1}`} className="img" />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : 
      (
        <Carousel style={{ margin: "25px" }}>
          {adPhotos.map((photo, index) => (
            <Carousel.Item key={index}>
              <img src={photo} alt={`Ad Photo ${index + 1}`} className="img" />
            </Carousel.Item>
          ))}
        </Carousel> 
      )};
    </div>
  );
}
export default AdCarousel;
