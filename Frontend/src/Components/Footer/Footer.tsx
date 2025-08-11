import "./Footer.css"
import CGLogo from "../../../public/coingecko.avif"
function Footer() {
    return (
        <div className="footer-cont">
     <img className="footer-logo" src={CGLogo} alt="Coin Gecko Logo"/>
        </div>
    )
}

export default Footer