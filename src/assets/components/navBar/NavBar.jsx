import { useState, useEffect } from "react";
import "./NavBar.css";
import "./NavFunc";
import { Burger } from "./burger.jsx";
import { Link } from "react-router-dom";

function NavBar() {
  const [visible, setVisible] = useState(false);
  const [screenSize, setScreenSize] = useState();

  const getCurrentDimension = () => {
    return window.innerWidth;
  };

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <div className="NavBar">
      <a href="./">
        <img src="logotype.png" className="Logotype" alt="Logotype" />
      </a>
      <div className="NaviIntro">
        <button onClick={() => setVisible(!visible)}>
          <Burger></Burger>
        </button>
        <p>Nail Soup</p>
        <div className="searchIcon">
          <img
            src="src/assets/components/navBar/pngegg.png"
            alt="Search recipe"
          />
        </div>
      </div>

      {visible || screenSize > 1199 ? (
        <ul>
          <li className="navOpt">
            <Link to="">
              <p>Home</p>
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
      ) : (
        <></>
      )}
    </div>
  );
}

export { NavBar };
