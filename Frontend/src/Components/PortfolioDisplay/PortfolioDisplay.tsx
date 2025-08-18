import CoinCard from "./CoinCard.tsx";
import {useEffect, useState} from "react";
import type {
   cryptoItemHeld
} from "../../Types/Types.ts";

function PortfolioDisplay() {
    const [portfolio, setPortfolio] = useState<cryptoItemHeld[]>([]);

    useEffect(() => {
        const fetchPortfolio = async () => {
            const response = await fetch("http://localhost:5050/portfolio/");
            const jsonData = await response.json();
            setPortfolio(jsonData);
        }
        fetchPortfolio();
    }, []);
    
    return (
        <div className="coin-card-cont">
            {portfolio.map((coin, index) => (
            <CoinCard key={index} coin={coin}/>))}
        </div>
    )
}

export default PortfolioDisplay