import { connectDatabase, closeDatabase } from '../db';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri: string = process.env.MONGO_CONNECT_URL!;
const client = new MongoClient(uri);

export const getUsers = async () => {
	try {
		await connectDatabase();
		return await client.db('sample_mflix').collection('users').find({}).toArray(); // Momenteel mockData
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
