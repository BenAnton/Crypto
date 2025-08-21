import express from 'express';
import db from "../db/connection.js";
import  {ObjectId} from 'mongodb';
const router = express.Router();


const getHistoryCollection = () => db.collection('CryptoHistory');

//  Get all history
router.get("/historylist", async (req, res) => {
    try {
        let collection = getHistoryCollection();
        let results = await collection.find().toArray();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send("Error getting CryptoHistory");
    }
})

// Delete all history
router.delete ("/all", async (req, res) => {
    try{
        const historyCol = getHistoryCollection();
        const result = await historyCol.deleteMany({});
        res.status(200).send({message: "Delete Successful"});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Error with full history Delete"});
    }
})


// Delete history entry
    router.delete ("/:id", async (req, res) => {
        try{
            const {id} = req.params;
            const historyCol = getHistoryCollection();
    
            const history = await historyCol.findOne({_id: new ObjectId(id)});
            if (!history) return res.status(404).send("History entry not found");
    
            await historyCol.deleteOne({ _id: new ObjectId(id)});
    
            res.status(200).send({message: "Delete Successful"});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Error with history Delete"});
        }
    })







export default router;