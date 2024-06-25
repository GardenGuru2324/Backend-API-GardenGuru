import { connectDatabase, closeDatabase } from '../db';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryDeletePlantByPlantIdAndUserId = async (
	plantId: string,
	userId: string,
) => {
	try {
		await connectDatabase();
		await client
			.db(database)
			.collection('Plants')
			.deleteOne({ plantId: plantId, userId: userId });
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
