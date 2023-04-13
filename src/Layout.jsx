import { useState } from "react";
import PageContainer from "./PageContainer";
export default Layout;
import { NavBar } from "./assets/components/navBar/NavBar.jsx";

function Layout() {
  return (
    <>
      {/* Här ska stoppas navbaren in */}
      <NavBar />
      <PageContainer />
    </>
  );
}
