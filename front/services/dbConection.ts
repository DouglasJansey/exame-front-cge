import { MongoClient, ServerApiVersion } from 'mongodb';

const mongoUri: any = process.env.DATABASE_URL_MONGO;

const client = new MongoClient(mongoUri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);
async function dbConnection(){
    try{
        await client.connect();
        
        const db = await client.db('GCR-RJ').command({ping: 1})
        return {db, client}
    }
    finally{
        await client.close();
    }
}
