import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { Query } from '../../types/Query';
import { UserPlant } from '../../types/plant/userPlants';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetAllPlantsOfUser = async (
	query: Query,
	page: number,
): Promise<UserPlant | unknown> => {
	const itemPerPage = 10;
	try {
		const userPlants = await client
			.db(database)
			.collection('Plants')
			.find(query)
			.skip((page - 1) * itemPerPage)
			.limit(itemPerPage + 1)
			.toArray();

		const nextPage = userPlants.length > itemPerPage;

		if (nextPage) userPlants.pop();

		return {
			nextPage,
			userPlants,
		};
	} catch (error) {
		return error;
	}
};
