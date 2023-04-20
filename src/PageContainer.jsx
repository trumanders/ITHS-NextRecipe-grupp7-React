import { useState } from "react";
import { Container } from "react-bootstrap";
import AboutUs from "./assets/components/about/AboutUs";
import {ContactUs} from "./assets/components/contact/ContactForm"

import {
  Routes,
  Route,
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import Search from "./assets/components/Searchbar/Search";

 function PageContainer() {
  return (
    <Container>
      <Routes>
          <Route path="search" element={<Search />}  />            
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} /> 
      </Routes>
    </Container>
  );
}
export default PageContainer;
