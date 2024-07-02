import { MongoClient } from 'mongodb';

import { connectDatabase, closeDatabase } from '../db';
import 'dotenv/config';
import { Plant } from '../../types/plant/plant';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetPlantByPlantId = async (
	plantId: string,
): Promise<Plant | unknown> => {
	try {
		await connectDatabase();
		return await client
			.db(database)
			.collection('Plants')
			.findOne({ plantId: plantId });
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
