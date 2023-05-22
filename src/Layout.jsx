import { useState } from "react";
import PageContainer from "./PageContainer";
export default Layout;
import { NavBar } from "./assets/components/navBar/NavBar.jsx";
import './index.css'




function Layout() {
  return (
    <div className="layoutNew">      
      <NavBar /> 
      <PageContainer /> 
    </div>
  )
}
