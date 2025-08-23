import "./Header.css"
import {Link} from "react-router-dom";
import {useCurrency} from "../../Context/currencyContext.tsx";
import {useTheme} from "../../Context/themeContext.tsx";

function Header() {
    const {currency, setCurrency} = useCurrency();
    const {theme, setTheme} = useTheme();
    const {toggleTheme} = useTheme();
    const handleCurrencyChange = () => {
        setCurrency(currency === "usd" ? "gbp" : "usd");
    }
    
    return (
        <div className="header-cont">
            <h1 className="header-title">Crypto Currency Portfolio Tracker</h1>
            
            <ul className="nav-list">
                <Link className="link" to="/">Coin-List</Link>
                <Link className="link" to="portfolio">Portfolio</Link>
                <Link className="link" to="history">History</Link>
            </ul>
            <div className="header-options">
                <button onClick={handleCurrencyChange}>Currency: {currency.toUpperCase()}</button>
                <button onClick={toggleTheme}>Theme: {theme === "light" ? "DARK" : "LIGHT"}</button>

            </div>
        </div>
    )
}

export default Header