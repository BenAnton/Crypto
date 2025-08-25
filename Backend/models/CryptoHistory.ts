import mongoose from 'mongoose';

const cryptoHistory = new mongoose.Schema({
    name: String,
    img: String,
    buy_sell: Boolean,
    purchase_price: Number,
    sell_price: Number,
    volume: Number,
    date: String,
});

const CryptoHistory = mongoose.model("CryptoHistory", cryptoHistory);

export default CryptoHistory;