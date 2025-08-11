// import express from 'express';
// import db from "../db/connection.js";
// import  {ObjectId} from 'mongodb';
//
// const router = express.Router();
//
// //  Get all Crypto's history items
// router.get('/', async (req, res) => {
//    try {
//        let collection = db.collection('CryptoHistory');
//        let results = await collection.find().toArray();
//        res.status(200).send(results);
//    } catch (err) {
//        res.status(500).send("Error getting CryptoHistory");
//    }
// });
//
// // Get Crypto history by id
// router.get('/:id', async (req, res) => {
//    try {
//        let collection = db.collection('CryptoHistory');
//        let query = {_id: new ObjectId(req.params.id)};
//        let result = await collection.findOne(query);
//
//        if (!result) res.status(404).send("Not found!");
//    } catch (err) {
//        res.status(500).send("Error getting CryptoHistory by Id");
//    }
// });
//
// // Post new Crypto History
// router.post('/', async (req, res) => {
//     try {
//         let newCryptoHistory = {
//             name: req.body.name,
//             img: req.body.img,
//             buy_sell: req.body.param,
//             purchase_price: req.body.purchase_price,
//             sell_price: req.body.sell_price,
//             volume: req.body.volume,
//             date: req.body.date,
//         };
//         let collection = db.collection('CryptoHistory');
//         let result = await collection.insertOne(newCryptoHistory);
//         res.status(201).send(result);
//     } catch (err) {
//         res.status(500).send("Error adding CryptoHistory");
//     }
// });
//
//
// // Update a Crypto History
// router.patch('/:id', async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id) };
//         const updates = {
//             $set: {
//                 name: req.body.name,
//                 img: req.body.img,
//                 buy_sell: req.body.buy_sell,
//                 purchase_price: req.body.purchase_price,
//                 sell_price: req.body.sell_price,
//                 volume: req.body.volume,
//                 date: req.body.date,
//             },
//         };
//
//         let collection = await db.collection('CryptoHistory');
//         let result = await collection.updateOne(query, updates);
//         res.status(200).send(result);
//     } catch (err) {
//         res.status(204).send("Error updating CryptoHistory");
//     }
// })
//
// // Delete a Crypto held
// router.delete("/:id", async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id) };
//         const collection = db.collection('CryptoHistory');
//         let result = await collection.deleteOne(query);
//         res.status(200).send(result);
//     } catch (err) {
//         res.status(500).send("Error deleting CryptoHistory");
//     }
// })
//
// export default router;