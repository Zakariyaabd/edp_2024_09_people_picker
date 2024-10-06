import { MongoClient } from 'mongodb'; 
import dotenv from 'dotenv';

// load environment var
dotenv.config(); 

const URL = process.env.Mongo_URL;
const dbName = process.env.dbName; 
const CollectionName = process.env.Collection; 

let db; 

async function connect() {

    try {
        if (!db) {
            const client = new MongoClient(URL);
            await client.connect(); 
            db = client.db(dbName);

        }
    } catch (error) {
        console.log ('Connection to Mongo Db', error); 
        throw new Error("Failed to connect to db")
    }
}

export async function getAllPeople() {
    await connect(); 
    const collection = db.collection(CollectionName);
    return await collection.find({}).toArray();
}

export default {
    getAllPeople,
};