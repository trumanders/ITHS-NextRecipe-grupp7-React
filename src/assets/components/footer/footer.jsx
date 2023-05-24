import { Link } from "react-router-dom";
import "./footer.css";

export function Footer() {
  return (
    <div id="footer">
      <hr />
      <div className="footerFlex">
        <div id="leftBox">
          <ul id="footerNav">
            <li className="footerNavOpt">
              <Link to="/">Search</Link>
            </li>
            <li className="footerNavOpt">
              <Link to="/about">About us</Link>
            </li>
            <li className="footerNavOpt">
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
        <div id="rightBox">
          <p id="footerInfo">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <p id="footerCopyright">Nail Soup 1.1 - © 2023</p>
    </div>
  );
}
