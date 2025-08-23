import type {CoinListCoin} from "../Types/Types.ts";
import "./PortfolioOptions.css"
import {useState} from "react";


interface PortfolioOptionsProps {
    coins: CoinListCoin[]
    loading: boolean
    fetchPortfolio: () => void
}

function PortfolioOptions({coins, loading, fetchPortfolio} : PortfolioOptionsProps){
    const [selectedCoin, setSelectedCoin] = useState<CoinListCoin | null>(null);
    const [volume, setVolume] = useState<number>(0);

    if (loading) return <p>Loading latest coin data...</p>;
    
    
    const handleBuy = async () => {
        if (!selectedCoin) return alert("Please select a coin");
        console.log(selectedCoin);
        console.log(selectedCoin.id);
        const payload = {
            id: selectedCoin.id,
            name: selectedCoin.name,
            volume, 
        };
        
        try {
            const response = await fetch("http://localhost:5050/portfolio/buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            alert(data.message);
            fetchPortfolio();
        } catch (error) {
            console.error(error);
            alert("Error with buy");
        }
    };
    
    const handleSell = async () => {
        if(!selectedCoin) return alert("Please select a coin");
        console.log(selectedCoin);
        const payload = {
            id: selectedCoin.id,
            name: selectedCoin.name,
            volume, 
        };
        
        try {
            const response = await fetch("http://localhost:5050/portfolio/sell", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            alert(data.message);
            fetchPortfolio();
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleDeleteAll = async () => {
        try {
            const response = await fetch(`http://localhost:5050/portfolio/all`, {
                method: "DELETE",
            });
            const data = await response.json();
            alert(data.message);
            fetchPortfolio();
        } catch (error) {}
    }
    
    return (
        <>
            <div className="options-cont">
                <div className="option-first">
            <select className="option-select" onChange={(e) => setSelectedCoin(coins.find((c) => c.id === e.target.value) || null)}>
                <option>Select Coin</option>
                {coins.map((coin: CoinListCoin, index: number) => (
                    <option key={index} value={coin.id}>{coin.id}</option>
                ))}
            </select>
                
                <input className="option-select" type="number" placeholder=" Volume" onChange={(e) => setVolume(Number(e.target.value))}/>
                </div>
    <div className="option-second">

        <button onClick={handleBuy}>Buy</button>
        <button onClick={handleSell}>Sell</button>
        <button onClick={handleDeleteAll}>Reset Portfolio</button>
    </div>
                
                
            </div>
                
 
        </>
    )
}

export default PortfolioOptions