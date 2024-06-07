import { connectDatabase, closeDatabase } from '../db';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { collectionsToClear } from './helpers/collectionObjects';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryClearDatabase = async () => {
	try {
		await connectDatabase();

		collectionsToClear.forEach(async (collection) => {
			await client
				.db(database)
				.collection(collection.collectionName)
				.deleteMany({ [collection.id]: { $regex: /^jest/ } });
		});
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
