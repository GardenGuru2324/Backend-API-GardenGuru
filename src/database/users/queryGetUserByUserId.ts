import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { User } from '../../types/user/user';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetUserByUserId = async (
	userId: string,
): Promise<User | unknown> => {
	try {
		return (await client
			.db(database)
			.collection('Users')
			.findOne({ userId: userId })) as User;
	} catch (error) {
		return error;
	}
};
