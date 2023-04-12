import {useState, useEffect} from 'react'
import './NavBar.css'
import './NavFunc'
import {Burger} from './burger.jsx'

function NavBar(){
    const [visible, setVisible] = useState(false)
    const [screenSize, setScreenSize] = useState()

    const getCurrentDimension = () => {
        return window.innerWidth
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener("resize", updateDimension)

        return(() => {
            window.removeEventListener("resize", updateDimension)
        })
    },[screenSize])


    return (
    <div className="NavBar">
        <a href="./"><img src="logotype.png" className="Logotype" alt="Logotype"/></a>
        <div className="NaviIntro">
            <button onClick={() => setVisible(!visible)}><Burger></Burger></button>
            <p>Website Name</p>
            <div className="searchIcon">
                <img src="src\assets\components\navBar\pngegg.png" alt="Search recipe" />
            </div>
        </div>
        
            {visible || screenSize > 1200 ? (
        <ul>
            <li className="navOpt"><p>Home</p></li>
            <li className="navOpt"><p>Adv. Search</p></li>
            <li className="navOpt"><p>About</p></li>
            <li className="navOpt"><p>Contact</p></li>
        </ul>
        ) : (<></>)
            }
    </div>
    )
}

export {NavBar};
