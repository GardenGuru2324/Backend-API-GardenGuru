import { connectDatabase, closeDatabase } from '../db';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { collectionsToSeed } from './helpers/collectionObjects';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryInitializeDatabase = async () => {
	try {
		await connectDatabase();

		collectionsToSeed.forEach(
			async (collection) =>
				await client
					.db(database)
					.collection(collection.collectionName)
					.insertMany(collection.data)
		);
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
