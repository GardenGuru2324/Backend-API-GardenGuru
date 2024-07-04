import { MongoClient } from 'mongodb';

import { connectDatabase, closeDatabase } from '../db';
import 'dotenv/config';
import { Plant } from '../../types/plant/plant';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetAllPlantsOfUser = async (
	userId: string,
	page: number,
): Promise<Plant[] | unknown> => {
	const itemPerPage = 10;
	try {
		await connectDatabase();
		return await client
			.db(database)
			.collection('Plants')
			.find({ userId: userId })
			.skip((page - 1) * itemPerPage)
			.limit(itemPerPage)
			.toArray();
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
