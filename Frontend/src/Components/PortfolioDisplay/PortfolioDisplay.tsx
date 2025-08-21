import CoinCard from "./CoinCard.tsx";
import {useEffect, useState} from "react";
import type {
   cryptoItemHeld
} from "../../Types/Types.ts";
import {useCoins} from "../../Context/coinsContext.tsx";
import "./PortfolioDisplay.css"
import PortfolioTotals from "./PortfolioTotals.tsx";

function PortfolioDisplay() {
    const {coins, loading} = useCoins();
    const [portfolio, setPortfolio] = useState<cryptoItemHeld[]>([]);
    const [coinPrices, setCoinPrices] = useState<any>({});
    const [loadingPrices, setLoadingPrices] = useState<boolean>(false);

    const totalValue = portfolio.reduce((sum, coin) => {
        const price = coinPrices[coin.id]?.usd || 0;
        return sum + coin.volume * price;
}, 0)
console.log(totalValue);


    useEffect(() => {
        const fetchPortfolio = async () => {
            const response = await fetch("http://localhost:5050/portfolio/");
            const jsonData = await response.json();
            setPortfolio(jsonData);
        }
        fetchPortfolio();
        fetchPrices();
    }, [coins]);

    const fetchPrices = async () => {
        setLoadingPrices(true);
        try {
            const portfolioIds = portfolio.map((p) => p.id).join(",");
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${portfolioIds}&vs_currencies=usd`);

            if (!response.ok) return alert(
                "Error fetching prices"
            )

            const prices = await response.json();
            setCoinPrices(prices);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingPrices(false);
        }
    }
    
    // console.log("Coin Prices", coinPrices);
    // console.log("Coins", coins);
    
    return (
        <>
            {loadingPrices && <p>Loading prices...</p>}
            <div className="button-flex">
                <button className="update-button-prices" onClick={fetchPrices}  disabled={loadingPrices}>{loading ? "Updating..." : "Update Prices"}</button>

            </div>
            
        <div className="coin-card-cont">
            {portfolio.map((coin, index) => (
            <CoinCard key={index} coin={coin} coinPrices={coinPrices}/>))}
        </div>
            
            
            <PortfolioTotals total={totalValue}/>
            
            
    </>
            )
}

export default PortfolioDisplay