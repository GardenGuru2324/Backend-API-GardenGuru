import { connectDatabase, closeDatabase } from '../db';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { PlantLocation } from '../../types/plantLocation/plantLocation';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetPlantLocationByLocationName = async (
	locationName: string,
): Promise<PlantLocation | unknown> => {
	try {
		await connectDatabase();
		return await client
			.db(database)
			.collection('PlantLocations')
			.findOne({ locationName: locationName });
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
