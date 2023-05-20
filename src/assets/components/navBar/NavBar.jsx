import { useRef, useState, useEffect } from "react";
import "./NavBar.css";
import { Burger } from "./burger.jsx";
import { Link } from "react-router-dom";
import logo from '../../pictures/logo.png'
import listenForOutsideClicks from "../Searchbar/listenForOutsideClicks";

function NavBar(){
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 730);
    const menuRef = useRef(null);
    const [listening, setListening] = useState(false)
    const updateMedia = () => {
        setIsMobile(window.innerWidth < 730)
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, [isMobile]);

    //Sätter igång funktionen som kollar om man klickar utanför burgar-menyn och då stänger densamma
    useEffect(listenForOutsideClicks(listening, setListening, menuRef, setVisible))

  return (
    <div className="NavBar">
        {isMobile ? (<img src={logo} className="Logotype" alt="Logotype"/>) :
        (<a href="/"><img src={logo} className="Logotype" alt="Logotype"/></a>)}
        <div className="NaviIntro" ref={menuRef}>
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