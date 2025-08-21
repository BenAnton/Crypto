import "./History.css"

function HistoryOptions() {
    const handleDeleteAll = async () => {
        try {
            const response = await fetch(`http://localhost:5050/history/all`, {
                method: "DELETE",
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        
        
        <>
            <div className="history-options-flex">
              
                <button onClick={handleDeleteAll}>Delete All</button>
                
            </div>
              
        </>
    )
}

export default HistoryOptions