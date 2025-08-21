import type {
     cryptoItemHeld
} from "../../Types/Types.ts";
import "./PortfolioDisplay.css"


interface CoinCardProps {
    coin: cryptoItemHeld,
    coinPrices: {[key: string] : {usd: number}}
}

function CoinCard({coin, coinPrices}: CoinCardProps) {
    const currentPrice = coinPrices[coin.id]?.usd || 0;
    
    const total_value = coin.volume * currentPrice;
    const price_change_since_buy = (currentPrice * coin.volume) - (coin.purchase_price * coin.volume); 
    
    
    
    return (
        <div className="coin-card">
            <img className="coin-card-img" src={coin.img} alt={coin.name}/>
            <h2 className="coin-card-item">{coin.name}</h2>
            <p className="coin-card-item">Volume Held: {coin.volume}</p>
            <p className="coin-card-item">Current Value Held: ${new Intl.NumberFormat().format(total_value)}</p> 
            <p className="coin-card-item">Price Change: ${new Intl.NumberFormat().format(price_change_since_buy)}</p>
        </div>
    )
}

export default CoinCard