import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri: string = process.env.MONGO_CONNECT_URL!;
const client = new MongoClient(uri);

export const connect = async () => await client.connect();

export const close = async () => await client.close();
