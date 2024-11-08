import { MongoClient } from 'mongodb';

import 'dotenv/config';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryClearDatabase = async (
	tableName: string,
): Promise<unknown> => {
	try {
		const idToDelete: string = determineId(tableName)!;

		await client
			.db(database)
			.collection(tableName)
			.deleteMany({ [idToDelete]: { $regex: /^jest/ } });
	} catch (error) {
		return error;
	}
};

const determineId = (tableName: string): string => {
	switch (tableName) {
		case 'Plants':
			return 'plantId';
		case 'PlantLocations':
			return 'locationId';
		case 'PlantTips':
			return 'tipId';
		case 'Ratings':
			return 'ratingId';
		case 'Users':
			return 'userId';
		default:
			return '';
	}
};
