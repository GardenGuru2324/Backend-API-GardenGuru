import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { Plant } from '../../types/plant/plant';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetAllPlants = async (): Promise<Plant[] | unknown> => {
	try {
		return await client
			.db(database)
			.collection('Plants')
			.find({})
			.toArray();
	} catch (error) {
		return error;
	}
};
