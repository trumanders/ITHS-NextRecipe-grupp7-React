import { Footer } from "./assets/components/footer/footer";
import { Outlet } from "react-router-dom";

 function PageContainer() {
  return (
    <div id="wrapper">
      <Outlet />
      <Footer />
    </div>
  );
}
export default PageContainer;
