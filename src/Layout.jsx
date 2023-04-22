import { useState } from "react";
import PageContainer from "./PageContainer";
export default Layout;
import { NavBar } from "./assets/components/navBar/NavBar.jsx";
import Search from "./assets/components/Searchbar/Search.jsx";



function Layout() {
  return (
    <>      
      <NavBar />
      <Search />   
      <PageContainer />
      {/* <Footer></Footer> */}
    </>
  )
}
