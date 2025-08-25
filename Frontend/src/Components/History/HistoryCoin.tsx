import type {cryptoHistoryItem} from "../../Types/Types.ts";
import "./History.css"
import {useCurrency} from "../../Context/currencyContext.tsx";
import {
    useCurrencyConvertor
} from "../../Helper-Functions/ExchangeHook.tsx";
import {useAlert} from "../../Context/AlertContext.tsx";

interface HistoryCoinProps {
    history: cryptoHistoryItem
    onDelete: (id: string) => void
}

function HistoryCoin({history, onDelete}: HistoryCoinProps) {
   const {currency} = useCurrency();
   const {getDisplayPrice} = useCurrencyConvertor();
   const {showAlert} = useAlert();
   
    const handleDelete = () => {
        onDelete(history._id);
        showAlert("Delete Status:", "Delete successful");
    }
    

    
    return (
        <>
            <div className="coin-hist-card">
            <img className="history-card-img" src={history.img} alt={history.name}/>
        <h1 className="history-card-item">
            {history.name}
        </h1>
            <p className="history-card-item">{new Date(history.date).toDateString()}</p>
            
            <p className="history-card-item">Volume: {history.volume.toLocaleString()}</p>

                <p className="history-card-item">{history.buy_sell ? "Sell" : "Buy"}</p>
                <p className="history-card-item">Price: {history.buy_sell 
                    ? getDisplayPrice( history.sell_price, currency)
                    : getDisplayPrice(history.purchase_price, currency)
                }</p>
                <button onClick={handleDelete}>Delete</button>
            </div>  
            </>
    )
}

export default HistoryCoin