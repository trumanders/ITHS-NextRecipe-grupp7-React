import { useEffect, useState } from 'react';
import './AboutUs.css'
import breakfast from '../../pictures/breakfast.jpg'
import noodlesrice from '../../pictures/noodlesrice.jpg'
import saladbowl from '../../pictures/saladbowl.jpg'



function AboutUs() {
    const [IsMobile, setIsMobile] = useState(window.innerWidth < 730);
    const updateMedia = () =>{
        setIsMobile(window.innerWidth < 730);
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, [IsMobile]);

  return (
    <>
        <h2 className="aboutTitle">About Us</h2>
        {IsMobile ? (
        <>
          <div className="aboutRow">
            <div className="aboutCol">
              <p className="aboutText">
                Welcome to Nail Soup, the result of a thrilling adventure embarked upon by a team of passionate individuals.
                We are a group of seven developers and two project leaders who, in the midst of our careers, decided to
                pursue a new path and embrace the exciting world of app development. Our journey began with this very app,
                which started as a school project. With only a basic understanding of JavaScript and no prior knowledge of
                React, we dove headfirst into the world of coding, learning and implementing simultaneously.
              </p>
            </div>
          </div>
          <div className="aboutRow">
            <div className="aboutCol">
              <img className="aboutImg" src={breakfast} alt="" />
            </div>
          </div>
          <div className="aboutRow">
            <div className="aboutCol">
              <p className="aboutText">
                At its core, Nail Soup is a recipe finder app that aims to make your daily cooking experience easier and
                more enjoyable. We understand the struggle of staring at a seemingly empty fridge and wondering what to
                cook. That's why our app allows you to search for recipes based on the ingredients you already have at
                home.
                But that's not all. Nail Soup also offers a random search feature for those times when you're feeling
                adventurous or simply need inspiration. Additionally, you can search for recipes based on specific criteria
                such as meal type, dietary preferences, intolerances and get suggestions for similar recipes.
              </p>
            </div>
          </div>
          <div className="aboutRow">
            <div className="aboutCol">
              <img className="aboutImg" src={noodlesrice} alt="" />
            </div>
          </div>
          <div className="aboutRow">
            <div className="aboutCol">
              <p className="aboutText">
                When it comes to nutrition, we've got you covered too. Our app provides detailed nutritional information
                for each recipe, allowing you to make informed decisions about your meals.
                We understand that cooking involves precise measurements, and that's why we've incorporated a feature
                that lets you customize ingredient sizes according to your specific requirements. No need to reach for a
                separate calculator or leave the app. Nail Soup takes care of the calculations for you, ensuring that your
                cooking experience remains seamless and hassle-free.
              </p>
            </div>
          </div>
          <div className="aboutRow">
            <div className="aboutCol">
              <img className="aboutImg" src={saladbowl} alt="" />
            </div>
          </div>
          <div className="aboutRow">
            <div className="aboutCol">
              <p className="aboutText">
                Cooking can be a juggling act, trying to follow instructions while keeping an eye on multiple tasks.
                We've simplified this process for you. Our app allows you to check off each step as you complete it,
                with the text color changing to help you easily identify where you are in the recipe. It's as simple as a
                quick swipe of the eye.
                But our journey doesn't end here. We firmly believe in the power of constant progress and improvement.
                We are open to feedback and suggestions, as we strive to create an app that truly caters to your needs
                and makes your cooking adventures even more delightful.
                Join us on this exciting culinary journey with Nail Soup. Let us be your companion in the kitchen,
                simplifying your cooking experience one recipe at a time.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="aboutRow">
            <div className="aboutCol about60percent">
              <p className="aboutText">
                Welcome to Nail Soup, the result of a thrilling adventure embarked upon by a team of passionate individuals.
                We are a group of seven developers and two project leaders who, in the midst of our careers, decided to
                pursue a new path and embrace the exciting world of app development. Our journey began with this very app,
                which started as a school project. With only a basic understanding of JavaScript and no prior knowledge of
                React, we dove headfirst into the world of coding, learning and implementing simultaneously.
              </p>
            </div>
            <div className="aboutCol about40percent">
              <img className="aboutImg" src={breakfast} alt="" />
            </div>
          </div>
          <div className="aboutRow">
            <div className="aboutCol about40percent">
              <img className="aboutImg" src={noodlesrice} alt="" />
            </div>
            <div className="aboutCol about60percent">
              <p className="aboutText">
                At its core, Nail Soup is a recipe finder app that aims to make your daily cooking experience easier and
                more enjoyable. We understand the struggle of staring at a seemingly empty fridge and wondering what to
                cook. That's why our app allows you to search for recipes based on the ingredients you already have at
                home.
                But that's not all. Nail Soup also offers a random search feature for those times when you're feeling
                adventurous or simply need inspiration. Additionally, you can search for recipes based on specific criteria
                such as meal type, dietary preferences, intolerances and get suggestions for similar recipes.
              </p>
            </div>
          </div>
          <div className="aboutRow">
            <div className="aboutCol about60percent">
              <p className="aboutText">
                When it comes to nutrition, we've got you covered too. Our app provides detailed nutritional information
                for each recipe, allowing you to make informed decisions about your meals.
                We understand that cooking involves precise measurements, and that's why we've incorporated a feature
                that lets you customize ingredient sizes according to your specific requirements. No need to reach for a
                separate calculator or leave the app. Nail Soup takes care of the calculations for you, ensuring that your
                cooking experience remains seamless and hassle-free.
              </p>
            </div>
            <div className="aboutCol about40percent">
              <img className="aboutImg" src={saladbowl} alt="" />
            </div>
          </div>
          <div className="aboutRow">
            <div className="aboutCol about40percent">
              <img className="aboutImg" src={breakfast} alt="" />
            </div>
            <div className="aboutCol about60percent">
              <p className="aboutText">
                Cooking can be a juggling act, trying to follow instructions while keeping an eye on multiple tasks.
                We've simplified this process for you. Our app allows you to check off each step as you complete it,
                with the text color changing to help you easily identify where you are in the recipe. It's as simple as a
                quick swipe of the eye.
                But our journey doesn't end here. We firmly believe in the power of constant progress and improvement.
                We are open to feedback and suggestions, as we strive to create an app that truly caters to your needs
                and makes your cooking adventures even more delightful.
                Join us on this exciting culinary journey with Nail Soup. Let us be your companion in the kitchen,
                simplifying your cooking experience one recipe at a time.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default AboutUs;