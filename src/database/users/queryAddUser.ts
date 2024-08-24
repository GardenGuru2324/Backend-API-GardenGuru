import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { CreateUser } from '../../types/user/createUser';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAddUser = async (newUser: CreateUser): Promise<unknown> => {
	try {
		return await client.db(database).collection('Users').insertOne(newUser);
	} catch (error) {
		return error;
	}
};
