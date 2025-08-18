import express from 'express';
import db from "../db/connection.js";
import  {ObjectId} from 'mongodb';
const router = express.Router();

const getPortfolioCollection = () => db.collection('CryptoHeld');
const getHistoryCollection = () => db.collection('CryptoHistory');


router.get('/', async (req, res) => {
    try {
        let collection = getPortfolioCollection();
        let results = await collection.find().toArray();
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send("Error getting CryptoHeld"); 
    }
})

router.post('/buy', async (req, res) => {
    try {
        const {id, name, volume} = req.body;

        const portfolioCol = getPortfolioCollection();
        const historyCol = getHistoryCollection();

        const response = await fetch (`https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}`);
        const coinData = await response.json();
        
        const current_price = coinData.market_data.current_price.usd;
        const img = coinData.image.large;
        const percentage_change = coinData.market_data.price_change_percentage_24h;
        const price_change = coinData.market_data.price_change_24h;
        const total_value = current_price * volume;
        
        const existing = await portfolioCol.findOne({name});

        if (existing) {
            const newVolume = existing.volume + volume;
            const newTotalValue = current_price * newVolume;

            await portfolioCol.updateOne(
                {_id: existing._id}, {
                    $set: {
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
                id,
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
            buy_sell: "buy",
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

        
     router.post('/sell', async (req, res) => {
         try {
             const {
                 id, name, img, sell_price, volume, date
             } = req.body;
             
             const portfolioCol = getPortfolioCollection();
             const historyCol = getHistoryCollection();
             
             const existing = await portfolioCol.findOne({_id: new ObjectId(id)});
             
             if (!existing) {
                 return res.status(404).send("Holding not found");
             }
             
             const newVolume = existing.volume - volume;
             
             if (newVolume > 0) {
                 const newTotalValue = sell_price * newVolume;
                 await portfolioCol.updateOne(
                     {_id: existing._id}, {
                         $set: {
                             volume: newVolume,
                             total_value: newTotalValue,
                             current_price: sell_price,
                             sell_price,
                             date,
                         }}
                 );
             } else {
                 await portfolioCol.deleteOne({_id: existing._id});
             }
             
             await historyCol.insertOne({
                 name, img, buy_sell: "sell", purchase_price: null, sell_price, volume, date,
             });
             
             res.status(200).send({message: "Sell Successful"});
         } catch (err) {
             console.error(err);
             res.status(500).send({message: "Error with Sell"});
         }
     });
     
     
     
     router.patch('/edit/:id', async (req, res) => {
         try { 
             const {id} = req.params;
             const updates = req.body;
             
             const portfolioCol = getPortfolioCollection();
             const result = await portfolioCol.updateOne(
                 {_id: new Object(id) },
                 {$set: updates}
             );
             res.status(200).send({ message: "Update Successful" });
         } catch (err) {
             console.error(err);
             res.status(500).send({message: "Error with Update"});
         }
     });
     
     
     router.delete('/:id', async (req, res) => {
         try {
             const {id} = req.params;
             const portfolioCol = getPortfolioCollection();
             
             const holding = await portfolioCol.findOne({_id: new ObjectId(id)});
             if (!holding) return res.status(404).send("Holding not found");
             
             await portfolioCol.deleteOne({ _id: new ObjectId(id)});
             
             res.status(200).send({message: "Delete Successful"});
             } catch (err) {
                 console.error(err);
                 res.status(500).send({message: "Error with Delete"});
             }
     });   

     export default router;


















// const router = express.Router();
//
// //  Get all Crypto's held
// router.get('/', async (req, res) => {
//   try {
//       let collection = db.collection('CryptoHeld');
//       let results = await collection.find().toArray();
//       res.status(200).send(results);
//   } catch (err) {
//       res.status(500).send("Error getting CryptoHeld"); 
//   }
// });
//
// // Get Crypto by id
// router.get('/:id', async (req, res) => {
//     try {
//         let collection = db.collection('CryptoHeld');
//         let query = {_id: new ObjectId(req.params.id)};
//         let result = await collection.findOne(query);
//
//         if (!result) res.status(404).send("Not found!");
//     } catch (err) {
//         res.status(500).send("Error getting CryptoHeld by Id");
//     }
// });
//
// // Post new Crypto Held
// router.post('/', async (req, res) => {
//     try {
//         let newCryptoHeld = {
//             name: req.body.name,
//             img: req.body.img,
//             purchase_price: req.body.purchase_price,
//             current_price:  req.body.current_price,
//             volume: req.body.volume,
//             total_value: req.body.total_value,
//             percentage_change: req.body.percentage_change,
//             price_change: req.body.price_change,
//             date: req.body.date,
//         };
//         let collection = db.collection('CryptoHeld');
//         let result = await collection.insertOne(newCryptoHeld);
//         res.status(204).send(result);
//     } catch (err) {
//         res.status(500).send("Error adding CryptoHeld");
//     }
// });
//
//
// // Update a Crypto Held
// router.patch('/:id', async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id) };
//         const updates = {
//             $set: {
//                 name: req.body.name,
//                 img: req.body.img,
//                 purchase_price: req.body.purchase_price,
//                 current_price:  req.body.current_price,
//                 volume: req.body.volume,
//                 total_value: req.body.total_value,
//                 percentage_change: req.body.percentage_change,
//                 price_change: req.body.price_change,
//                 date: req.body.date,
//             },
//         };
//        
//         let collection = await db.collection('CryptoHeld');
//         let result = await collection.updateOne(query, updates);
//         res.status(200).send(result);
//     } catch (err) {
//         res.status(500).send("Error updating CryptoHeld");
//     }
// })
//
// // Delete a Crypto held
// router.delete("/:id", async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id) };
//         const collection = db.collection('CryptoHeld');
//         let result = await collection.deleteOne(query);
//         res.status(200).send(result);
//     } catch (err) {
//         res.status(500).send("Error deleting CryptoHeld");
//     }
// })
//
// export default router;