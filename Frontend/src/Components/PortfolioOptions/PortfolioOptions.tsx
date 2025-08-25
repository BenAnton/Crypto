import type {CoinListCoin} from "../../Types/Types.ts";
import "./PortfolioOptions.css"
import {useState} from "react";
import {useAlert} from "../../Context/AlertContext.tsx";

interface PortfolioOptionsProps {
    coins: CoinListCoin[]
    loading: boolean
    fetchPortfolio: () => void
}

function PortfolioOptions({coins, loading, fetchPortfolio} : PortfolioOptionsProps){
    const [selectedCoin, setSelectedCoin] = useState<CoinListCoin | null>(null);
    const [volume, setVolume] = useState<number>(0);
    const {showAlert} = useAlert();
    
    if (loading) return <p>Loading latest coin data...</p>;
    
    
    const handleBuy = async () => {
        if (!selectedCoin) return showAlert("Coin Not Selected", "Please select a coin");
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
            if(response.ok ){
                showAlert("Buy Status:", "The buy was successful!"); 
            }
            
            fetchPortfolio();
        } catch (error) {
            console.error(error);
            showAlert("Buy Status:", "The buy was unsuccessful!")
        }
    };
    
    const handleSell = async () => {
        if(!selectedCoin) return alert("Please select a coin");
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
            if (response.ok) {
                showAlert("Sell Status:", "Sell successful");  
            }
            
            fetchPortfolio();
        } catch (error) {
            console.error(error);
            showAlert("Sell Status:", "Sell failed")
        }
    }
    
    const handleDeleteAll = async () => {
        try {
            const response = await fetch(`http://localhost:5050/portfolio/all`, {
                method: "DELETE",
            });
            const data = await response.json();
            showAlert("Delete Status:", "Delete successful");
            fetchPortfolio();
        } catch (error) {
            showAlert("Delete Status:", "Delete failed");
        }
    }
    
    return (
        <>
            <div className="options-cont">
                <div className="option-first">
            <select className="option-select" onChange={(e) => setSelectedCoin(coins.find((c) => c.id === e.target.value) || null)}>
                <option>Select Coin</option>
                {coins.map((coin: CoinListCoin, index: number) => (
                    <option key={index} value={coin.id}>{coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}</option>
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