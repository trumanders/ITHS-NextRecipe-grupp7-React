import './NavBar.css'

function NavBar(){
    return (
    <div className="NavBar">
        <p>Potato</p>
        <ul>
            <li><>{/* LOGOTYPE HERE */}</></li>
            <li>Home</li>
            <li>Adv. Search</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </div>
    )
}

export {NavBar};