import { connectDatabase, closeDatabase } from '../db';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const uri: string = process.env.MONGO_CONNECT_URL!;
const client = new MongoClient(uri);

export const userById = async (userId: ObjectId) => {
	try {
		await connectDatabase();
		return await client.db('sample_mflix').collection('users').findOne({ _id: userId }); // Momenteel mockData
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
