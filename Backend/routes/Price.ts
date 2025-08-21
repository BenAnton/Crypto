import express from 'express';

const router = express.Router();

router.get('/price', async (req, res) => {
    try {
        const {ids} = req.query;

        if (!ids) return res.status(400).send({error: "No ids provided"});

        const idsParam = (ids as string).toLowerCase();
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=usd&include_market_cap=true$include_24hr_vol=true`);

        if (!response.ok) return res.status(response.status).json({error: "Failed fetch from Coin Gecko"});

        const prices = await response.json();
        res.status(200).send(prices)
    } catch (error) {
        console.error(error);
        res.status(500).send({error: "Internal server error fetching prices"});
    }
});

export default router;