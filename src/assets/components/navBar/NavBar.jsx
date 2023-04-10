import './NavBar.css'
import './NavFunc'
import {Burger} from './burger.jsx'

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
            <li className="navOpt"><p>Adv. Search</p></li>
            <li className="navOpt"><p>About</p></li>
            <li className="navOpt"><p>Contact</p></li>
        </ul>
    </div>
    )
}

export {NavBar};