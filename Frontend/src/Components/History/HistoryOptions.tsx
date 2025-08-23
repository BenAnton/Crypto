import "./History.css"

interface HistoryOptionsProps {
    onDeleteAll: () => void
}

function HistoryOptions({onDeleteAll}: HistoryOptionsProps) {

    
    return (
        
        
        <>
            <div className="history-options-flex">
              
                <button onClick={onDeleteAll}>Delete All</button>
                
            </div>
              
        </>
    )
}

export default HistoryOptions