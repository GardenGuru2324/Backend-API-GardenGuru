import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { Plant } from '../../types/plant/plant';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetPlantByPlantId = async (
	plantId: string,
): Promise<Plant | unknown> => {
	try {
		return await client
			.db(database)
			.collection('Plants')
			.findOne({ plantId: plantId });
	} catch (error) {
		return error;
	}
};
