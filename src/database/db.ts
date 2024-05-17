import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri: string = process.env.MONGO_CONNECT_URL!;
const client = new MongoClient(uri);

export const connectDatabase = async () => await client.connect();

export const closeDatabase = async () => await client.close();
