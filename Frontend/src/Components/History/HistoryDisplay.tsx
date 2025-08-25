import HistoryCoin from "./HistoryCoin.tsx";
import type {cryptoHistoryItem} from "../../Types/Types.ts";
import "./History.css"


interface HistoryDisplayProps {
    history: cryptoHistoryItem[];
    onDeleteItem: (id: string) => void;
}
function HistoryDisplay({history, onDeleteItem}: HistoryDisplayProps) {
    
    

    
    if(!history.length) return (
        <h3 className="history-warn">No history found, please make a transaction to generate some history.</h3>
    )
    
    return (
        <>
    <div className="coin-hist-cont">
        {history.map((item, index,) => (
            <HistoryCoin 
                key={index} 
                history={item}
                onDelete={onDeleteItem}/>
        ))}
    </div>
        
        
            </>
    );
}

export default HistoryDisplay