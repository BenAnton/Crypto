import CoinCard from "./CoinCard.tsx";
import {useEffect, useState} from "react";
import type {
   cryptoItemHeld
} from "../../Types/Types.ts";
import {useCoins} from "../../Context/coinsContext.tsx";
import "./PortfolioDisplay.css"
import PortfolioTotals from "./PortfolioTotals.tsx";
import PortfolioOptions from "../PortfolioOptions/PortfolioOptions.tsx";

function PortfolioDisplay() {
    const {coins, loading} = useCoins();
    const [portfolio, setPortfolio] = useState<cryptoItemHeld[]>([]);
    const [coinPrices, setCoinPrices] = useState<any>({});
    const [loadingPrices, setLoadingPrices] = useState<boolean>(false);

    
    
    const totalValue = portfolio.reduce((sum, coin) => {
        const price = coinPrices[coin.id]?.usd || 0;
        return sum + coin.volume * price;
}, 0)

    
    const fetchPortfolio = async () => {
        try {
            const response = await fetch("http://localhost:5050/portfolio/");
            const jsonData = await response.json();
            setPortfolio(jsonData);
        } catch (error) {
            console.error("Error fetching portfolio", error);
        }
    };
    
    useEffect(() => {
       fetchPortfolio();
    }, []);

    useEffect(() => {
        if (portfolio.length === 0) return;
        fetchPrices();
    }, [portfolio]);
    
    

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
    
    
    return (
        <>
            {loadingPrices && <p>Loading prices...</p>}
            
            <div className="button-flex">
                    
            <PortfolioOptions 
                coins={coins} 
                loading={loading}
                fetchPortfolio={fetchPortfolio}
            />
            
            <button className="update-button-prices" onClick={fetchPrices}  disabled={loadingPrices}>{loading ? "Updating..." : "Update Prices"}</button>
            
        </div>
            { portfolio.length === 0 ?
                <h3 className="portfolio-warn">No coins in portfolio, please make a transaction.</h3>
                :

                <div className="coin-card-cont">
            {portfolio.map((coin, index) => (
            <CoinCard 
                key={index} 
                coin={coin} 
                coinPrices={coinPrices} 
                fetchPortfolio={fetchPortfolio} />))}

            
        </div>
            }
            
            <PortfolioTotals total={totalValue} portfolio={portfolio}/>

            
    </>
            )
}

export default PortfolioDisplay