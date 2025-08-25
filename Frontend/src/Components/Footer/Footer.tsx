import "./Footer.css"
import CGLogo from "../../../public/coingecko.avif"
function Footer() {
    return (
        <footer className="footer-cont">
     <img className="footer-logo" src={CGLogo} alt="Coin Gecko Logo"/>
        </footer>
    )
}

export default Footer