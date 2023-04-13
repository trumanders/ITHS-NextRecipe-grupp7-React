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
 function PageContainer() {
  return (
    <Container>
      <Routes>              
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} /> 
      </Routes>
    </Container>
  );
}
export default PageContainer;
