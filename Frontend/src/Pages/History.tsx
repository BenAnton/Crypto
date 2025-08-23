import HistoryDisplay from "../Components/History/HistoryDisplay.tsx"
import HistoryOptions from "../Components/History/HistoryOptions.tsx";
import {useState, useEffect} from "react";
import type {cryptoHistoryItem} from "../Types/Types.ts";


function History() {
const [history, setHistory] = useState<cryptoHistoryItem[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await fetch("http://localhost:5050/history/historylist/");
            const jsonData = await response.json();
            setHistory(jsonData);
        }
        fetchHistory();
    }, []);

    const handleDeleteAll = async () => {
        try {
            const response = await fetch(`http://localhost:5050/history/all`, {
                method: "DELETE",
            });
            const data = await response.json();
            alert(data.message);
            
            if (response.ok) {
                setHistory([]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id: string) => {
        console.log('Received ID:', id);

        try {
            const response = await fetch(`http://localhost:5050/history/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            alert(data.message);
            
            if(response.ok) {
                setHistory(prevHistory => prevHistory.filter(item => item._id !== id))
            }
            
        } catch (error) {
            console.error(error);
            alert("Error with delete");
        }
    }
    
    return (
        <div>
            <h1>History</h1>
            <HistoryOptions onDeleteAll={handleDeleteAll}/>
            <HistoryDisplay history={history} onDeleteItem={handleDelete}/>
        </div>
    )
}

export default History