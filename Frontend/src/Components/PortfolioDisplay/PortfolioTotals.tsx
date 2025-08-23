import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type {cryptoItemHeld} from "../../Types/Types.ts";
import "./PortfolioDisplay.css";
import {
    useCurrencyConvertor
} from "../../Helper-Functions/ExchangeHook.tsx";
import {useCurrency} from "../../Context/currencyContext.tsx";

interface PortfolioTotalsProps {
    total: number
    portfolio: cryptoItemHeld[]
}

ChartJS.register(ArcElement, Tooltip, Legend);

function PortfolioTotals({total, portfolio}: PortfolioTotalsProps) {
    const {getDisplayLargeNumber} = useCurrencyConvertor();
    const labels: string[] = portfolio.map((coin) => coin.name);
    const {currency} = useCurrency();
    
    return (
        <div>
            <h2 className="total-value">Total Value: {getDisplayLargeNumber(total, currency)}
            </h2>
            <div className="chart-cont">
                <Doughnut data={{
                    labels,
                    datasets: [{
                        data: portfolio.map((coin) => ((coin.volume * coin.current_price) / total * 100)),
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    }],
                }}/>
            </div>
        </div>
    )
}

export default PortfolioTotals  