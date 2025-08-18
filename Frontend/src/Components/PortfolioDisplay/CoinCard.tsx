import type {
     cryptoItemHeld
} from "../../Types/Types.ts";
import "./PortfolioDisplay.css"
import {
    useEffect,
    useState,
} from "react";
interface CoinCardProps {
    coin: cryptoItemHeld
}

function CoinCard({coin}: CoinCardProps) {
    const [currentPrice, setCurrentPrice] = useState<number>(coin.current_price);

    useEffect(() => {
        const fetchCurrentPrice = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id.toLowerCase()}`);
                const data = await response.json();
                setCurrentPrice(data.market_data.current_price.usd);
            } catch (error) {
                console.error(error);
        }
        };
        fetchCurrentPrice();
    }, [coin.id]);
    
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