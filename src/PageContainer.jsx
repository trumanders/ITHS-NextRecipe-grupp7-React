import { useState } from "react";
import { Container } from "react-bootstrap";
import AboutUs from "./assets/components/about/AboutUs";
import { ContactUs } from "./assets/components/contact/ContactForm";
import RecipeRepresentation from "./assets/components/RecipeRepresentation/RecipeRepresentation";
import Search from "./assets/components/Searchbar/Search.jsx";
import Home from "./assets/components/home/Home"

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
    <div className="wrapper">
      {/* <Search /> */}
      {/* SEARCH-BAR HÄR? Förutom när about eller contact visas? */}
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
export default PageContainer;
