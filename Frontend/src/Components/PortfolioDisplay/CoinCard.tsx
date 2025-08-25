import type {
     cryptoItemHeld
} from "../../Types/Types.ts";
import "./PortfolioDisplay.css"
import {useCurrencyConvertor} from "../../Helper-Functions/ExchangeHook.tsx";
import {useCurrency} from "../../Context/currencyContext.tsx";
import {useAlert} from "../../Context/AlertContext.tsx";

interface CoinCardProps {
    coin: cryptoItemHeld,
    coinPrices: {[key: string] : {usd: number}}
    fetchPortfolio: () => void
}

function CoinCard({coin, coinPrices, fetchPortfolio}: CoinCardProps) {
    const currentPrice = coinPrices[coin.id]?.usd || 0;
    const total_value = coin.volume * currentPrice;
    const price_change_since_buy = (currentPrice * coin.volume) - (coin.purchase_price * coin.volume); 
    const {getDisplayPrice, getDisplayLargeNumber} = useCurrencyConvertor();
    const {currency} = useCurrency();
    const {showAlert} = useAlert();
    
    const handleSellAllOfOneCoin = async () => {
        const payload = {
            id: coin.id,
            name: coin.name,
            volume: coin.volume,
        }
        try {
            const response = await fetch(`http://localhost:5050/portfolio/sell`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                showAlert("Sell Status:", "Sell successful");
            }
           
            fetchPortfolio();
        } catch (error) {
            console.error(error);
            showAlert("Sell Status:", "Sell failed");
        }
    } 
    
    return (
        <div className="coin-card">
            <img className="coin-card-img" src={coin.img} alt={coin.name}/>
            <h2 className="coin-card-item">{coin.name}</h2>
            <p className="coin-card-item">Volume Held: {coin.volume}</p>
            <p className="coin-card-item">Current Value Held: {getDisplayLargeNumber(total_value, currency)}</p> 
            <p className="coin-card-item">Price Change: {getDisplayPrice(price_change_since_buy, currency)}</p>
            <button onClick={handleSellAllOfOneCoin}>Sell All</button>
        </div>
    )
}

export default CoinCard