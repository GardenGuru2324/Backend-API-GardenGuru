import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { CreatePlant } from '../../types/plant/createPlant';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAddPlant = async (plant: CreatePlant): Promise<unknown> => {
	try {
		await client.db(database).collection('Plants').insertOne(plant);
	} catch (error) {
		return error;
	}
};
