import "./Header.css"
import {Link} from "react-router-dom";
function Header() {
    return (
        <div className="header-cont">
            <h1 className="header-title">Crypto Currency Portfolio Tracker</h1>
            
            <ul className="nav-list">
                <Link className="link" to="/">Coin-List</Link>
                <Link className="link" to="portfolio">Portfolio</Link>
                <Link className="link" to="history">History</Link>
            </ul>
        </div>
    )
}

export default Header