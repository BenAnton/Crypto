import express from 'express';
import db from "../db/connection.js";
import  {ObjectId} from 'mongodb';
const router = express.Router();

const getPortfolioCollection = () => db.collection('CryptoHeld');
const getHistoryCollection = () => db.collection('CryptoHistory');

// Get all portfolio
router.get('/', async (req, res) => {
    try {
        let collection = getPortfolioCollection();
        let results = await collection.find().toArray();
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send("Error getting CryptoHeld"); 
    }
})


// buy new coin and add history
router.post('/buy', async (req, res) => {
    try {
        const {id, name, volume} = req.body;

        const portfolioCol = getPortfolioCollection();
        const historyCol = getHistoryCollection();

        const response = await fetch (`https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}`);
        const coinData = await response.json();
        console.log(response);
        
        if(!coinData || !coinData.market_data) return res.status(404).send({
            message: `Coin data not found for ID: ${id}`
            
            }
        )
        
        const current_price = coinData.market_data.current_price.usd;
        const img = coinData.image.large;
        const percentage_change = coinData.market_data.price_change_percentage_24h;
        const price_change = coinData.market_data.price_change_24h;
        const total_value = current_price * volume;
        
        const existing = await portfolioCol.findOne({ id: coinData.id});

        if (existing) {
            const newVolume = existing.volume + volume;
            const newTotalValue = current_price * newVolume;

            await portfolioCol.updateOne(
                {_id: existing._id}, {
                    $set: {
                        id: coinData.id,
                        volume: newVolume,
                        total_value: newTotalValue,
                        current_price,
                        purchase_price: current_price,
                        percentage_change,
                        price_change,
                        date: new Date(),
                    }
                }
            );
        } else {
            await portfolioCol.insertOne({
                id: coinData.id,
                name,
                img,
                purchase_price: current_price,
                current_price,
                volume,
                total_value,
                percentage_change,
                price_change,
                date: new Date(),
            })
        }

        await historyCol.insertOne({
            name,
            img,
            buy_sell: false,
            purchase_price: current_price,
            sell_price: null,
            volume,
            date: new Date(),
        })

        res.status(200).send({message: "Buy Successful"});
    } catch (err) {
        console.error(err);
        res.status(500).send({message: "Error with Buy"});
    }
});


     //    Sell coin and add history
     router.post('/sell', async (req, res) => {
         try {
             const {id, name, volume} = req.body;
             
             const portfolioCol = getPortfolioCollection();
             const historyCol = getHistoryCollection();
             
             const response = await fetch (`https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}`);
             const coinData = await response.json();
             
             const current_price = coinData.market_data.current_price.usd;
             const img = coinData.image.large;
             
             const existing = await portfolioCol.findOne({ id: coinData.id});
             
             if (!existing) {
                 return res.status(404).send("Holding not found");
             }
             
             const newVolume = existing.volume - volume;
             
             if (newVolume > 0) {
                 const newTotalValue = current_price * newVolume;
                 await portfolioCol.updateOne(
                     {_id: existing._id}, {
                         $set: {
                             volume: newVolume,
                             total_value: newTotalValue,
                             current_price,
                             date: new Date(),
                         }}
                 );
             } else {
                 await portfolioCol.deleteOne({_id: existing._id});
             }
             
             await historyCol.insertOne({
                 name, img, buy_sell: true, purchase_price: null, sell_price: current_price, volume, date: new Date(),
             });
             
             res.status(200).send({message: "Sell Successful"});
         } catch (err) {
             console.error(err);
             res.status(500).send({message: "Error with Sell"});
         }
     });


// Delete all portfolio
router.delete("/all", async (req, res) => {
    try{
        const portfolioCol = getPortfolioCollection();
        const result = await portfolioCol.deleteMany({});
        res.status(200).send({message: "Delete Successful"});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Error with full portfolio Delete"});
    }
})
     
     
     
     // //  Edit coin from portfolio
     // router.patch('/edit/:id', async (req, res) => {
     //     try { 
     //         const {id} = req.params;
     //         const updates = req.body;
     //        
     //         const portfolioCol = getPortfolioCollection();
     //         const result = await portfolioCol.updateOne(
     //             {_id: new ObjectId(id) },
     //             {$set: updates}
     //         );
     //         res.status(200).send({ message: "Update Successful" });
     //     } catch (err) {
     //         console.error(err);
     //         res.status(500).send({message: "Error with Update"});
     //     }
     // });
     
  
     // // Delete coin from portfolio
     // router.delete('portfolio/:id', async (req, res) => {
     //     try {
     //         const {id} = req.params;
     //         const portfolioCol = getPortfolioCollection();
     //        
     //         const holding = await portfolioCol.findOne({_id: new ObjectId(id)});
     //         if (!holding) return res.status(404).send("Holding not found");
     //        
     //         await portfolioCol.deleteOne({ _id: new ObjectId(id)});
     //        
     //         res.status(200).send({message: "Delete Successful"});
     //         } catch (err) {
     //             console.error(err);
     //             res.status(500).send({message: "Error with Delete"});
     //         }
     // });   
     
     



     export default router;