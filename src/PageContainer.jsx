import { useState } from "react";
import { Container } from "react-bootstrap";
import AboutUs from "./assets/components/about/AboutUs";
import { ContactUs } from "./assets/components/contact/ContactForm";
import RecipeRepresentation from "./assets/components/RecipeRepresentation/RecipeRepresentation";

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
      {/* SEARCH-BAR HÄR? Förutom när about eller contact visas? */}
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/" element={<RecipeRepresentation />} />
      </Routes>
    </Container>
  );
}
export default PageContainer;
