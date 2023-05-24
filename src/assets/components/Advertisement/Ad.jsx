import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Ad.css";
import obey from "../../pictures/AdObey.png";
import korv from "../../pictures/AdKorv.png";
import food from "../../pictures/AdFood.png";
import hamb from "../../pictures/adNailSoup.jpg";
import admobile from "../../pictures/AdNailSoupMobile.jpg";

// window.innerWidth < 720 ? setadList(adMobilePhotos) : setadList(adPhotos)
const adPhotos = [
  { picture: hamb, link: "https://www.byggmax.se/spik-och-skruv/spik" },
  { picture: hamb, link: "https://www.biltema.se/bygg/fastelement/spik/" },
];

const adMobilePhotos = [
  { picture: admobile, link: "https://www.byggmax.se/spik-och-skruv/spik" },
  { picture: admobile, link: "https://www.biltema.se/bygg/fastelement/spik/" },
];

const AdCarousel = () => {
  const [isMobile, setisMobile] = useState(window.innerWidth < 770);

  const updateMedia = () => {
    setisMobile(window.innerWidth < 770);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isMobile]);

  if (isMobile) {
    return (
      <Carousel style={{ margin: "25px" }}>
        {adMobilePhotos.map((ad, index) => (
          <Carousel.Item key={index}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img
                src={ad.picture}
                alt={`Ad Photo ${index + 1}`}
                className="img"
              />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  } else {
    return (
      <Carousel style={{ margin: "25px" }}>
        {adPhotos.map((ad, index) => (
          <Carousel.Item key={index}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img
                src={ad.picture}
                alt={`Ad Photo ${index + 1}`}
                className="img"
              />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
};

export default AdCarousel;
