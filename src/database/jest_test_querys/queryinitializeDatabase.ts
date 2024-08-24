import { MongoClient } from 'mongodb';

import { plants } from '../../data/plants';
import { plantLocations } from '../../data/plantLocations';
import { plantTips } from '../../data/plantTips';
import { ratings } from '../../data/ratings';
import { users } from '../../data/users';
import 'dotenv/config';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryInitializeDatabase = async (
	tableName: string,
): Promise<unknown> => {
	try {
		const data = determineData(tableName);
		await client.db(database).collection(tableName).insertMany(data!);
	} catch (error) {
		return error;
	}
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const determineData = (tableName: string) => {
	switch (tableName) {
		case 'Plants':
			return plants;
		case 'PlantLocations':
			return plantLocations;
		case 'PlantTips':
			return plantTips;
		case 'Ratings':
			return ratings;
		case 'Users':
			return users;
	}
};
