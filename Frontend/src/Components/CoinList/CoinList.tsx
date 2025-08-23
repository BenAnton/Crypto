import "./CoinList.css"
import {useCoins} from "../../Context/coinsContext.tsx";
import {
    useCurrency
} from "../../Context/currencyContext.tsx";
import {useCurrencyConvertor} from "../../Helper-Functions/ExchangeHook.tsx";
import Alert from "../Alert/Alert.tsx";
import {useState} from "react";

function CoinList() {
    const [showAlert, setShowAlert] = useState<boolean>(true);
    const {coins, loading} = useCoins();
    const {currency} = useCurrency();
    const {getDisplayPrice, getDisplayLargeNumber, getDisplayPercentage} = useCurrencyConvertor();
    
    
    if (loading) return <p>Loading latest coin data...</p>;
    
    return (
        <>
        <div className="coin-list-cont">
            
            
            
                <table>
                    <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>Total Volume</th>
                        <th>Change (24hr)</th>
                    </tr>
                        </thead> 
                    <tbody>
                    {coins.map((coin, index) => (
                    <tr className="table-row" key={index}>
                        <td><img src ={coin.image} alt="coin logo"/></td>
                        <td>{coin.id.toUpperCase()}</td>
                        <td>{getDisplayPrice(coin.current_price, currency)}</td>
                        <td>{getDisplayLargeNumber(coin.market_cap, currency)}</td>
                        <td>{getDisplayLargeNumber(coin.total_volume, currency)}</td>
                        <td>{getDisplayPercentage(coin.price_change_percentage_24h)}</td>
                    </tr>
                        
                    ))}
                    </tbody>
                </table>
                
                
         
                </div>
            {showAlert && (
            <Alert title={"Alert Message"} message={"This is an alert message."} isOpen={showAlert} onClose={() => setShowAlert(false)}/>
    )}
                </>
    )
}

export default CoinList