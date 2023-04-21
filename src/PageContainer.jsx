import { useState } from "react";
import { Container } from "react-bootstrap";
import AboutUs from "./assets/pages/about/AboutUs";
import { ContactUs } from "./assets/pages/contact/ContactForm";
import RecipeRepresentation from "./assets/components/RecipeRepresentation/RecipeRepresentation";
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
    <Container>
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="recipe/:recipeId" element={<Recipe />} /> */}
      </Routes>
    </Container>
  );
}
export default PageContainer;
