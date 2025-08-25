import express from "express";
import {Parser} from "json2csv";
import CryptoHistory from "../models/CryptoHistory.js";
import db from "../db/connection.js";

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("Test route hit!");
    res.send("Test route working")
});


router.get("/", async (req, res) => {
    try {
        console.log("Exporting CSV");
        
        const history = await db.collection("CryptoHistory").find({}).toArray();
        console.log("History: ", history);
        console.log("History Length: ", history.length)
        
        // if(history.length === 0) {
        //     console.log("No history found");
        //     return res.status(404).send("No history found");
        // }
        
        const transformedHistory = history.map(item => ({
                name: item.name,
                buy_sell: item.buy_sell ? "Sell" : "Buy",
                purchase_price: item.purchase_price,
                sell_price: item.sell_price || "",
                volume: item.volume,
                date: item.date
        }));
        
        const fields = ["name", "buy_sell", "purchase_price", "sell_price", "volume", "date"];
        const parser = new Parser({fields});
        const csv = parser.parse(transformedHistory);  
        
        res.header("Content-Type", "text/csv");
        res.attachment("coin-history.csv");
        res.send(csv);
        
    } catch (error) {
        console.error("Export Error: ", error);
        res.status(500).send("Error exporting CSV");
    }
});

export default router;