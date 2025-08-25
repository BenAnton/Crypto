import "./History.css"

interface HistoryOptionsProps {
    onDeleteAll: () => void
}

function HistoryOptions({onDeleteAll}: HistoryOptionsProps) {

    const handleDownload  = async () => {
        const result = await fetch("http://localhost:5050/export/", {
            method: "GET"
        });

        const blob = await result.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "crypto-history.csv";
        link.click();
        window.URL.revokeObjectURL(url);

    }
    
    return (
        
        
        <>
            <div className="history-options-flex">
              
                <button onClick={onDeleteAll}>Delete All</button>
                <button onClick={handleDownload}>Download History (CSV)</button>
            </div>
              
        </>
    )
}

export default HistoryOptions