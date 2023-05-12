import { useState, useEffect } from "react";
import "./NavBar.css";
import { Burger } from "./burger.jsx";
import { Link } from "react-router-dom";
import logo from '../../pictures/logo.png'

function NavBar(){
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 730);

    const updateMedia = () => {
        setIsMobile(window.innerWidth < 730)
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, [isMobile]);

  return (
    <div className="NavBar">
        {isMobile ? (<img src={logo} className="Logotype" alt="Logotype"/>) :
        (<a href="/"><img src={logo} className="Logotype" alt="Logotype"/></a>)}
        <div className="NaviIntro">
          <button className="menuButton" onClick={() => setVisible(!visible)}><Burger></Burger></button>
        </div>
            {!isMobile || visible ? (
        <ul>
          <li className="navOpt">
            <Link to="/">
              <p>Search</p>
            </Link>
          </li>
          <li className="navOpt">
            <Link to="/about">
              <p>About</p>
            </Link>
          </li>
          <li className="navOpt">
            <Link to="/contact">
              <p>Contact</p>
            </Link>
          </li>
        </ul>
        ) : (<></>)}
    </div>
  );
}

export {NavBar};