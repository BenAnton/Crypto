import HistoryDisplay from "../Components/History/HistoryDisplay.tsx"
import HistoryOptions from "../Components/History/HistoryOptions.tsx";

function History() {
    return (
        <div>
            <h1>History</h1>
            <HistoryOptions/>
            <HistoryDisplay/>
        </div>
    )
}

export default History