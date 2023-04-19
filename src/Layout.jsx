import { useState } from "react";
import PageContainer from "./PageContainer";
export default Layout;
import { NavBar } from "./assets/components/navBar/NavBar.jsx";
import Recipe from "./assets/components/recipe-info/Recipe";



function Layout() {
  return (
    <>
      
      {/* <NavBar /> */}
      <PageContainer />
      <Recipe></Recipe>
      {/* <Footer></Footer> */}
    </>
  )
}
