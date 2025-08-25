import mongoose from 'mongoose';

const cryptoItem = new mongoose.Schema({
    name: String,
    img: String,
    purchase_price: Number,
    current_price: Number,
    volume: Number,
    total_value: Number,
    percentage_change: Number,
    price_change: Number,
    date: String,
});

 const CryptoItem = mongoose.model('CryptoItem', cryptoItem);
 
 export default CryptoItem;