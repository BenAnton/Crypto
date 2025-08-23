import express from 'express';
import fetch from 'node-fetch';
import type {CoinListCoin} from "../../Frontend/src/Types/Types.js"
import {formatLargeNumber} from "../../Frontend/src/Helper-Functions/Helper.js";
import {Types} from "mongoose";

const router = express.Router();


let cachedCoins: Record<string, CoinListCoin[]> = {};
let lastFetch: Record<string, number> = {};

router.get('/coingecko', async (req, res) => {
    let currency: string | undefined;

    if (Array.isArray(req.query.currency)) {
        currency = req.query.currency[0] as string;
    } else if (typeof req.query.currency === "string") {
        currency = req.query.currency;
    } else {
        currency = "usd";
    }

    const now = Date.now();

    if (!cachedCoins[currency] || Date.now() - (lastFetch[currency] || 0) > 60000) {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false`);

            if (!response.ok) {
                return res.status(response.status).json({error: "Failed fetch from Coin Gecko"})
            }

            const rawData: CoinListCoin[] = await response.json() as CoinListCoin[];
            cachedCoins[currency] = rawData;
            lastFetch[currency] = now;
        } catch (error) {
            console.error("Error fetching from Coin Gecko: ", error);
            return res.status(500).json({error: "Internal server error"});
        }
    }

    res.json(cachedCoins[currency]);
});

export default router;