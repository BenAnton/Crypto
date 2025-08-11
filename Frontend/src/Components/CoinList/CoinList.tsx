import "./CoinList.css"
import {useCoins} from "../../Context/coinsContext.tsx";

function CoinList() {

    const {coins, loading} = useCoins();
    
    if (loading) return <p>Loading latest coin data...</p>;
    
    return (
        <>
        <h2 className="coinlist-title">Current Prices</h2>
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
                        <td>{coin.id}</td>
                        <td>${coin.current_price}</td>
                        <td>${coin.market_cap}</td>
                        <td>${coin.total_volume}</td>
                        <td>{coin.price_change_percentage_24h}%</td>
                    </tr>
                        
                    ))}
                    </tbody>
                </table>
                
                
         
                </div>
            </>
    )
}

export default CoinList