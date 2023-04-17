import { useState } from "react";
import PageContainer from "./PageContainer";
export default Layout;
import { NavBar } from "./assets/components/navBar/NavBar.jsx";



function Layout() {
  return (
    <>      
      <NavBar />      
      <PageContainer />
      {/* <Footer></Footer> */}
    </>
  )
}
