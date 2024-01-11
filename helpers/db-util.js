import { MongoClient } from "mongodb";

export async function connectDatabase(){
    const connectionUrl = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.0giypy6.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    const client = await MongoClient.connect(connectionUrl);
    return client;
}

export async function insertDocument(client, collection, document){
    const db = client.db();
            
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocument(client, collection, sort, filter){
    const db = client.db();
    const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
    return documents;
}

