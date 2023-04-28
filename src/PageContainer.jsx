import { useState } from "react";
import { Container } from "react-bootstrap";
  import AboutUs from "./assets/pages/about/AboutUs";
  import { ContactUs } from "./assets/pages/contact/ContactForm";
import Home from "./assets/pages/home/Home"



import {
  Routes,
  Route,
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
 function PageContainer() {
  return (
    <div id="wrapper">
      <Outlet />
      {/* <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
        <Route path="recipe/:recipeId" element={<Recipe />} />
      </Routes> */}
    </div>
  );
}
export default PageContainer;
