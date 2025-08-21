import {useState, useEffect} from "react";
import HistoryCoin from "./HistoryCoin.tsx";
import type {cryptoHistoryItem} from "../../Types/Types.ts";
import "./History.css"

function HistoryDisplay() {
    const [history, setHistory] = useState<cryptoHistoryItem[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await fetch("http://localhost:5050/history/historylist/");
            const jsonData = await response.json();
            setHistory(jsonData);
        }
        fetchHistory();
    }, []);
    
    
    return (
    <div className="coin-hist-cont">
        {history.map((item, index,) => (
            <HistoryCoin key={index} history={item} />
        ))}
    </div>
    );
}

export default HistoryDisplay