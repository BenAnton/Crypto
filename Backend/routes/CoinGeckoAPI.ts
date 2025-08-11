import express from 'express';
import fetch from 'node-fetch';
import type {CoinListCoin} from "../../Frontend/src/Types/Types.js"
import {formatLargeNumber} from "../../Frontend/src/Helper-Functions/Helper.js";

const router = express.Router();

router.get('/coingecko', async (req, res) => {
    try {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets' +
            '?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';

        const response = await fetch(apiUrl);

        if (!response.ok) {
            return res.status(response.status).json({error: "Failed fetch from Coin Gecko"})
        }

        const data: CoinListCoin[] = await response.json() as CoinListCoin[];

        const formattedData = data.map(coin => ({
            ...coin,
            current_price: new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2}).format(coin.current_price),
            id: coin.id.toUpperCase(),
            market_cap: formatLargeNumber(coin.market_cap),
            total_volume: formatLargeNumber(coin.total_volume),
            price_change_percentage_24h: new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2}).format(coin.price_change_percentage_24h),
        }));
        
        res.json(formattedData);
        
        
        
    } catch (err) {
        console.error("Error fetching from Coin Gecko: ", err);
        res.status(500).json({error: "Internal server error"});
    }
});

export default router;