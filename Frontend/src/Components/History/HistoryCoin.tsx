import type {cryptoHistoryItem} from "../../Types/Types.ts";
import "./History.css"

interface HistoryCoinProps {
    history: cryptoHistoryItem
}

function HistoryCoin({history}: HistoryCoinProps) {
   
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5050/history/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error(error);
            alert("Error with delete");
        }
    }
    
    return (
        <>
            <div className="coin-hist-card">
            <img className="history-card-img" src={history.img} alt={history.name}/>
        <h1 className="history-card-item">
            {history.name}
        </h1>
            <p className="history-card-item">{history.date}</p>
            
            <p className="history-card-item">{history.volume}</p>

                <p className="history-card-item">{history.buy_sell ? "Sell" : "Buy"}</p>
                <p className="history-card-item">{history.buy_sell 
                    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD"}).format(history.sell_price)
                    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD"}).format(history.purchase_price)
                }</p>
                <button onClick={() => handleDelete(history._id)}>Delete</button>
            </div>  
            </>
    )
}

export default HistoryCoin