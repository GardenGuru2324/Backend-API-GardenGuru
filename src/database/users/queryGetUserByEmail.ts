import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { User } from '../../types/user/user';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetUserByEmail = async (
	email: string,
): Promise<User | unknown> => {
	try {
		return (await client
			.db(database)
			.collection('Users')
			.findOne({ email: email })) as User;
	} catch (error) {
		return error;
	}
};
