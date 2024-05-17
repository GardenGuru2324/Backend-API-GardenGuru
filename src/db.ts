import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri: string = process.env.MONGO_CONNECT_URL!;
const client = new MongoClient(uri);
const connect = async () => await client.connect();
const close = async () => await client.close();

export const main = async () => {
	try {
		await connect();
		const result = await client
			.db('sample_mflix')
			.collection('users')
			.find({})
			.limit(5)
			.toArray();
		return result;
	} catch (error) {
		console.log(error);
	} finally {
		await close();
	}
};

main();
