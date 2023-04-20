import './NavBar.css'
import './NavFunc'
import {Burger} from './burger.jsx'
import {Link} from "react-router-dom";

function NavBar(){
    return (
    <div className="NavBar">
        <a href="./"><img src="logotype.png" className="Logotype" alt="Logotype"/></a>
        <div className="NaviIntro">
            <Burger></Burger>
            <p>Website Name</p>
            <div className="searchIcon">
                <img src="src\assets\components\navBar\pngegg.png" alt="Search recipe" />
            </div>
        </div>
        <ul>
            <li className="navOpt"><p>Home</p></li>
            <li className="navOpt"><Link to="/search">Search</Link></li>
            <li className="navOpt"><Link to="/about">About</Link></li>
            <li className="navOpt"><Link to="/contact">Contact</Link></li>
            
        </ul>
    </div>
    )
}

export {NavBar};