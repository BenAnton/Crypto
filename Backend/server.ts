import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import coinGeckoRouter from './routes/CoinGeckoAPI.js';
import portfolioRoutes from "./routes/PortfolioRoutes.js";
import historyRoutes from "./routes/HistoryRoutes.js";
import exportRoute from "./routes/ExportCSV.js"
import CryptoHistory from "./models/CryptoHistory.js";
import CryptoItem from "./models/CryptoItem.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.MONGO_URI || "", {
} as mongoose.ConnectOptions)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Mongoose connection error: ", err));


app.use(cors());
app.use(express.json());
app.use('/coins', coinGeckoRouter)
app.use('/portfolio', portfolioRoutes)
app.use('/history', historyRoutes)
app.use('/export', exportRoute)




// const cryptoItemHeld = new mongoose.Schema({
//     name: String,
//     img: String,
//     purchase_price: Number,
//     current_price: Number,
//     volume: Number,
//     total_value: Number,
//     percentage_change: Number,
//     price_change: Number,
//     date: String,
// });
//
// const cryptoHistoryItem = new mongoose.Schema({
//     name: String,
//     img: String,
//     buy_sell: Boolean,
//     purchase_price: Number,
//     sell_price: Number,
//     volume: Number,
//     date: String,
// })

// const CryptoItem = mongoose.model('CryptoItem', cryptoItemHeld);
// const CryptoHistory = mongoose.model('CryptoHistory', cryptoHistoryItem);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
