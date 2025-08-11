import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {
    await client.connect();
    await client.db("Crypto").command({ping: 1});
    console.log("Ping successful, connected to MongoDB");
} catch (err) {
    console.error(err);
}

let db = client.db("Crypto");

export default db;