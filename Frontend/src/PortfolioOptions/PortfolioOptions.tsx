import {useCoins} from "../Context/coinsContext.tsx";
import type {CoinListCoin} from "../Types/Types.ts";
import "./PortfolioOptions.css"
import {useState} from "react";

function PortfolioOptions() {
    
    const {coins, loading} = useCoins();
    const [selectedCoin, setSelectedCoin] = useState<CoinListCoin | null>(null);
    const [volume, setVolume] = useState<number>(0);
    
    if (loading) return <p>Loading latest coin data...</p>;
    
    const handleBuy = async () => {
        if (!selectedCoin) return alert("Please select a coin");
        console.log(selectedCoin);
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
        } catch (error) {
            console.error(error);
            alert("Error with buy");
        }
    };
    
    return (
        <div>
            <div className="options-cont">
            <select className="option-select" onChange={(e) => setSelectedCoin(coins.find((c) => c.id === e.target.value) || null)}>
                <option>Select Coin</option>
                {coins.map((coin: CoinListCoin, index: number) => (
                    <option key={index} value={coin.id}>{coin.id}</option>
                ))}
            </select>
                
                <input type="number" placeholder="Volume" onChange={(e) => setVolume(Number(e.target.value))}/>
                
            <div className="option-button-grid">
                <button onClick={handleBuy}>Buy</button>
                <button>Sell</button>
                <button>Edit Holding</button>
                <button>Delete Holding</button>
            </div>
            </div>
        </div>
    )
}

export default PortfolioOptions