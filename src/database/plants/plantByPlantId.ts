import { connectDatabase, closeDatabase } from '../db';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri: string = process.env.MONGO_CONNECT_URL!;
const client = new MongoClient(uri);

export const getPlantByPlantId = async (plantId: string) => {
	try {
		await connectDatabase();
		return await client.db('GardenGuru').collection('Plants').findOne({ plantId: plantId });
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
